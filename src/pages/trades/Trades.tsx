import {
  ArrowRightOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Dropdown, Input, Menu, Radio, Row } from "antd";
import cx from "classnames";
import Groups from "comps/groups/Groups";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError } from "comps/popup";
import { GroupType } from "constant";
import { useGroups } from "hooks/useGroups";
import { usePrices } from "hooks/usePrices";
import { userService } from "lib/grpcClient";
import { formatAmount, formatDate, formatPrice } from "lib/util/format";
import { handleGrpcError } from "lib/util/grpcUtil";
import { observer } from "mobx-react-lite";
import { IdWrapper } from "proto/base_pb";
import {
  AddTradeReq,
  SwitchOrderReq,
  TradeDTO,
  CloseTradeReq,
} from "proto/user_pb";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getAuthMD, globalContext } from "stores/GlobalStore";

import { CloseTradeInfo, CloseModalInfo, CloseTradeForm } from "./closeForm";
import { EditTradeInfo, ModalInfo, TradeForm } from "./tradeForm";
import css from "./Trades.module.scss";

export interface TradeInfo extends EditTradeInfo, CloseTradeInfo {}

const baseCoins = ["自动", "BTC", "USD", "EOS", "ETH", "CNY"];

function Component() {
  const [tradesVersion, setTradesVersion] = useState(0);
  const [filerText, setFilterText] = useState("");
  const [modalInfo, setModalInfo] = useState<ModalInfo>({});
  const [closeModalInfo, setCloseModalInfo] = useState<CloseModalInfo>({});
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
            tradedAt: t.getTradedAt(),
            tradeSym: t.getTradeSym(),
            baseSym: t.getBaseSym(),
            direction: t.getDirection() as "B" | "S",
            tradeAmount: t.getTradeAmount(),
            baseAmount: t.getBaseAmount(),
            closeAt: t.getCloseAt(),
            closeBaseAmount: t.getCloseBaseAmount(),
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
        req.setTradeSym(trade.tradeSym);
        req.setBaseSym(trade.baseSym);
        req.setDirection(trade.direction);
        req.setTradeAmount(trade.tradeAmount);
        req.setBaseAmount(trade.baseAmount);
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
        req.setTradeSym(trade.tradeSym);
        req.setBaseSym(trade.baseSym);
        req.setDirection(trade.direction);
        req.setTradeAmount(trade.tradeAmount);
        req.setBaseAmount(trade.baseAmount);
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

  function updateCloseInfo(tradeIndex: number) {
    if (!trades) {
      return;
    }
    const trade: TradeInfo = trades[tradeIndex];
    setCloseModalInfo({
      trade,
      onSubmit: (trade) => {
        const req = new CloseTradeReq();
        req.setId(trade.id);
        req.setCloseAt(trade.closeAt);
        req.setCloseBaseAmount(trade.closeBaseAmount);
        userService
          .closeTrade(req, getAuthMD())
          .then(() => {
            setTradesVersion((i) => i + 1);
            setCloseModalInfo({});
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
      `确实要删除这笔 [${trades[index].tradeSym}/${trades[index].baseAmount}] 交易吗？`
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

  return (
    <div className={css.container}>
      {modalInfo.onSubmit && (
        <TradeForm
          trade={modalInfo.trade}
          allSyms={Object.keys(pricesByBTC)}
          onSubmit={modalInfo.onSubmit}
          onCancel={() => setModalInfo({})}
        />
      )}
      {closeModalInfo.onSubmit && closeModalInfo.trade && (
        <CloseTradeForm
          trade={closeModalInfo.trade}
          onSubmit={closeModalInfo.onSubmit}
          onCancel={() => setCloseModalInfo({})}
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
                        <th>交易对</th>
                        <th>交易时间</th>
                        <th>方向</th>
                        <th>成交价</th>
                        <th>成交量</th>
                        <th>最新价</th>
                        <th>盈亏</th>
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
                              trade.tradeSym,
                              trade.baseSym,
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

                          // 是否已平仓
                          const isTradeClosed =
                            trade.tradedAt > 0 && trade.closeAt > 0;

                          // 计算交易价格
                          let tradePrice: number =
                            trade.baseAmount / trade.tradeAmount;

                          // 计算最新价格
                          let currentPrice: number | undefined;
                          const tradeSymPrice = pricesByBTC[trade.tradeSym];
                          const baseSymPrice = pricesByBTC[trade.baseSym];
                          if (tradeSymPrice && baseSymPrice) {
                            currentPrice = tradeSymPrice / baseSymPrice;
                          }

                          // 计算盈亏比例，无论是否成交都计算
                          let earnPercent: number | undefined;
                          if (tradePrice && currentPrice) {
                            if (isTradeClosed) {
                              // 直接计算盈亏
                              earnPercent =
                                ((trade.closeBaseAmount - trade.baseAmount) /
                                  trade.baseAmount) *
                                100;
                            } else {
                              // 根据现价计算盈亏
                              earnPercent =
                                ((currentPrice - tradePrice) / tradePrice) *
                                100;
                            }
                            if (earnPercent && trade.direction === "S") {
                              earnPercent = -earnPercent;
                            }
                          }

                          // 盈亏金额，只计算成交的
                          let earnAmount: number | undefined; // 基于 trade.baseSym
                          let earnBaseCoinAmount: number | undefined; // 基于页面设置的 baseCoin
                          if (earnPercent != null && trade.tradedAt > 0) {
                            // 基于 trade.baseSym
                            earnAmount = (trade.baseAmount * earnPercent) / 100;

                            // 基于 baseCoin
                            const baseSymPrice = getBaseCoinPrice(
                              trade.baseSym
                            );
                            if (baseSymPrice) {
                              earnBaseCoinAmount = earnAmount * baseSymPrice;
                              totalAmountByBaseCoin += earnBaseCoinAmount;
                            }
                          }

                          // 计算距离平仓的比例
                          let currentToClosePrice: number | undefined;
                          if (currentPrice && trade.closeBaseAmount > 0) {
                            const closePrice =
                              trade.closeBaseAmount / trade.tradeAmount;
                            // 平空（买入）
                            currentToClosePrice =
                              (currentPrice - closePrice) / closePrice;
                            if (trade.direction === "B") {
                              currentToClosePrice = -currentToClosePrice;
                            }
                          }

                          const menu = (
                            <Menu>
                              {trade.tradedAt > 0 && (
                                <Menu.Item onClick={() => updateCloseInfo(i)}>
                                  <EnterOutlined className={css.icon} />
                                  平仓
                                </Menu.Item>
                              )}
                              <Menu.Item onClick={() => changeGroup(trade.id)}>
                                <ArrowRightOutlined className={css.icon} />
                                换组
                              </Menu.Item>
                              <Menu.Item onClick={() => copyTrade(i)}>
                                <CopyOutlined className={css.icon} />
                                复制
                              </Menu.Item>
                              <Menu.Item onClick={() => deleteTrade(i)}>
                                <DeleteOutlined className={css.icon} />
                                删除
                              </Menu.Item>
                            </Menu>
                          );

                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                {trade.tradeSym}/{trade.baseSym}
                              </td>
                              <td>
                                {trade.tradedAt > 0 ? (
                                  formatDate(trade.tradedAt * 1000)
                                ) : (
                                  <span className={css.notTrade}>未成交</span>
                                )}
                                {trade.closeBaseAmount > 0 && (
                                  <>
                                    <br />
                                    {isTradeClosed &&
                                      formatDate(trade.closeAt * 1000)}
                                    {!isTradeClosed && (
                                      <>
                                        <span className={css.notTrade}>
                                          未平仓
                                          {currentToClosePrice != null &&
                                            (currentToClosePrice > 0
                                              ? ` (${(
                                                  currentToClosePrice * 100
                                                ).toFixed(2)}%)`
                                              : " (可交易)")}
                                        </span>
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                              <td>
                                <span
                                  className={cx(
                                    trade.tradedAt === 0 && css.notTrade
                                  )}
                                >
                                  {trade.direction === "B" ? "买入" : "卖出"}
                                </span>
                                {trade.closeBaseAmount > 0 && (
                                  <>
                                    <br />
                                    <span
                                      className={cx(
                                        !isTradeClosed && css.notTrade
                                      )}
                                    >
                                      {trade.direction === "S"
                                        ? "买入"
                                        : "卖出"}
                                    </span>
                                  </>
                                )}
                              </td>
                              <td>
                                <span
                                  className={cx(
                                    trade.tradedAt === 0 && css.notTrade
                                  )}
                                >
                                  {formatPrice(tradePrice, trade.baseSym)}
                                </span>
                                {trade.closeBaseAmount > 0 && (
                                  <span
                                    className={cx(
                                      !isTradeClosed && css.notTrade
                                    )}
                                  >
                                    <br />
                                    {formatPrice(
                                      trade.closeBaseAmount / trade.tradeAmount,
                                      trade.baseSym
                                    )}
                                  </span>
                                )}
                              </td>
                              <td>
                                {formatAmount(
                                  trade.tradeAmount,
                                  trade.tradeSym
                                )}
                                <br />
                                {formatAmount(trade.baseAmount, trade.baseSym)}
                              </td>
                              <td>
                                {currentPrice &&
                                  formatPrice(currentPrice, trade.baseSym)}
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
                                <br />
                                {trade.tradedAt > 0 && (
                                  <span
                                    className={cx(
                                      earnPercent &&
                                        earnPercent > 0 &&
                                        css.earn,
                                      earnPercent && earnPercent < 0 && css.lose
                                    )}
                                  >
                                    {earnBaseCoinAmount &&
                                      formatAmount(
                                        earnBaseCoinAmount,
                                        baseCoin
                                      )}
                                    {!earnBaseCoinAmount &&
                                      earnAmount &&
                                      formatAmount(earnAmount, trade.baseSym)}
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

                    {baseCoin !== "自动" && (
                      <thead className="ant-table-thead">
                        <tr className="ant-table-row ant-table-row-level-0">
                          <th>汇总</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>
                            {totalAmountByBaseCoin > 0 ? "+" : ""}
                            {formatAmount(totalAmountByBaseCoin, baseCoin)}
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                    )}
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
