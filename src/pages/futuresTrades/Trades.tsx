import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
  ArrowRightOutlined,
  EllipsisOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Menu, Dropdown } from "antd";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError } from "comps/popup";
import { GroupType } from "constant";
import { useGroups } from "hooks/useGroups";
import { useContractPrices } from "hooks/useFuturesPrices";
import { userService } from "lib/grpcClient";
import { formatDate } from "lib/util/format";
import { handleGrpcError } from "lib/util/grpcUtil";
import { observer } from "mobx-react-lite";
import { IdWrapper } from "proto/base_pb";
import {
  SwitchOrderReq,
  AddFuturesTradeReq,
  UpdateFuturesTradeReq,
} from "proto/user_pb";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getAuthMD, globalContext } from "stores/GlobalStore";

import { TradeForm, TradeInfo, EditTradeInfo } from "./tradeForm";
import css from "./Trades.module.scss";
import Groups from "comps/groups/Groups";

interface ModalInfo {
  trade?: EditTradeInfo;
  onSubmit?: (trade: EditTradeInfo) => void;
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
  // 用来让 coins 自动更新
  const [tradesVersion, setTradesVersion] = useState(0);

  const [filerText, setFilterText] = useState("");
  const [modalInfo, setModalInfo] = useState<ModalInfo>({});
  const [trades, setTrades] = useState<TradeInfo[]>();

  const { refreshPrice, prices, addContracts } = useContractPrices();

  const groupsProps = useGroups(GroupType.FuturesTrade);
  const { groups, currentGroupIndex, changeGroup } = groupsProps;

  // fetch coin accounts
  useEffect(() => {
    if (!groups || groups.length === 0) {
      return;
    }
    const req = new IdWrapper();
    req.setId(groups[currentGroupIndex].id);
    userService
      .listFuturesTrades(req, getAuthMD())
      .then((res) => {
        addContracts(res.getTradesList().map((t) => t.getContractSym()));
        setTrades(
          res.getTradesList().map((t) => {
            return {
              id: t.getId(),
              contractSym: t.getContractSym(),
              num: t.getContractNum(),
              direction: t.getDirection(),
              price: t.getContractPrice(),
              tradedAt: t.getTradedAt(),
              varietyName: t.getVarietyName(),
              tradingUnit: t.getTradingUnit(),
              marginPercent: t.getMarginPercent(),
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

        const req = new AddFuturesTradeReq();
        req.setGroupId(groups[currentGroupIndex].id);
        req.setTradedAt(trade.tradedAt);
        req.setContractSym(trade.contractSym);
        req.setContractPrice(trade.price);
        req.setContractNum(trade.num);
        req.setDirection(trade.direction);
        userService
          .addFuturesTrade(req, getAuthMD())
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
        const req = new UpdateFuturesTradeReq();
        req.setId(trade.id);
        req.setTradedAt(trade.tradedAt);
        req.setContractSym(trade.contractSym);
        req.setContractPrice(trade.price);
        req.setContractNum(trade.num);
        req.setDirection(trade.direction);
        userService
          .updateFuturesTrade(req, getAuthMD())
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
      `确实要删除这笔 [${trades[index].contractSym}] 交易吗？`
    ).then((confirm) => {
      if (confirm) {
        const req = new IdWrapper();
        req.setId(trades[index].id);
        userService
          .deleteFuturesTrade(req, getAuthMD())
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
      .switchFuturesTrade(req, getAuthMD())
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
                        <th>方向</th>
                        <th>代码</th>
                        <th>品种</th>
                        <th>数量</th>
                        <th>成交价</th>
                        <th>现价</th>
                        <th>盈亏比例</th>
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
                              trade.contractSym,
                              trade.varietyName,
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

                          // 计算最新价格
                          const currentPrice: number | undefined =
                            prices[trade.contractSym];

                          // 计算盈亏比例
                          let earnPercent: number | undefined;
                          if (trade.price && currentPrice) {
                            if (trade.direction === "S") {
                              // 做空盈亏计算
                              earnPercent =
                                ((trade.price - currentPrice) / trade.price) *
                                100;
                            } else {
                              earnPercent =
                                ((currentPrice - trade.price) / trade.price) *
                                100;
                            }
                          }

                          // 盈亏数量
                          let earnAmount: number | undefined;
                          if (trade.price && currentPrice) {
                            if (trade.direction === "B") {
                              earnAmount =
                                (currentPrice - trade.price) *
                                trade.tradingUnit;
                            } else {
                              earnAmount =
                                (trade.price - currentPrice) *
                                trade.tradingUnit;
                            }
                            totalEarnAmount += earnAmount;
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
                            <tr key={trade.id}>
                              <td>{i + 1}</td>
                              <td>
                                {trade.tradedAt > 0
                                  ? formatDate(trade.tradedAt * 1000)
                                  : "未成交"}
                              </td>
                              <td>
                                {trade.direction === "B" ? "买入" : "卖出"}
                              </td>
                              <td
                                className={cx(trade.tradedAt === 0 && css.gray)}
                              >
                                {trade.contractSym}
                              </td>
                              <td
                                className={cx(trade.tradedAt === 0 && css.gray)}
                              >
                                {trade.varietyName}
                              </td>
                              <td>{trade.num}</td>
                              <td>{trade.price}</td>
                              <td>{currentPrice}</td>
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
                                    {earnAmount && formatCurrency(earnAmount)}
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
                        <th></th>
                        <th></th>
                        <th>{formatCurrency(totalEarnAmount)}</th>
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
