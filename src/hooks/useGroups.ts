import { confirmPromise, showError } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { GroupType } from "constant";
import { userService } from "lib/grpcClient";
import { handleGrpcError } from "lib/util/grpcUtil";
import { IdWrapper } from "proto/base_pb";
import {
  AddGroupReq,
  GroupDTO,
  ImportGroupsReq,
  ListGroupsReq,
  SwitchOrderReq,
} from "proto/user_pb";
import { useEffect, useState, useCallback } from "react";
import { BaseFieldSchema, getAuthMD } from "stores/GlobalStore";
import localStorage from "stores/local";

interface Group {
  id: number;
  name: string;
}

export function useGroups(groupType: GroupType) {
  // 用来让 groups 自动更新
  const [groupVersion, setGroupVersion] = useState(0);
  // 分组选中的 index
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [groups, setGroups] = useState<Group[]>();

  const initCoinGroups = useCallback(() => {
    const localGroups = localStorage.get("coinGroups");
    const oldLocalGroups = localStorage.get("savedCoinsGroups");
    if (localGroups || oldLocalGroups) {
      // 导入数据
      const importReq = new ImportGroupsReq();
      importReq.setGroups(JSON.stringify(localGroups || oldLocalGroups));
      return userService.importCoinGroups(importReq, getAuthMD());
    } else {
      // 添加默认 group
      const req = new AddGroupReq();
      req.setName("我的资产");
      req.setGroupType(groupType);
      return userService.addGroup(req, getAuthMD());
    }
  }, [groupType]);

  const initTradeGroups = useCallback(() => {
    const localGroups = localStorage.get("tradeGroups");
    if (localGroups) {
      // 导入数据
      const importReq = new ImportGroupsReq();
      importReq.setGroups(JSON.stringify(localGroups));
      return userService.importTradeGroups(importReq, getAuthMD());
    } else {
      // 添加默认 group
      const req = new AddGroupReq();
      req.setName("交易记录");
      req.setGroupType(groupType);
      return userService.addGroup(req, getAuthMD());
    }
  }, [groupType]);

  // fetch groups
  useEffect(() => {
    const req = new ListGroupsReq();
    req.setType(groupType);
    userService
      .listGroups(req, getAuthMD())
      .then((res) => {
        if (res.getGroupsList().length === 0) {
          // 初始化 group
          if (groupType === GroupType.CoinAccount) {
            return initCoinGroups().then(() => setGroupVersion((i) => i + 1));
          } else if (groupType === GroupType.CoinTrade) {
            return initTradeGroups().then(() => setGroupVersion((i) => i + 1));
          }
        }
        setGroups(
          res.getGroupsList().map((g) => ({
            id: g.getId(),
            name: g.getName(),
          }))
        );
      })
      .catch(handleGrpcError)
      .catch(showError);
  }, [groupVersion, groupType, initCoinGroups, initTradeGroups]);

  function addGroup() {
    if (!groups) {
      return;
    }
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "分组名",
      },
    ];
    openPopupForm({
      title: "添加分组",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        const req = new AddGroupReq();
        req.setName(data.title);
        req.setGroupType(groupType);
        return userService
          .addGroup(req, getAuthMD())
          .then(() => {
            setGroupVersion((i) => i + 1);
          })
          .catch(handleGrpcError);
      },
    });
  }

  function updateGroup(index: number) {
    if (!groups) {
      return;
    }
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "分组名",
        defaultValue: groups[index].name,
      },
    ];
    openPopupForm({
      title: "修改分组",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!groups) {
          return;
        }
        const req = new GroupDTO();
        req.setId(groups[index].id);
        req.setName(data.title);
        return userService
          .updateGroup(req, getAuthMD())
          .then(() => {
            setGroupVersion((i) => i + 1);
          })
          .catch(handleGrpcError);
      },
    });
  }

  function deleteGroup(index: number) {
    if (!groups) {
      return;
    }

    const name = groups[index].name;
    confirmPromise("请确认", `确实要删除[${name}]吗？`).then((confirm) => {
      if (confirm) {
        const req = new IdWrapper();
        req.setId(groups[index].id);
        userService
          .deleteGroup(req, getAuthMD())
          .then(() => {
            if (index === selectedIndex) {
              setSelectedIndex(0);
            }
            setGroupVersion((i) => i + 1);
          })
          .catch(handleGrpcError)
          .catch(showError);
      }
    });
  }

  function moveGroup(direction: "up" | "down", index: number) {
    if (!groups) {
      return;
    }
    const otherIndex = direction === "up" ? index - 1 : index + 1;
    if (otherIndex < 0 || otherIndex >= groups.length) {
      return;
    }

    const req = new SwitchOrderReq();
    req.setIdA(groups[index].id);
    req.setIdB(groups[otherIndex].id);
    userService
      .switchGroup(req, getAuthMD())
      .then(() => {
        setGroupVersion((i) => i + 1);

        // 是否选中跟随移动
        if (otherIndex === selectedIndex) {
          setSelectedIndex(index);
        } else if (index === selectedIndex) {
          setSelectedIndex(otherIndex);
        }
      })
      .catch(handleGrpcError)
      .catch(showError);
  }

  return {
    groups,
    selectedIndex,
    addGroup,
    updateGroup,
    moveGroup,
    deleteGroup,
    setSelectedIndex,
  };
}
