import { Modal } from "antd";
import { register } from "comps/header/Header";
import { showError } from "comps/popup";
import { httpGet, httpPost } from "lib/apiClient";
import { AppError } from "lib/error";
import { useCallback, useContext, useEffect, useState } from "react";
import { globalContext, UserDataVersion } from "stores/GlobalStore";
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
  Modal.warn({
    title: "请先登录",
    content: `登录后可同步数据到云端`,
    onOk() {
      register();
    },
  });
}

export function useUserData<Group>(
  opts: UserDataOpts<Group>
): UserDataHookResult<Group> {
  const globalStore = useContext(globalContext);
  const [groups, setGroupsOri] = useState<Array<Group>>();

  const setGroups = useCallback(
    (groups: Array<Group>, initVersion?: UserDataVersion) => {
      if (!initVersion) {
        // 提示使用新版
        showError("旧版停止使用，新版网站备案中，会很快推出");
        return;
      }

      // 去重
      groups.forEach((group) => {
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
        return httpGet("getUserData", { key: opts.dataKey });
      })
      .then((data) => {
        groups = data.value;
        version = {
          currentVersion: 1,
          cloudVersion: 1,
          cloudUpdatedAt: new Date(data.updatedAt),
        };
      })
      .catch((e) => {
        if (e.code === "REQUIRE_LOGIN" || e.code === "NoSuchKey") {
          // 未登录，或者无云上数据
          const localGroups = localStorage.get(opts.dataKey);
          const oldLocalGroups = localStorage.get(opts.oldLocalKey);
          if (localGroups && !globalStore.user) {
            groups = opts.defaultGroups;
          } else {
            groups = localGroups || oldLocalGroups || opts.defaultGroups;
          }
          version = {
            currentVersion: 1,
          };
        } else {
          throw e;
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
      httpPost("saveUserData", {
        key: opts.dataKey,
        data: groups,
      })
        .then((data) => {
          version.cloudVersion = version.uploadingVersion;
          version.uploadingVersion = undefined;
          version.cloudUpdatedAt = new Date(data.updatedAt);
        })
        .catch(showError);
    }
  }, [globalStore, groups, opts.dataKey]);

  return { groups, setGroups };
}
