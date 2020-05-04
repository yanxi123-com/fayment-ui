import {
  ArrowRightOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  EnterOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Dropdown, Input, Menu, Row } from "antd";
import cx from "classnames";
import Groups from "comps/groups/Groups";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError } from "comps/popup";
import { GroupType } from "constant";
import { useContractPrices } from "hooks/useFuturesPrices";
import { useGroups } from "hooks/useGroups";
import { userService } from "lib/grpcClient";
import { formatDate, formatCNY } from "lib/util/format";
import { handleGrpcError } from "lib/util/grpcUtil";
import { observer } from "mobx-react-lite";
import { IdWrapper } from "proto/base_pb";
import {
  AddFuturesArbitrageReq,
  CloseFuturesArbitrageReq,
  SwitchOrderReq,
  UpdateFuturesArbitrageReq,
} from "proto/user_pb";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getAuthMD, globalContext } from "stores/GlobalStore";

import { CloseModalInfo, CloseTradeForm, CloseTradeInfo } from "./closeForm";
import { EditTradeInfo, ModalInfo, TradeForm } from "./tradeForm";
import css from "./Trades.module.scss";

export interface TradeInfo extends EditTradeInfo, CloseTradeInfo {
  longVarietyName: string;
  longTradingUnit: number;
  longMarginPercent: number;

  shortVarietyName: string;
  shortTradingUnit: number;
  shortMarginPercent: number;
}

function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "JPY",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  }).format(amount);
}

