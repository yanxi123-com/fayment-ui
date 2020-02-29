import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  UpOutlined
} from "@ant-design/icons";
import { Button, Col, Divider, List as AntList, Radio, Row } from "antd";
import Search from "antd/lib/input/Search";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { usePrices } from "hooks/usePrices";
import { useUserData } from "hooks/userData";
import { List } from "immutable";
import { formatDate } from "lib/util/format";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { BaseFieldSchema } from "stores/GlobalStore";

import { getBaseSym } from "./priceUtil";
import { TradeForm, TradeInfo } from "./tradeForm";
import css from "./Trades.module.scss";

const baseCoins = ["自动", "BTC", "USD", "EOS", "ETH", "BNB", "CNY"];

let actionClicked = false;

interface Group {
  title: string;
  trades: Array<TradeInfo>;
}

const useUserDataOpts = {
  oldLocalKey: "notSuppoted",
  dataKey: "tradeGroups",
  defaultGroups: [{ title: "交易监控", trades: [] }],
  uniqGroupInfo: () => {}
};

interface ModalInfo {
  trade?: TradeInfo;
  onSubmit?: (trade: TradeInfo) => void;
}

function Component() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filerText, setFilterText] = useState("");
  const [modalInfo, setModalInfo] = useState<ModalInfo>({});
  const { groups, setGroups } = useUserData<Group>(useUserDataOpts);
  const {
    refreshPrice,
    pricesByBTC,
    baseCoin,
    setBaseCoin,
    getBaseCoinPrice
  } = usePrices("USD");

  function addTrade() {
    if (!groups) {
      return;
    }
    setModalInfo({
      onSubmit: trade => {
        const newGroups: Group[] = List(groups)
          .updateIn([selectedIndex, "trades"], list => {
            list.push(trade);
            return list;
          })
          .toJS();
        setGroups(newGroups);
        setModalInfo({});
      }
    });
  }

  function updateTrade(groupIndex: number, tradeIndex: number) {
    if (!groups) {
      return;
    }
    const trade: TradeInfo = List(groups).getIn([
      groupIndex,
      "trades",
      tradeIndex
    ]);

    setModalInfo({
      trade: trade,
      onSubmit: trade => {
        const newGroups: Group[] = List(groups)
          .setIn([groupIndex, "trades", tradeIndex], trade)
          .toJS();
        setGroups(newGroups);
        setModalInfo({});
      }
    });
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
    const keyPath = parentIndex == null ? [] : [parentIndex, "trades"];
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

    const keyPath = parentIndex == null ? [] : [parentIndex, "trades"];
    setGroups(
      switchObject(groups, [...keyPath, index], [...keyPath, otherIndex])
    );
  }

  if (groups == null) {
    return <Loading />;
  }

  let totalAmountByBaseCoin: number = 0;
  let totalAmountByUSD: number = 0;

  return (
    <div className={css.container}>
      {modalInfo.onSubmit && (
        <TradeForm
          trade={modalInfo.trade}
          symPriceMap={pricesByBTC}
          onSubmit={modalInfo.onSubmit}
          onCancel={() => setModalInfo({})}
        />
      )}
      <Row>
        <Col span={6}>
          <AntList
            style={{ marginRight: 38 }}
            header={
              <div style={{ margin: 0, padding: 0 }}>
                分组列表
                <Button type="link" onClick={() => addCate()}>
                  <PlusOutlined />
                </Button>
              </div>
            }
            dataSource={groups}
            renderItem={(item, i) => (
              <AntList.Item
                actions={[
                  <EditOutlined
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      updateGroup(i);
                    }}
                  />,
                  <UpOutlined
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      moveItem("up", i);
                    }}
                  />,
                  <DownOutlined
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      moveItem("down", i);
                    }}
                  />,
                  <DeleteOutlined
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
                icon={<PlusOutlined />}
                style={{ marginRight: 30 }}
              >
                添加记录
              </Button>
            )}
            盈亏计价单位: &nbsp;
            <Radio.Group
              onChange={e => {
                setBaseCoin(e.target.value === "自动" ? "USD" : e.target.value);
              }}
              defaultValue="自动"
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
                        <th>盈亏数量</th>
                        <th>盈亏额度</th>
                        <th style={{ textAlign: "center" }}>
                          操作
                          <Button type="link" onClick={refreshPrice}>
                            <ReloadOutlined />
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

                        // 计算交易价格
                        const [buyAmount, buySym] = parseQuantity(buy);
                        const [sellAmount, sellSym] = parseQuantity(sell);
                        const baseSym = getBaseSym(
                          pricesByBTC,
                          buySym,
                          sellSym
                        );
                        let tradePrice: number;
                        if (baseSym === buySym) {
                          // 做空: btc(sell) -> usd(buy)
                          tradePrice = buyAmount / sellAmount;
                        } else {
                          // 做多: usd(sell) -> btc(buy)
                          tradePrice = sellAmount / buyAmount;
                        }

                        // 计算最新价格
                        let currentPrice: number | undefined;
                        const buySymPrice = pricesByBTC[buySym];
                        const sellSymPrice = pricesByBTC[sellSym];
                        if (buySymPrice && sellSymPrice) {
                          if (baseSym === buySym) {
                            // 做空: btc(sell) -> usd(buy)
                            currentPrice = sellSymPrice / buySymPrice;
                          } else {
                            // 做多: usd(sell) -> btc(buy)
                            currentPrice = buySymPrice / sellSymPrice;
                          }
                        }

                        // 计算盈亏比例
                        let earnPercent: number | undefined;
                        if (tradePrice && currentPrice) {
                          if (baseSym === buySym) {
                            // 做空: btc(sell) -> usd(buy)
                            currentPrice = sellSymPrice / buySymPrice;

                            // 做空盈亏计算
                            earnPercent =
                              ((tradePrice - currentPrice) / tradePrice) * 100;
                          } else {
                            // 做多: usd(sell) -> btc(buy)
                            currentPrice = buySymPrice / sellSymPrice;
                            earnPercent =
                              ((currentPrice - tradePrice) / tradePrice) * 100;
                          }
                        }

                        // 盈亏数量
                        let earnBaseSymAmount: number | undefined;
                        if (tradePrice && currentPrice) {
                          if (baseSym === buySym) {
                            // 做空: btc(sell) -> usd(buy)
                            earnBaseSymAmount =
                              tradePrice * sellAmount -
                              currentPrice * sellAmount;
                          } else {
                            // 做多: usd(sell) -> btc(buy)
                            earnBaseSymAmount =
                              currentPrice * buyAmount - tradePrice * buyAmount;
                          }
                        }

                        // 盈亏数据基于 baseCoin
                        let earnBaseCoinAmount: number | undefined;
                        if (earnBaseSymAmount && tradeDate) {
                          const baseSymPrice = getBaseCoinPrice(baseSym);
                          if (baseSymPrice) {
                            earnBaseCoinAmount =
                              earnBaseSymAmount * baseSymPrice;
                            totalAmountByBaseCoin += earnBaseCoinAmount;
                          }
                        }

                        // 盈亏数据基于 USD
                        if (earnBaseSymAmount && tradeDate) {
                          const baseSymPrice = getBaseCoinPrice("USD");
                          if (baseSymPrice) {
                            totalAmountByUSD +=
                              earnBaseSymAmount * baseSymPrice;
                            console.log("totalAmountByUSD", totalAmountByUSD);
                          }
                        }

                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              {tradeDate ? formatDate(tradeDate) : "交易计划"}
                            </td>
                            <td>{trade.buy}</td>
                            <td>{trade.sell}</td>
                            <td>
                              {tradePrice.toPrecision(4)} {baseSym}
                            </td>
                            <td>
                              {currentPrice && (
                                <>
                                  {currentPrice.toPrecision(4)} {baseSym}
                                </>
                              )}
                            </td>
                            <td>
                              {tradeDate != null && (
                                <span
                                  className={cx(
                                    earnPercent && earnPercent > 0 && css.earn,
                                    earnPercent && earnPercent < 0 && css.lose
                                  )}
                                >
                                  {earnPercent && `${earnPercent.toFixed(2)}%`}
                                </span>
                              )}
                              {tradeDate == null && (
                                <>
                                  {earnPercent &&
                                    earnPercent > 0 &&
                                    "等待机会..."}

                                  {earnPercent &&
                                    earnPercent < 0 &&
                                    "**可交易**"}
                                </>
                              )}
                            </td>
                            <td>
                              {tradeDate && (
                                <span
                                  className={cx(
                                    earnPercent && earnPercent > 0 && css.earn,
                                    earnPercent && earnPercent < 0 && css.lose
                                  )}
                                >
                                  {earnBaseSymAmount && baseCoin === "自动" && (
                                    <>
                                      {earnBaseSymAmount.toPrecision(4)}&nbsp;
                                      {baseSym}
                                    </>
                                  )}

                                  {earnBaseCoinAmount && baseCoin !== "自动" && (
                                    <>
                                      {earnBaseCoinAmount.toPrecision(4)}&nbsp;
                                      {baseCoin}
                                    </>
                                  )}
                                </span>
                              )}
                            </td>
                            <td style={{ width: 150, textAlign: "center" }}>
                              <EditOutlined
                                className={css.icon}
                                onClick={() => updateTrade(selectedIndex, i)}
                              />
                              <Divider type="vertical" />

                              {filerText === "" && (
                                <>
                                  <UpOutlined
                                    className={css.icon}
                                    onClick={() =>
                                      moveItem("up", i, selectedIndex)
                                    }
                                  />
                                  <Divider type="vertical" />

                                  <DownOutlined
                                    className={css.icon}
                                    onClick={() =>
                                      moveItem("down", i, selectedIndex)
                                    }
                                  />
                                  <Divider type="vertical" />
                                </>
                              )}

                              <DeleteOutlined
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
                        <th>
                          {(baseCoin === "自动" && totalAmountByUSD && (
                            <>{totalAmountByUSD.toPrecision(4)} USD</>
                          )) ||
                            null}
                          {(baseCoin !== "自动" && totalAmountByUSD && (
                            <>
                              {totalAmountByBaseCoin.toPrecision(4)}&nbsp;
                              {baseCoin}
                            </>
                          )) ||
                            null}
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

export default observer(Component);

function parseQuantity(str: string): [number, string] {
  const ary = str.split(/\s+/);
  return [parseFloat(ary[0]), ary[1]];
}
