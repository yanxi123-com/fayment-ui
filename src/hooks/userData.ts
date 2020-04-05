import { login } from "comps/header/Header";
import { showError } from "comps/popup";
import { AppError } from "lib/error";
import { userService } from "lib/grpcClient";
import { parseGrpcError, handleGrpcError } from "lib/util/grpcUtil";
import { GetUserKvReq, UserKvDTO } from "proto/user_pb";
import { useCallback, useContext, useEffect, useState } from "react";
import { getAuthMD, globalContext, UserDataVersion } from "stores/GlobalStore";
import localStorage from "stores/local";

interface UserDataOpts<Group> {
  oldLocalKey: string;
  dataKey: string;
  defaultGroups: Array<Group>;
  uniqGroupInfo: (group: Group) => void;
}

interface UserDataHookResult<Group> {
  groups: Group[] | undefined;
  setGroups: (groups: Array<Group>, initVersion?: UserDataVersion) => void;
}

function promptLogin() {
  login();
}

export function useUserData<Group>(
  opts: UserDataOpts<Group>
): UserDataHookResult<Group> {
  const globalStore = useContext(globalContext);
  const [groups, setGroupsOri] = useState<Array<Group>>();

  const setGroups = useCallback(
    (groups: Array<Group>, initVersion?: UserDataVersion) => {
      // 去重
      groups.forEach(group => {
        opts.uniqGroupInfo(group);
      });

      if (!initVersion && !globalStore.user) {
        // 通过 UI 更新，并且没有登录
        promptLogin();
        return;
      }

      setGroupsOri(groups);
      localStorage.set(opts.dataKey, groups);
      if (initVersion) {
        globalStore.currentGroupsVersion = initVersion;
      } else if (globalStore.currentGroupsVersion) {
        globalStore.currentGroupsVersion.currentVersion++;
      }
    },
    [globalStore, opts]
  );

  useEffect(() => {
    // 初始化内容
    let groups: Array<Group>;
    let version: UserDataVersion;
    Promise.resolve()
      .then(() => {
        if (!globalStore.user) {
          promptLogin();
          throw new AppError(["REQUIRE_LOGIN", "请先登录"]);
        }

        const req = new GetUserKvReq();
        req.setKey(opts.dataKey);
        return userService.getUserKv(req, getAuthMD());
      })
      .then(res => {
        groups = JSON.parse(res.getValue());
        version = {
          currentVersion: 1,
          cloudVersion: 1,
          cloudUpdatedAt: new Date(res.getCreatedat())
        };
      })
      .catch(e => {
        const grpcError = parseGrpcError(e);
        if (grpcError.code === "NOT_FOUND") {
          // 未登录，或者无云上数据
          const localGroups = localStorage.get(opts.dataKey);
          const oldLocalGroups = localStorage.get(opts.oldLocalKey);
          if (localGroups && !globalStore.user) {
            groups = opts.defaultGroups;
          } else {
            groups = localGroups || oldLocalGroups || opts.defaultGroups;
          }
          version = {
            currentVersion: 1
          };
        } else {
          throw grpcError;
        }
      })
      .then(() => {
        setGroups(groups, version);
      })
      .catch(showError);
    return () => {
      globalStore.currentGroupsVersion = undefined;
    };
  }, [setGroups, globalStore, opts]);

  useEffect(() => {
    // 更新到云端
    const { user, currentGroupsVersion: version } = globalStore;

    if (!version || !version.currentVersion || !groups) {
      // 未初始化完成
      return;
    }

    if (
      version &&
      user &&
      (version.cloudVersion == null ||
        version.cloudVersion < version.currentVersion)
    ) {
      if (version.uploadingVersion != null) {
        return;
      }
      version.uploadingVersion = version.currentVersion;

      const userKv = new UserKvDTO();
      userKv.setKey(opts.dataKey);
      userKv.setValue(JSON.stringify(groups));
      userService
        .saveUserKv(userKv, getAuthMD())
        .then(res => {
          version.cloudVersion = version.uploadingVersion;
          version.uploadingVersion = undefined;
          version.cloudUpdatedAt = new Date();
        })
        .catch(handleGrpcError)
        .catch(showError);
    }
  }, [globalStore, groups, opts.dataKey]);

  return { groups, setGroups };
}
