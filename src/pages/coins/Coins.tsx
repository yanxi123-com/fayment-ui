import { Button, Col, Divider, Icon, List as AntList, Row } from "antd";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError, showInfo } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { List } from "immutable";
import React, { useEffect, useState } from "react";
import { BaseFieldSchema } from "stores/GlobalStore";
import localStorage from "stores/local";

import css from "./Coins.module.scss";

const validCoins = ["BTC", "EOS", "ETH", "USD"];

let actionClicked = false;

interface CoinInfo {
  title: string;
  sym: string;
  balance: number;
}

interface Group {
  title: string;
  coins: Array<CoinInfo>;
}

interface CoinMapValue {
  balance: number;

  eosPrice: number;
  usdPrice: number;
  btcPrice: number;
}

type CoinMap = {
  [sym: string]: CoinMapValue;
};

// title 和 sym 都相同为相同
function uniqCoins(coins: CoinInfo[]): CoinInfo[] {
  const result: CoinInfo[] = [];
  const strMap: { [key: string]: boolean } = {};
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    const key = `${coin.title},${coin.sym}`;
    if (strMap[key] == null) {
      strMap[key] = true;
      result.push(coin);
    }
  }
  return result;
}

export default function() {
  const [groups, setGroupsOri] = useState<Array<Group>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [coinMap, setCoinMap] = useState<CoinMap>({});
  const [coins, setCoins] = useState<Array<CoinInfo>>([]);

  const setGroups = (groups: Array<Group>) => {
    // 去重
    groups.forEach(group => {
      group.coins = uniqCoins(group.coins);
    });

    setGroupsOri(groups);
    localStorage.set("savedCoinsGroups", groups);
  };

  useEffect(() => {
    const groups: Array<Group> = localStorage.get("savedCoinsGroups");
    if (groups != null) {
      setGroups(groups);
      if (groups.length > 0) {
        setCoins(groups[0].coins);
      }
    } else {
      setGroups([{ title: "我的资产", coins: [] }]);
    }
  }, []);

  useEffect(() => {
    // 获取代币价格信息
  }, [coins]);

  function parseEosAmount(str: string) {
    return Number(str.split(" ")[0]);
  }

  function addCate() {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "分组名"
      }
    ];
    openPopupForm({
      title: "添加分组",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        setGroups(
          List(groups)
            .push({ title: data.title, coins: [] })
            .toJS()
        );
      }
    });
  }

  function addCoin() {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "账户",
        placeholder: "请填写账户名称",
        defaultValue: "默认"
      },
      {
        type: "text",
        key: "sym",
        title: "币种",
        placeholder: "请填写币种，比如 BTC, EOS, ETH"
      },
      {
        type: "number",
        key: "balance",
        title: "持有数量",
        placeholder: "请输入持有数量",
        defaultValue: "0"
      }
    ];
    openPopupForm({
      title: "添加账户",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!groups) {
          return;
        }

        const sym = ((data.sym as string) || "").toUpperCase();
        const balance = isNaN(data.balance) ? 0 : data.balance;
        const title = data.title || "默认";

        if (validCoins.indexOf(sym) == -1) {
          return;
        }

        const newCoin: CoinInfo = {
          title,
          sym,
          balance
        };
        const newGroups: Group[] = List(groups)
          .updateIn([selectedIndex, "coins"], list => {
            list.push(newCoin);
            return list;
          })
          .toJS();

        setGroups(newGroups);
        setCoins(newGroups[selectedIndex].coins);
      }
    });
  }

  function updateGroup(index: number) {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "分组名",
        defaultValue: groups[index].title
      }
    ];
    openPopupForm({
      title: "修改分组",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!groups) {
          return;
        }
        setGroups(
          List(groups)
            .setIn([index, "title"], data.title)
            .toJS()
        );
      }
    });
  }

  function updateCoin(groupIndex: number, coinIndex: number) {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "title",
        title: "账户",
        placeholder: "请填写账户名称",
        defaultValue: List(groups).getIn([
          groupIndex,
          "coins",
          coinIndex,
          "title"
        ])
      },
      {
        type: "text",
        key: "sym",
        title: "币种",
        placeholder: "请填写币种，比如 BTC, EOS, ETH",
        defaultValue: List(groups).getIn([
          groupIndex,
          "coins",
          coinIndex,
          "sym"
        ])
      },
      {
        type: "number",
        key: "balance",
        title: "持有数量",
        placeholder: "请输入持有数量",
        defaultValue: List(groups).getIn([
          groupIndex,
          "coins",
          coinIndex,
          "balance"
        ])
      }
    ];
    openPopupForm({
      title: "修改币种",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        const newGroups: Group[] = List(groups)
          .setIn([groupIndex, "coins", coinIndex], {
            sym: data.sym,
            balance: data.balance
          })
          .toJS();
        setGroups(newGroups);
        setCoins(newGroups[selectedIndex].coins);
      }
    });
  }

  function reloadCoins() {
    setCoins([]);
    setTimeout(() => {
      setCoins(groups[selectedIndex].coins);
    });
  }

  function deleteCate(index: number, parentIndex?: number) {
    const keyPath = parentIndex == null ? [] : [parentIndex, "coins"];
    const name =
      parentIndex == null
        ? `分组 [${groups[index].title}] `
        : `币种 [${groups[parentIndex].coins[index].sym}] `;
    confirmPromise("请确认", `确实要删除${name}吗？`).then(confirm => {
      if (confirm) {
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
    const otherIndex = direction === "up" ? index - 1 : index + 1;
    if (otherIndex < 0) {
      return;
    }
    if (parentIndex == null && otherIndex >= groups.length) {
      return;
    }
    if (parentIndex != null && otherIndex >= groups[parentIndex].coins.length) {
      return;
    }

    if (parentIndex == null) {
      // 是否选中跟随移动
      if (otherIndex === selectedIndex) {
        setSelectedIndex(index);
      } else if (index === selectedIndex) {
        setSelectedIndex(otherIndex);
      }
    }

    const keyPath = parentIndex == null ? [] : [parentIndex, "coins"];
    setGroups(
      switchObject(groups, [...keyPath, index], [...keyPath, otherIndex])
    );
  }

  if (groups == null) {
    return <Loading />;
  }

  //   let sum1 = 0;
  //   let sum2 = 0;
  //   let sum3 = 0;
  //   let sumTotal = 0;
  //   if (groups[selectedIndex] != null) {
  //     groups[selectedIndex].accounts.forEach(account => {
  //       sum1 += accountMap[account] ? accountMap[account].balance1 : 0;
  //       sum2 += accountMap[account] ? accountMap[account].balance2 : 0;
  //       sum3 += accountMap[account] ? accountMap[account].balance3 : 0;
  //     });
  //     sumTotal += sum1 + sum2 + sum3;
  //   }

  return (
    <div className={css.container}>
      <Row>
        <Col span={7}>
          <AntList
            style={{ marginRight: 38 }}
            header={
              <div style={{ margin: 0, padding: 0 }}>
                分组列表
                <Button type="link" onClick={() => addCate()}>
                  <Icon type="plus" />
                </Button>
              </div>
            }
            dataSource={groups}
            renderItem={(item, i) => (
              <AntList.Item
                actions={[
                  <Icon
                    type="edit"
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      updateGroup(i);
                    }}
                  />,
                  <Icon
                    type="up"
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      moveItem("up", i);
                    }}
                  />,
                  <Icon
                    type="down"
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      moveItem("down", i);
                    }}
                  />,
                  <Icon
                    type="delete"
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      deleteCate(i);
                    }}
                  />
                ]}
                onClick={() => {
                  if (actionClicked) {
                    actionClicked = false;
                    return;
                  }

                  setSelectedIndex(i);
                  setCoins(groups[i].coins);
                }}
                className={cx(
                  i === selectedIndex && css.active,
                  i === selectedIndex - 1 && css.preActive
                )}
              >
                <div className={css.level1Title}>{item.title}</div>
              </AntList.Item>
            )}
          />
        </Col>
        <Col span={17}>
          {groups[selectedIndex] != null && (
            <div className="ant-table ant-table-default ant-table-scroll-position-left">
              <div className="ant-table-content">
                <div className="ant-table-body">
                  <table className="table">
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>序号</th>
                        <th>
                          账户名
                          <Button type="link" onClick={() => addCoin()}>
                            <Icon type="plus" />
                          </Button>
                        </th>
                        <th>币种</th>
                        <th>价格</th>
                        <th>数量</th>
                        <th>价值</th>
                        <th style={{ textAlign: "right" }}>
                          操作
                          <Button type="link" onClick={() => reloadCoins()}>
                            <Icon type="reload" />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {groups[selectedIndex].coins.map((coin, i) => {
                        const info: CoinMapValue = coinMap[coin.sym] || {
                          balance: coin.balance,

                          eosPrice: 0,
                          btcPrice: 0,
                          usdPrice: 0
                        };
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{coin.title}</td>
                            <td>{coin.sym}</td>
                            <td>
                              {info.btcPrice} BTC
                              <br />
                              {info.eosPrice} EOS
                              <br />
                              {info.usdPrice} USD
                            </td>
                            <td>
                              {info.balance} {coin.sym}
                            </td>
                            <td></td>
                            <td style={{ textAlign: "right" }}>
                              <Icon
                                type="edit"
                                className={css.icon}
                                onClick={() => updateCoin(selectedIndex, i)}
                              />
                              <Divider type="vertical" />

                              <Icon
                                type="up"
                                className={css.icon}
                                onClick={() => moveItem("up", i, selectedIndex)}
                              />
                              <Divider type="vertical" />

                              <Icon
                                type="down"
                                className={css.icon}
                                onClick={() =>
                                  moveItem("down", i, selectedIndex)
                                }
                              />
                              <Divider type="vertical" />

                              <Icon
                                type="delete"
                                className={css.icon}
                                onClick={() => deleteCate(i, selectedIndex)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>汇总</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
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
