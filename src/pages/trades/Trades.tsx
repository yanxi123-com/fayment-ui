import { Button, Col, Divider, Icon, List as AntList, Radio, Row } from "antd";
import Search from "antd/lib/input/Search";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { useUserData } from "hooks/userData";
import { List } from "immutable";
import { httpGet } from "lib/apiClient";
import { trackEvent } from "lib/gtag";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { BaseFieldSchema } from "stores/GlobalStore";

import css from "./Trades.module.scss";
import { addTrade, updateTrade } from "./tradeForm";
import { formatDate } from "lib/util/format";

const baseCoins = ["BTC", "USD", "EOS", "ETH", "BNB", "CNY"];

let actionClicked = false;

interface TradeInfo {
  tradeDate: Date | undefined; // 如果空表示交易计划，非空表示已成交
  buy: string; // 100 EOS
  sell: string; // 1000 USD
}

interface Group {
  title: string;
  trades: Array<TradeInfo>;
}

const useUserDataOpts = {
  oldLocalKey: "notSuppoted",
  dataKey: "tradeGroups",
  defaultGroups: [
    { title: "交易记录", trades: [] },
    { title: "交易计划", trades: [] }
  ],
  uniqGroupInfo: (group: Group) => {}
};

function Component() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pricesByBTC, setPricesByBTC] = useState<{ [sym: string]: number }>({});
  const [baesCoin, setBaseCoin] = useState("BTC");
  const [filerText, setFilterText] = useState("");
  const { groups, setGroups } = useUserData<Group>(useUserDataOpts);

  const fetchPrices = useCallback(() => {
    trackEvent("fetch_prices");
    httpGet("listPricesByBTC")
      .then(data => {
        setPricesByBTC(data);
      })
      .catch(showError);
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => {
      fetchPrices();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  function parseCoinSym(sym: string | undefined): string | undefined {
    if (sym == null) {
      return undefined;
    }
    sym = sym.toUpperCase();
    if (sym.indexOf("USD") > -1) {
      return "USD";
    }
    if (sym === "BTC") {
      return "BTC";
    }
    if (pricesByBTC[sym]) {
      return sym;
    }
    return undefined;
  }

  function getPriceByBTC(sym: string): number | undefined {
    let priceByBTC = pricesByBTC[sym];
    if (priceByBTC) {
      return priceByBTC;
    }

    return undefined;
  }

  function getBaseCoinPrice(sym: string): number | undefined {
    const coinPriceByBTC = getPriceByBTC(sym);
    const baseCoinPriceByBTC = getPriceByBTC(baesCoin);

    if (coinPriceByBTC == null || baseCoinPriceByBTC == null) {
      return undefined;
    }

    return coinPriceByBTC / baseCoinPriceByBTC;
  }

  function addCate() {
    if (!groups) {
      return;
    }
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
            .push({ title: data.title, trades: [] })
            .toJS()
        );
      }
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

  function deleteCate(index: number, parentIndex?: number) {
    if (!groups) {
      return;
    }
    const keyPath = parentIndex == null ? [] : [parentIndex, "coins"];
    const name =
      parentIndex == null ? `分组 [${groups[index].title}] ` : `此交易`;
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
    if (!groups) {
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
      otherIndex >= groups[parentIndex].trades.length
    ) {
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

  return (
    <div className={css.container}>
      <Row>
        <Col span={6}>
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
        <Col span={18}>
          <div style={{ marginBottom: 20 }}>
            {Object.keys(pricesByBTC).length > 0 && (
              <Button
                onClick={() => addTrade()}
                icon="plus"
                style={{ marginRight: 30 }}
              >
                添加记录
              </Button>
            )}
            盈亏计价单位: &nbsp;
            <Radio.Group
              onChange={e => {
                setBaseCoin(e.target.value);
              }}
              defaultValue="BTC"
            >
              {baseCoins.map(coin => (
                <Radio.Button key={coin} value={coin}>
                  {coin}
                </Radio.Button>
              ))}
            </Radio.Group>
            <Search
              style={{ marginLeft: 30, width: 200 }}
              placeholder="过滤"
              onChange={e => setFilterText(e.currentTarget.value)}
            />
          </div>
          {groups[selectedIndex] != null && (
            <div className="ant-table ant-table-default ant-table-scroll-position-left">
              <div className="ant-table-content">
                <div className="ant-table-body">
                  <table className={cx("table", css.coins)}>
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>序号</th>
                        <th>交易时间</th>
                        <th>买入</th>
                        <th>卖出</th>
                        <th>交易价格</th>
                        <th>最新价格</th>
                        <th>盈亏</th>
                        <th style={{ textAlign: "center" }}>
                          操作
                          <Button type="link" onClick={() => fetchPrices()}>
                            <Icon type="reload" />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {groups[selectedIndex].trades.map((trade, i) => {
                        const { tradeDate, buy, sell } = trade;
                        if (filerText) {
                          const word = filerText.toUpperCase();

                          const findResult = [
                            formatDate(tradeDate),
                            buy,
                            sell
                          ].find(s => {
                            if (s == null) {
                              return false;
                            }
                            return s.indexOf(word) > -1;
                          });

                          if (findResult == null) {
                            return null;
                          }
                        }

                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{formatDate(tradeDate)}</td>
                            <td>{trade.buy}</td>
                            <td>{trade.sell}</td>
                            <td>$price1</td>
                            <td>$price2</td>
                            <td>盈亏</td>
                            <td style={{ width: 150, textAlign: "center" }}>
                              <Icon
                                type="edit"
                                className={css.icon}
                                onClick={() => updateTrade(selectedIndex, i)}
                              />
                              <Divider type="vertical" />

                              {filerText === "" && (
                                <>
                                  <Icon
                                    type="up"
                                    className={css.icon}
                                    onClick={() =>
                                      moveItem("up", i, selectedIndex)
                                    }
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
                                </>
                              )}

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

export default observer(Component);
