import { Button, Col, Divider, Row } from "antd";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError, showInfo } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { useUserData } from "hooks/userData";
import { List } from "immutable";
import { getAccountInfo } from "lib/eos";
import { trackEvent } from "lib/gtag";
import { uniqStrs } from "lib/util/array";
import React, { useCallback, useEffect, useState, useContext } from "react";
import Clipboard from "react-clipboard.js";
import { BaseFieldSchema, globalContext } from "stores/GlobalStore";

import css from "./EosAccounts.module.scss";
import {
  PlusOutlined,
  EditOutlined,
  UpOutlined,
  DownOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useLocation, useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import Groups from "comps/groups/Groups";

interface Group {
  title: string;
  accounts: Array<string>;
}

type AccountMap = {
  [account: string]: {
    balance1: number;
    balance2: number;
    balance3: number;
    total: number;
  };
};

function formatEosAmount(num: number, digits: number = 4): string {
  return num.toFixed(digits).replace(/([.]?0+)$/, "");
}

const useUserDataOpts = {
  dataKey: "eosGroups",
  defaultGroups: [{ title: "我的资产", accounts: [] }],
  uniqGroupInfo: (group: Group) => {
    group.accounts = uniqStrs(group.accounts);
  },
};

function Component() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [accountMap, setAccountMap] = useState<AccountMap>({});
  const { groups, setGroups } = useUserData<Group>(useUserDataOpts);

  const fetchAccounts = useCallback(() => {
    if (groups == null || groups.length === 0) {
      return;
    }

    // 获取账号链上信息
    trackEvent("fetch_eos_accounts");
    const accounts = groups[currentGroupIndex].accounts;
    Promise.all(
      accounts.map((account) => getAccountInfo(account).catch(() => null))
    ).then((infos) => {
      infos.forEach((info) => {
        if (!info) {
          return;
        }
        const balance1 = info.core_liquid_balance
          ? parseEosAmount(info.core_liquid_balance)
          : 0;
        const balance2 = info.voter_info
          ? (info.voter_info && info.voter_info.staked) / 10000
          : 0;
        const balance3 = info.refund_request
          ? parseEosAmount(info.refund_request.net_amount) +
            parseEosAmount(info.refund_request.cpu_amount)
          : 0;
        const total = balance1 + balance2 + balance3;
        const accountInfo = { balance1, balance2, balance3, total };

        setAccountMap((old) => {
          const newAccountMap = {
            ...old,
            [info.account_name]: accountInfo,
          };
          return deepClone(newAccountMap);
        });
      });
    });
  }, [groups, currentGroupIndex]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  function parseEosAmount(str: string) {
    return Number(str.split(" ")[0]);
  }

  function deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  function addCate() {
    if (groups == null) {
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
        setGroups(
          List(groups).push({ title: data.title, accounts: [] }).toJS()
        );
      },
    });
  }

  function addAccount() {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "account",
        title: "EOS 账号",
        placeholder: "EOS 账户（可以一次填入多个，用逗号分隔）",
      },
    ];
    openPopupForm({
      title: "添加 EOS 账号",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!groups) {
          return;
        }

        if (!data.account) {
          return;
        }

        const newAccounts = data.account.split(",");
        setGroups(
          List(groups)
            .updateIn([currentGroupIndex, "accounts"], (list) => {
              list.push(...newAccounts);
              return list;
            })
            .toJS()
        );
      },
    });
  }

  function updateGroup(index: number) {
    if (groups == null) {
      return;
    }
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "分组名",
        defaultValue: groups[index].title,
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
        setGroups(List(groups).setIn([index, "title"], data.title).toJS());
      },
    });
  }

  function updateAccount(groupIndex: number, accountIndex: number) {
    if (groups == null) {
      return;
    }
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "account",
        title: "EOS 账号",
        defaultValue: List(groups).getIn([
          groupIndex,
          "accounts",
          accountIndex,
        ]),
      },
    ];
    openPopupForm({
      title: "修改账户",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        setGroups(
          List(groups)
            .setIn([groupIndex, "accounts", accountIndex], data.account)
            .toJS()
        );
      },
    });
  }

  function reloadAccounts() {
    fetchAccounts();
  }

  function deleteCate(index: number, parentIndex?: number) {
    if (groups == null) {
      return;
    }
    const keyPath = parentIndex == null ? [] : [parentIndex, "accounts"];
    const name =
      parentIndex == null
        ? `分组 [${groups[index].title}] `
        : `账号 [${groups[parentIndex].accounts[index]}] `;
    confirmPromise("请确认", `确实要删除${name}吗？`).then((confirm) => {
      if (confirm) {
        if (parentIndex == null) {
          if (index < currentGroupIndex) {
            setCurrentGroupIndex((i) => i - 1);
          }
          if (index === currentGroupIndex) {
            setCurrentGroupIndex(0);
          }
        }
        setGroups(
          List(groups)
            .deleteIn([...keyPath, index])
            .toJS() as any
        );
      }
    });
  }

  function switchObject(
    obj: any,
    keyPath1: Array<any>,
    keyPath2: Array<any>
  ): any {
    let a = List(obj);
    if (a.getIn(keyPath1) && a.getIn(keyPath2)) {
      a = a
        .setIn(keyPath2, a.getIn(keyPath1))
        .setIn(keyPath1, a.getIn(keyPath2));
    }
    return a.toJS();
  }

  // parentIndex 为空表示修改的是分组，否则修改的是账号
  function moveItem(
    direction: "up" | "down",
    index: number,
    parentIndex?: number
  ) {
    if (groups == null) {
      return;
    }
    const otherIndex = direction === "up" ? index - 1 : index + 1;
    if (otherIndex < 0) {
      return;
    }
    if (parentIndex == null && otherIndex >= groups.length) {
      return;
    }
    if (
      parentIndex != null &&
      otherIndex >= groups[parentIndex].accounts.length
    ) {
      return;
    }

    if (parentIndex == null) {
      // 是否选中跟随移动
      if (otherIndex === currentGroupIndex) {
        setCurrentGroupIndex(index);
      } else if (index === currentGroupIndex) {
        setCurrentGroupIndex(otherIndex);
      }
    }

    const keyPath = parentIndex == null ? [] : [parentIndex, "accounts"];
    setGroups(
      switchObject(groups, [...keyPath, index], [...keyPath, otherIndex])
    );
  }

  if (groups == null) {
    return <Loading />;
  }

  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  let sumTotal = 0;
  if (groups[currentGroupIndex] != null) {
    groups[currentGroupIndex].accounts.forEach((account) => {
      sum1 += accountMap[account] ? accountMap[account].balance1 : 0;
      sum2 += accountMap[account] ? accountMap[account].balance2 : 0;
      sum3 += accountMap[account] ? accountMap[account].balance3 : 0;
    });
    sumTotal += sum1 + sum2 + sum3;
  }

  return (
    <div className={css.container}>
      <Row>
        <Col span={7}>
          <Groups
            addGroup={addCate}
            groups={groups.map((g, i) => ({ id: i, name: g.title }))}
            setCurrentGroupIndex={setCurrentGroupIndex}
            currentGroupIndex={currentGroupIndex}
            updateGroup={updateGroup}
            moveGroup={moveItem}
            deleteGroup={deleteCate}
            changeGroup={() => {}}
          />
        </Col>
        <Col span={17}>
          {groups[currentGroupIndex] != null && (
            <div className="ant-table ant-table-default ant-table-scroll-position-left">
              <div className="ant-table-content">
                <div className="ant-table-body">
                  <table className="table">
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>序号</th>
                        <th>
                          EOS 账号
                          <Button type="link" onClick={() => addAccount()}>
                            <PlusOutlined />
                          </Button>
                        </th>
                        <th>可用余额</th>
                        <th>质押</th>
                        <th>赎回中</th>
                        <th>总额度</th>
                        <th style={{ textAlign: "right" }}>
                          操作
                          <Button type="link" onClick={() => reloadAccounts()}>
                            <ReloadOutlined />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {groups[currentGroupIndex].accounts.map((account, i) => {
                        const info = accountMap[account] || {
                          balance1: 0,
                          balance2: 0,
                          balance3: 0,
                          total: 0,
                        };
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://bloks.io/account/${account}`}
                              >
                                {account}
                              </a>
                            </td>
                            <td>{formatEosAmount(info.balance1)}</td>
                            <td>{formatEosAmount(info.balance2)}</td>
                            <td>{formatEosAmount(info.balance3)}</td>
                            <td className="text-right">
                              {formatEosAmount(info.total)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <EditOutlined
                                className={css.icon}
                                onClick={() =>
                                  updateAccount(currentGroupIndex, i)
                                }
                              />
                              <Divider type="vertical" />

                              <UpOutlined
                                className={css.icon}
                                onClick={() =>
                                  moveItem("up", i, currentGroupIndex)
                                }
                              />
                              <Divider type="vertical" />

                              <DownOutlined
                                className={css.icon}
                                onClick={() =>
                                  moveItem("down", i, currentGroupIndex)
                                }
                              />
                              <Divider type="vertical" />

                              <DeleteOutlined
                                className={css.icon}
                                onClick={() => deleteCate(i, currentGroupIndex)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>汇总</th>
                        <th>
                          <Clipboard
                            data-clipboard-text={groups[
                              currentGroupIndex
                            ].accounts.join(",")}
                            component="span"
                            style={{ color: "#007bff", cursor: "pointer" }}
                            onSuccess={() => {
                              showInfo("账号信息复制成功");
                            }}
                            onError={() => {
                              showError("复制失败");
                            }}
                          >
                            导出
                          </Clipboard>
                        </th>
                        <th>{formatEosAmount(sum1)}</th>
                        <th>{formatEosAmount(sum2)}</th>
                        <th>{formatEosAmount(sum3)}</th>
                        <th className="text-right">
                          {formatEosAmount(sumTotal)}
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

const LoginComponent = function () {
  const globalStore = useContext(globalContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!globalStore.user) {
      history.replace("/login?rd=" + location.pathname);
    }
  });

  return globalStore.user ? <Component /> : null;
};

export default observer(LoginComponent);