function Component() {
  const [tradesVersion, setTradesVersion] = useState(0);
  const [filerText, setFilterText] = useState("");
  const [modalInfo, setModalInfo] = useState<ModalInfo>({});
  const [closeModalInfo, setCloseModalInfo] = useState<CloseModalInfo>({});
  const [trades, setTrades] = useState<TradeInfo[]>();
  const { refreshPrice, prices, addContracts } = useContractPrices();
  const groupsProps = useGroups(GroupType.FuturesArbitrage);
  const { groups, currentGroupIndex, changeGroup } = groupsProps;

  // fetch coin accounts
  useEffect(() => {
    if (!groups || groups.length === 0) {
      return;
    }
    const req = new IdWrapper();
    req.setId(groups[currentGroupIndex].id);
    userService
      .listFuturesArbitrage(req, getAuthMD())
      .then((res) => {
        // 获取价格
        const relatedContracts: string[] = [];
        res.getTradesList().forEach((t) => {
          relatedContracts.push(t.getLongContractSym());
          relatedContracts.push(t.getShortContractSym());
        });
        addContracts(relatedContracts);

        // 设置 trades
        setTrades(
          res.getTradesList().map((t) => {
            return {
              id: t.getId(),
              tradedAt: t.getTradedAt(),

              longContractSym: t.getLongContractSym(),
              longNum: t.getLongContractNum(),
              longPrice: t.getLongContractPrice(),

              shortContractSym: t.getShortContractSym(),
              shortNum: t.getShortContractNum(),
              shortPrice: t.getShortContractPrice(),

              longVarietyName: t.getLongVarietyName(),
              longTradingUnit: t.getLongTradingUnit(),
              longMarginPercent: t.getLongMarginPercent(),

              shortVarietyName: t.getShortVarietyName(),
              shortTradingUnit: t.getShortTradingUnit(),
              shortMarginPercent: t.getShortMarginPercent(),

              closeAt: t.getCloseAt(),
              closeLongPrice: t.getCloseLongPrice(),
              closeShortPrice: t.getCloseShortPrice(),
            };
          })
        );
      })
      .catch(handleGrpcError)
      .catch(showError);
  }, [currentGroupIndex, groups, tradesVersion, addContracts]);

  function addTrade(copyFrom?: EditTradeInfo) {
    if (!groups) {
      return;
    }
    setModalInfo({
      trade: copyFrom,
      onSubmit: (trade) => {
        if (!groups) {
          return;
        }

        const req = new AddFuturesArbitrageReq();
        req.setGroupId(groups[currentGroupIndex].id);
        req.setTradedAt(trade.tradedAt);

        req.setLongContractSym(trade.longContractSym);
        req.setLongContractPrice(trade.longPrice);
        req.setLongContractNum(trade.longNum);

        req.setShortContractSym(trade.shortContractSym);
        req.setShortContractPrice(trade.shortPrice);
        req.setShortContractNum(trade.shortNum);

        userService
          .addFuturesArbitrage(req, getAuthMD())
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
    const trade: EditTradeInfo = { ...trades[tradeIndex], id: 0 };
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
        const req = new UpdateFuturesArbitrageReq();
        req.setId(trade.id);
        req.setTradedAt(trade.tradedAt);

        req.setLongContractSym(trade.longContractSym);
        req.setLongContractPrice(trade.longPrice);
        req.setLongContractNum(trade.longNum);

        req.setShortContractSym(trade.shortContractSym);
        req.setShortContractPrice(trade.shortPrice);
        req.setShortContractNum(trade.shortNum);

        userService
          .updateFuturesArbitrage(req, getAuthMD())
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
        const req = new CloseFuturesArbitrageReq();
        req.setId(trade.id);
        req.setCloseAt(trade.closeAt);
        req.setCloseLongPrice(trade.closeLongPrice);
        req.setCloseShortPrice(trade.closeShortPrice);

        userService
          .closeFuturesArbitrage(req, getAuthMD())
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
      `确实要删除这笔 [${trades[index].longContractSym}/${trades[index].shortContractSym}] 对冲交易吗？`
    ).then((confirm) => {
      if (confirm) {
        const req = new IdWrapper();
        req.setId(trades[index].id);
        userService
          .deleteFuturesArbitrage(req, getAuthMD())
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
      .switchFuturesArbitrage(req, getAuthMD())
      .then(() => {
        setTradesVersion((i) => i + 1);
      })
      .catch(handleGrpcError)
      .catch(showError);
  }

  if (groups == null) {
    return <Loading />;
  }

  let totalEarnAmount: number = 0;

  return (
    <div className={css.container}>
      {modalInfo.onSubmit && (
        <TradeForm
          trade={modalInfo.trade}
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
            <Button
              onClick={() => addTrade()}
              icon={<PlusOutlined />}
              style={{ marginRight: 30 }}
            >
              添加记录
            </Button>

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
                        <th>开仓买入</th>
                        <th>开仓卖出</th>
                        <th>价差</th>
                        <th>实时价差</th>
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
                              trade.longContractSym,
                              trade.longVarietyName,
                              trade.shortContractSym,
                              trade.shortVarietyName,
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

                          const isTradeClosed =
                            trade.tradedAt > 0 && trade.closeAt > 0;

                          // 计算价差
                          const enterPriceDiff =
                            trade.longPrice *
                              trade.longTradingUnit *
                              trade.longNum -
                            trade.shortPrice *
                              trade.shortTradingUnit *
                              trade.shortNum;

                          // 计算最新价差
                          let currentPriceDiff: number | undefined;
                          const currentLongPrice: number | undefined =
                            prices[trade.longContractSym];
                          const currentShortPrice: number | undefined =
                            prices[trade.shortContractSym];
                          if (currentLongPrice && currentShortPrice) {
                            currentPriceDiff =
                              currentLongPrice *
                                trade.longTradingUnit *
                                trade.longNum -
                              currentShortPrice *
                                trade.shortTradingUnit *
                                trade.shortNum;
                          }

                          // 平仓价差
                          let closePriceDiff: number | undefined;
                          if (isTradeClosed) {
                            closePriceDiff =
                              trade.closeLongPrice *
                                trade.longTradingUnit *
                                trade.longNum -
                              trade.closeShortPrice *
                                trade.shortTradingUnit *
                                trade.shortNum;
                          }

                          // 相对开仓盈亏金额，无论是否开仓都会计算
                          let earnAmount: number | undefined;
                          if (closePriceDiff != null) {
                            earnAmount = closePriceDiff - enterPriceDiff;
                          } else if (
                            enterPriceDiff != null &&
                            currentPriceDiff != null
                          ) {
                            earnAmount = currentPriceDiff - enterPriceDiff;
                          }
                          if (trade.tradedAt > 0 && earnAmount) {
                            totalEarnAmount += earnAmount;
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
                            <tr key={trade.id}>
                              <td>{i + 1}</td>
                              <td
                                className={cx(trade.tradedAt === 0 && css.gray)}
                              >
                                {trade.tradedAt > 0
                                  ? "开 " + formatDate(trade.tradedAt * 1000)
                                  : "未成交"}
                                {isTradeClosed && (
                                  <>
                                    <br />平 {formatDate(trade.closeAt * 1000)}
                                  </>
                                )}
                              </td>
                              <td>
                                {trade.longVarietyName}
                                &nbsp;
                                {trade.longContractSym} * {trade.longNum}
                              </td>
                              <td>
                                {trade.shortVarietyName}
                                &nbsp;
                                {trade.shortContractSym} * {trade.shortNum}
                              </td>
                              <td>
                                开: {enterPriceDiff}
                                {isTradeClosed && (
                                  <>
                                    <br />
                                    平: {closePriceDiff}
                                  </>
                                )}
                              </td>
                              <td>{currentPriceDiff}</td>
                              <td>
                                {trade.tradedAt > 0 && (
                                  <span
                                    className={cx(
                                      earnAmount && earnAmount > 0 && css.earn,
                                      earnAmount && earnAmount < 0 && css.lose
                                    )}
                                  >
                                    {earnAmount && formatCNY(earnAmount)}
                                  </span>
                                )}
                                {trade.tradedAt === 0 && (
                                  <>
                                    {earnAmount != null &&
                                      earnAmount > 0 &&
                                      `距离 ${earnAmount}`}

                                    {earnAmount != null &&
                                      earnAmount < 0 &&
                                      "**可交易**"}
                                  </>
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
                        <th>
                          {totalEarnAmount > 0 ? "+" : ""}
                          {formatCurrency(totalEarnAmount)}
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
