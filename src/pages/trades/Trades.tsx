import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
  EllipsisOutlined,
  ArrowRightOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, Radio, Row, Dropdown, Menu } from "antd";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError } from "comps/popup";
import { GroupType } from "constant";
import { useGroups } from "hooks/useGroups";
import { usePrices } from "hooks/usePrices";
import { userService } from "lib/grpcClient";
import { formatDate } from "lib/util/format";
import { handleGrpcError } from "lib/util/grpcUtil";
import { observer } from "mobx-react-lite";
import { IdWrapper } from "proto/base_pb";
import { AddTradeReq, SwitchOrderReq, TradeDTO } from "proto/user_pb";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getAuthMD, globalContext } from "stores/GlobalStore";

import { getBaseSym } from "./priceUtil";
import { TradeForm, TradeInfo } from "./tradeForm";
import css from "./Trades.module.scss";
import Groups from "comps/groups/Groups";

const baseCoins = ["BTC", "USD", "EOS", "ETH", "BNB", "CNY"];

interface ModalInfo {
  trade?: TradeInfo;
  onSubmit?: (trade: TradeInfo) => void;
}

function Component() {
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

  const groupsProps = useGroups(GroupType.CoinTrade);
  const { groups, currentGroupIndex, changeGroup } = groupsProps;

  // fetch coin accounts
  useEffect(() => {
    if (!groups || groups.length === 0) {
      return;
    }
    const req = new IdWrapper();
    req.setId(groups[currentGroupIndex].id);
    userService
      .listTrades(req, getAuthMD())
      .then((res) => {
        setTrades(
          res.getTradesList().map((t) => ({
            id: t.getId(),
            buySym: t.getBuySym(),
            buyAmount: t.getBuyAmount(),
            sellSym: t.getSellSym(),
            sellAmount: t.getSellAmount(),
            tradedAt: t.getTradedAt(),
          }))
        );
      })
      .catch(handleGrpcError)
      .catch(showError);
  }, [currentGroupIndex, groups, tradesVersion]);

  function addTrade(copyFrom?: TradeInfo) {
    if (!groups) {
      return;
    }
    setModalInfo({
      trade: copyFrom,
      onSubmit: (trade) => {
        if (!groups) {
          return;
        }
        const req = new AddTradeReq();
        req.setGroupId(groups[currentGroupIndex].id);
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

  function copyTrade(tradeIndex: number) {
    if (!trades) {
      return;
    }
    const trade: TradeInfo = { ...trades[tradeIndex], id: 0 };
    addTrade(trade);
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

  function deleteTrade(index: number) {
    if (!trades) {
      return;
    }

    confirmPromise(
      "请确认",
      `确实要删除这笔 [${trades[index].buySym}/${trades[index].sellSym}] 交易吗？`
    ).then((confirm) => {
      if (confirm) {
        const req = new IdWrapper();
        req.setId(trades[index].id);
        userService
          .deleteTrade(req, getAuthMD())
          .then(() => {
            setTradesVersion((i) => i + 1);
          })
          .catch(handleGrpcError)
          .catch(showError);
      }
    });
  }

  function moveTrade(direction: "up" | "down", index: number) {
    if (!trades) {
      return;
    }
    const otherIndex = direction === "up" ? index - 1 : index + 1;
    if (otherIndex < 0 || otherIndex >= trades.length) {
      return;
    }

    const req = new SwitchOrderReq();
    req.setIdA(trades[index].id);
    req.setIdB(trades[otherIndex].id);
    userService
      .switchTrade(req, getAuthMD())
      .then(() => {
        setTradesVersion((i) => i + 1);
      })
      .catch(handleGrpcError)
      .catch(showError);
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
          <Groups {...groupsProps} />
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
                setBaseCoin(e.target.value);
              }}
              value={baseCoin}
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
          {groups[currentGroupIndex] != null && (
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

                          const menu = (
                            <Menu>
                              <Menu.Item onClick={() => deleteTrade(i)}>
                                <DeleteOutlined className={css.icon} />
                                删除
                              </Menu.Item>
                              <Menu.Item onClick={() => changeGroup(trade.id)}>
                                <ArrowRightOutlined className={css.icon} />
                                换组
                              </Menu.Item>
                              <Menu.Item onClick={() => copyTrade(i)}>
                                <CopyOutlined className={css.icon} />
                                复制
                              </Menu.Item>
                            </Menu>
                          );

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
                                    {earnBaseCoinAmount && (
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
                                      onClick={() => moveTrade("up", i)}
                                    />
                                    <Divider type="vertical" />

                                    <DownOutlined
                                      className={css.icon}
                                      onClick={() => moveTrade("down", i)}
                                    />
                                    <Divider type="vertical" />
                                  </>
                                )}

                                <Dropdown
                                  overlay={menu}
                                  placement="bottomCenter"
                                >
                                  <EllipsisOutlined />
                                </Dropdown>
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
                          {(totalAmountByUSD && (
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
