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
import { confirmPromise, showError } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { GroupType } from "constant";
import { EChartOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { usePrices } from "hooks/usePrices";
import { List } from "immutable";
import { userService } from "lib/grpcClient";
import { uniqStrs } from "lib/util/array";
import { handleGrpcError } from "lib/util/grpcUtil";
import { observer } from "mobx-react-lite";
import {
  AddGroupReq,
  ListGroupsReq,
  UpdateGroupReq,
  SwitchGroupReq,
} from "proto/user_pb";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BaseFieldSchema, getAuthMD, globalContext } from "stores/GlobalStore";

import css from "./Coins.module.scss";
import { IdWrapper } from "proto/base_pb";

const baseCoins = ["BTC", "USD", "EOS", "ETH", "BNB", "CNY"];

let actionClicked = false;

interface CoinInfo {
  name: string;
  sym: string;
  amount: number;
}

interface Group {
  id: number;
  name: string;
}

function Component() {
  // 用来让 groups 自动更新
  const [groupVersion, setGroupVersion] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filerText, setFilterText] = useState("");
  const [groups, setGroups] = useState<Group[]>();
  const [coins] = useState<CoinInfo[]>();

  const {
    refreshPrice,
    pricesByBTC,
    getBaseCoinPrice,
    baseCoin,
    setBaseCoin,
  } = usePrices();

  useEffect(() => {
    const req = new ListGroupsReq();
    req.setType(GroupType.CoinAccount);
    userService
      .listGroups(req, getAuthMD())
      .then((res) => {
        setGroups(
          res.getGroupsList().map((g) => ({
            id: g.getId(),
            name: g.getName(),
          }))
        );
      })
      .catch(handleGrpcError)
      .catch(showError);
  }, [groupVersion]);

  function computeChartOpt(): EChartOption | undefined {
    if (!groups || groups[selectedIndex] == null) {
      return;
    }

    if (!coins) {
      return;
    }

    // 合并币种数据
    const coinMap: { [sym: string]: number } = {};

    if (coins) {
      coins.forEach((coin) => {
        const priceByBaseCoin = getBaseCoinPrice(coin.sym);
        const amountByBaseCoin =
          priceByBaseCoin != null ? priceByBaseCoin * coin.amount : undefined;

        if (amountByBaseCoin) {
          if (coinMap[coin.sym] == null) {
            coinMap[coin.sym] = amountByBaseCoin;
          } else {
            coinMap[coin.sym] += amountByBaseCoin;
          }
        }
      });
    }

    const combinedCoins = Object.keys(coinMap).sort((a, b) =>
      coinMap[a] - coinMap[b] < 0 ? 1 : -1
    );

    if (combinedCoins.length <= 1) {
      return;
    }

    return {
      title: {
        text: "持仓统计（按币种）",
        // subtext: "Fayment.com",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: `{a} <br/>{b} 持仓: {c} ${baseCoin} ({d}%)`,
      },
      legend: {
        bottom: 10,
        left: "center",
        data: combinedCoins,
      },
      series: [
        {
          name: "持仓数据",
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: combinedCoins.map((coin) => ({
            value: coinMap[coin],
            name: coin,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }

  function parseCoinSym(sym: string | undefined): string | undefined {
    if (sym == null) {
      return undefined;
    }
    sym = sym.toUpperCase();
    if (sym.indexOf("USD") > -1) {
      return "USD";
    }
    if (pricesByBTC[sym]) {
      return sym;
    }
    return undefined;
  }

  function addCate() {
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
        userService
          .addGroup(req, getAuthMD())
          .then(() => {
            setGroupVersion((i) => i + 1);
          })
          .catch(handleGrpcError)
          .catch(showError);
      },
    });
  }

  function getAccountNameEnum(): string[] {
    if (coins == null) {
      return [];
    }
    const keys = coins.map((c) => c.name);
    return uniqStrs(keys);
  }

  function addCoin() {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "enum",
        enumValues: getAccountNameEnum(),
        key: "title",
        title: "账户",
        placeholder: "请填写账户名称",
        defaultValue: "默认",
      },
      {
        type: "enum",
        enumValues: Object.keys(pricesByBTC),
        key: "sym",
        title: "币种",
        placeholder: "请填写币种，比如 BTC, EOS, ETH",
      },
      {
        type: "number",
        key: "balance",
        title: "持有数量",
        placeholder: "请输入持有数量",
        defaultValue: "0",
      },
    ];
    openPopupForm({
      title: "添加账户",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!groups) {
          return;
        }

        const sym = parseCoinSym(data.sym);
        if (sym == null) {
          // sym 不符合要求
          throw new Error("不支持此币种");
        }

        const balance = isNaN(data.balance) ? 0 : parseFloat(data.balance);
        const title = data.title || "默认";

        const newCoin: CoinInfo = {
          name: title,
          sym,
          amount: balance,
        };
        const newGroups: Group[] = List(groups)
          .updateIn([selectedIndex, "coins"], (list) => {
            list.push(newCoin);
            return list;
          })
          .toJS();

        setGroups(newGroups);
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
        const req = new UpdateGroupReq();
        req.setId(groups[index].id);
        req.setName(data.title);
        userService
          .updateGroup(req, getAuthMD())
          .then(() => {
            setGroupVersion((i) => i + 1);
          })
          .catch(handleGrpcError)
          .catch(showError);
        setGroups(List(groups).setIn([index, "title"], data.title).toJS());
      },
    });
  }

  function updateCoin(groupIndex: number, coinIndex: number) {
    if (!groups) {
      return;
    }
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
          "title",
        ]),
      },
      {
        type: "enum",
        enumValues: Object.keys(pricesByBTC),
        key: "sym",
        title: "币种",
        placeholder: "请填写币种，比如 BTC, EOS, ETH",
        defaultValue: List(groups).getIn([
          groupIndex,
          "coins",
          coinIndex,
          "sym",
        ]),
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
          "balance",
        ]),
      },
    ];
    openPopupForm({
      title: "修改币种",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        const balance = isNaN(data.balance) ? 0 : parseFloat(data.balance);
        const newGroups: Group[] = List(groups)
          .setIn([groupIndex, "coins", coinIndex], {
            title: data.title,
            sym: data.sym,
            balance,
          })
          .toJS();
        setGroups(newGroups);
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
          .then(() => setGroupVersion((i) => i + 1))
          .catch(handleGrpcError)
          .catch(showError);
      }
    });
  }

  function deleteCate(index: number, parentIndex?: number) {
    if (!groups || !coins) {
      return;
    }
    const keyPath = parentIndex == null ? [] : [parentIndex, "coins"];
    const name =
      parentIndex == null
        ? `分组 [${groups[index].name}] `
        : `币种 [${coins[index].sym}] `;
    confirmPromise("请确认", `确实要删除${name}吗？`).then((confirm) => {
      if (confirm) {
        setGroups(
          List(groups)
            .deleteIn([...keyPath, index])
            .toJS() as any
        );
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

    const req = new SwitchGroupReq();
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

  // parentIndex 为空表示修改的是分组，否则修改的是账号
  function moveItem(
    direction: "up" | "down",
    index: number,
    parentIndex?: number
  ) {}

  if (groups == null) {
    return <Loading />;
  }

  const chartOpt = computeChartOpt();
  let totalAmountByBaseCoin: number = 0;

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
                      moveGroup("up", i);
                    }}
                  />,
                  <DownOutlined
                    className={css.icon}
                    onClick={() => {
                      actionClicked = true;
                      moveGroup("down", i);
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
        <Col span={17}>
          <div style={{ marginBottom: 20 }}>
            计价单位: &nbsp;
            <Radio.Group
              onChange={(e) => {
                setBaseCoin(e.target.value);
              }}
              defaultValue="BTC"
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
                        <th>
                          账户
                          {Object.keys(pricesByBTC).length > 0 && (
                            <Button type="link" onClick={() => addCoin()}>
                              <PlusOutlined />
                            </Button>
                          )}
                        </th>
                        <th>币种</th>
                        <th>数量</th>
                        <th>最新价</th>
                        <th>总金额</th>
                        <th style={{ textAlign: "center" }}>
                          操作
                          <Button type="link" onClick={refreshPrice}>
                            <ReloadOutlined />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {coins &&
                        coins.map((coin, i) => {
                          const priceByBaseCoin = getBaseCoinPrice(coin.sym);
                          const amountByBaseCoin =
                            priceByBaseCoin != null
                              ? priceByBaseCoin * coin.amount
                              : undefined;

                          if (amountByBaseCoin != null) {
                            totalAmountByBaseCoin += amountByBaseCoin;
                          }

                          if (filerText) {
                            const word = filerText.toUpperCase();
                            const { name, sym } = coin;
                            if (
                              name.toUpperCase().indexOf(word) === -1 &&
                              sym.indexOf(word) === -1
                            ) {
                              return null;
                            }
                          }

                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{coin.name}</td>
                              <td>
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={`https://www.binance.com/cn/trade/${
                                    coin.sym === "BTC"
                                      ? "BTC_USDT"
                                      : coin.sym + "_BTC"
                                  }`}
                                >
                                  {coin.sym}
                                </a>
                              </td>
                              <td>{coin.amount}</td>
                              <td>
                                {priceByBaseCoin &&
                                  `${priceByBaseCoin.toPrecision(
                                    5
                                  )} ${baseCoin}`}
                              </td>
                              <td>
                                {amountByBaseCoin &&
                                  `${amountByBaseCoin.toPrecision(
                                    5
                                  )} ${baseCoin}`}
                              </td>
                              <td style={{ width: 150, textAlign: "center" }}>
                                <EditOutlined
                                  className={css.icon}
                                  onClick={() => updateCoin(selectedIndex, i)}
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
                        <th>
                          {totalAmountByBaseCoin &&
                            `${totalAmountByBaseCoin.toPrecision(
                              5
                            )} ${baseCoin}`}
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          )}

          {chartOpt && <ReactEcharts className={css.chart} option={chartOpt} />}
        </Col>
      </Row>
    </div>
  );
}

function LoginComponent() {
  const globalStore = useContext(globalContext);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!globalStore.user) {
      history.replace("/login?rd=" + location.pathname);
    }
  });

  return globalStore.user ? <Component /> : <></>;
}

export default observer(LoginComponent);
