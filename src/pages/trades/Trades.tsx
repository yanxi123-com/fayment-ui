import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, List as AntList, Radio, Row } from "antd";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { showError } from "comps/popup";
import { GroupType } from "constant";
import { useGroups } from "hooks/useGroups";
import { usePrices } from "hooks/usePrices";
import { List } from "immutable";
import { userService } from "lib/grpcClient";
import { formatDate } from "lib/util/format";
import { handleGrpcError } from "lib/util/grpcUtil";
import { observer } from "mobx-react-lite";
import { AddTradeReq, TradeDTO } from "proto/user_pb";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getAuthMD, globalContext } from "stores/GlobalStore";

import { getBaseSym } from "./priceUtil";
import { TradeForm, TradeInfo } from "./tradeForm";
import css from "./Trades.module.scss";

const baseCoins = ["自动", "BTC", "USD", "EOS", "ETH", "BNB", "CNY"];

let actionClicked = false;

interface Group {
  id: number;
  name: string;
}

interface ModalInfo {
  trade?: TradeInfo;
  onSubmit?: (trade: TradeInfo) => void;
}

function Component() {
  // 用来让 coins 自动更新
  const [tradesVersion, setTradesVersion] = useState(0);

  const [filerText, setFilterText] = useState("");
  const [modalInfo, setModalInfo] = useState<ModalInfo>({});
  const [trades, setTrades] = useState<TradeInfo[]>();

  const {
    refreshPrice,
    pricesByBTC,
    baseCoin,
    setBaseCoin,
    getBaseCoinPrice,
  } = usePrices("USD");

  const {
    groups,
    selectedIndex,
    addGroup,
    updateGroup,
    moveGroup,
    deleteGroup,
    setSelectedIndex,
  } = useGroups(GroupType.CoinAccount);

  function addTrade() {
    if (!groups) {
      return;
    }
    setModalInfo({
      onSubmit: (trade) => {
        if (!groups) {
          return;
        }
        const req = new AddTradeReq();
        req.setGroupId(groups[selectedIndex].id);
        req.setBuyAmount(trade.buyAmount);
        req.setBuySym(trade.buySym);
        req.setSellAmount(trade.sellAmount);
        req.setSellSym(trade.sellSym);
        req.setTradedAt(trade.tradedAt);
        userService
          .addTrade(req, getAuthMD())
          .then(() => {
            setTradesVersion((i) => i + 1);
            setModalInfo({});
          })
          .catch(handleGrpcError)
          .catch(showError);
      },
    });
  }

  function updateTrade(tradeIndex: number) {
    if (!trades) {
      return;
    }
    const trade: TradeInfo = trades[tradeIndex];

    setModalInfo({
      trade,
      onSubmit: (trade) => {
        if (trade.id == null) {
          return;
        }

        const req = new TradeDTO();
        req.setId(trade.id);
        req.setBuyAmount(trade.buyAmount);
        req.setBuySym(trade.buySym);
        req.setSellAmount(trade.sellAmount);
        req.setSellSym(trade.sellSym);
        req.setTradedAt(trade.tradedAt);
        userService
          .updateTrade(req, getAuthMD())
          .then(() => {
            setTradesVersion((i) => i + 1);
            setModalInfo({});
          })
          .catch(handleGrpcError)
          .catch(showError);
      },
    });
  }

  // parentIndex 为空表示修改的是分组，否则修改的是账号
  function moveItem(
    direction: "up" | "down",
    index: number,
    parentIndex?: number
  ) {
    // if (!groups) {
    //   return;
    // }
    // const otherIndex = direction === "up" ? index - 1 : index + 1;
    // if (otherIndex < 0) {
    //   return;
    // }
    // if (parentIndex == null && otherIndex >= groups.length) {
    //   return;
    // }
    // if (
    //   parentIndex != null &&
    //   otherIndex >= groups[parentIndex].trades.length
    // ) {
    //   return;
    // }
    // if (parentIndex == null) {
    //   // 是否选中跟随移动
    //   if (otherIndex === selectedIndex) {
    //     setSelectedIndex(index);
    //   } else if (index === selectedIndex) {
    //     setSelectedIndex(otherIndex);
    //   }
    // }
    // const keyPath = parentIndex == null ? [] : [parentIndex, "trades"];
    // setGroups(
    //   switchObject(groups, [...keyPath, index], [...keyPath, otherIndex])
    // );
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
                <Button type="link" onClick={() => addGroup()}>
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
                      deleteGroup(i);
                    }}
                  />,
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
                <div className={css.level1Title}>{item.name}</div>
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
              onChange={(e) => {
                setBaseCoin(e.target.value === "自动" ? "USD" : e.target.value);
              }}
              defaultValue="自动"
            >
              {baseCoins.map((coin) => (
                <Radio.Button key={coin} value={coin}>
                  {coin}
                </Radio.Button>
              ))}
            </Radio.Group>
            <Input
              prefix={<SearchOutlined style={{ color: "gray" }} />}
              style={{ marginLeft: 30, width: 200 }}
              placeholder="过滤"
              onChange={(e) => setFilterText(e.currentTarget.value)}
              allowClear
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
                        <th>成交价</th>
                        <th>最新价</th>
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
                      {trades &&
                        trades.map((trade, i) => {
                          if (filerText) {
                            const word = filerText.toUpperCase();

                            const tradeDate =
                              trade.tradedAt > 0
                                ? formatDate(trade.tradedAt * 1000)
                                : "";

                            const findResult = [
                              tradeDate,
                              trade.buySym,
                              trade.sellSym,
                            ].find((s) => {
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
                          const baseSym = getBaseSym(
                            pricesByBTC,
                            trade.buySym,
                            trade.sellSym
                          );
                          let tradePrice: number;
                          if (baseSym === trade.buySym) {
                            // 做空: btc(sell) -> usd(buy)
                            tradePrice = trade.buyAmount / trade.sellAmount;
                          } else {
                            // 做多: usd(sell) -> btc(buy)
                            tradePrice = trade.sellAmount / trade.buyAmount;
                          }

                          // 计算最新价格
                          let currentPrice: number | undefined;
                          const buySymPrice = pricesByBTC[trade.buySym];
                          const sellSymPrice = pricesByBTC[trade.sellSym];
                          if (buySymPrice && sellSymPrice) {
                            if (baseSym === trade.buySym) {
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
                            if (baseSym === trade.buySym) {
                              // 做空: btc(sell) -> usd(buy)
                              currentPrice = sellSymPrice / buySymPrice;

                              // 做空盈亏计算
                              earnPercent =
                                ((tradePrice - currentPrice) / tradePrice) *
                                100;
                            } else {
                              // 做多: usd(sell) -> btc(buy)
                              currentPrice = buySymPrice / sellSymPrice;
                              earnPercent =
                                ((currentPrice - tradePrice) / tradePrice) *
                                100;
                            }
                          }

                          // 盈亏数量
                          let earnBaseSymAmount: number | undefined;
                          if (tradePrice && currentPrice) {
                            if (baseSym === trade.buySym) {
                              // 做空: btc(sell) -> usd(buy)
                              earnBaseSymAmount =
                                tradePrice * trade.sellAmount -
                                currentPrice * trade.sellAmount;
                            } else {
                              // 做多: usd(sell) -> btc(buy)
                              earnBaseSymAmount =
                                currentPrice * trade.buyAmount -
                                tradePrice * trade.buyAmount;
                            }
                          }

                          // 盈亏数据基于 baseCoin
                          let earnBaseCoinAmount: number | undefined;
                          if (earnBaseSymAmount && trade.tradedAt > 0) {
                            const baseSymPrice = getBaseCoinPrice(baseSym);
                            if (baseSymPrice) {
                              earnBaseCoinAmount =
                                earnBaseSymAmount * baseSymPrice;
                              totalAmountByBaseCoin += earnBaseCoinAmount;
                            }
                          }

                          // 盈亏数据基于 USD
                          if (earnBaseSymAmount && trade.tradedAt > 0) {
                            const baseSymPrice = getBaseCoinPrice("USD");
                            if (baseSymPrice) {
                              totalAmountByUSD +=
                                earnBaseSymAmount * baseSymPrice;
                            }
                          }

                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                {trade.tradedAt > 0
                                  ? formatDate(trade.tradedAt * 1000)
                                  : "交易计划"}
                              </td>
                              <td>
                                {trade.buyAmount}&nbsp;{trade.buySym}
                              </td>
                              <td>
                                {trade.sellAmount}&nbsp;{trade.sellSym}
                              </td>
                              <td
                                className={cx(trade.tradedAt === 0 && css.gray)}
                              >
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
                                {trade.tradedAt > 0 && (
                                  <span
                                    className={cx(
                                      earnPercent &&
                                        earnPercent > 0 &&
                                        css.earn,
                                      earnPercent && earnPercent < 0 && css.lose
                                    )}
                                  >
                                    {earnPercent &&
                                      `${earnPercent.toFixed(2)}%`}
                                  </span>
                                )}
                                {trade.tradedAt === 0 && (
                                  <>
                                    {earnPercent &&
                                      earnPercent > 0 &&
                                      `距离 ${earnPercent.toFixed(2)}%`}

                                    {earnPercent &&
                                      earnPercent < 0 &&
                                      "**可交易**"}
                                  </>
                                )}
                              </td>
                              <td>
                                {trade.tradedAt > 0 && (
                                  <span
                                    className={cx(
                                      earnPercent &&
                                        earnPercent > 0 &&
                                        css.earn,
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
                                        {earnBaseCoinAmount.toPrecision(4)}
                                        &nbsp;
                                        {baseCoin}
                                      </>
                                    )}
                                  </span>
                                )}
                              </td>
                              <td style={{ width: 150, textAlign: "center" }}>
                                <EditOutlined
                                  className={css.icon}
                                  onClick={() => updateTrade(i)}
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
                                  onClick={() => deleteGroup(i)}
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
