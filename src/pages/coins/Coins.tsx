import { Button, Col, Divider, Icon, List as AntList, Row, Radio } from "antd";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { List } from "immutable";
import React, { useEffect, useState, useCallback } from "react";
import { BaseFieldSchema } from "stores/GlobalStore";
import localStorage from "stores/local";
import { trackEvent } from "lib/gtag";
import { EChartOption } from "echarts";
import ReactEcharts from "echarts-for-react";

import css from "./Coins.module.scss";

const baseCoins = ["BTC", "USD", "EOS", "ETH", "BNB", "CNY"];

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
  const [pricesByBTC, setPricesByBTC] = useState<{ [sym: string]: number }>({});
  const [btcPrice, setBtcPrice] = useState<number>();
  const [baesCoin, setBaseCoin] = useState("BTC");
  const [cnyRate, setCnyRate] = useState(0);

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
    } else {
      setGroups([{ title: "我的资产", coins: [] }]);
    }
  }, []);

  const fetchPrices = useCallback(() => {
    trackEvent("fetch_prices");
    fetch(
      "https://7hes1mxv2g.execute-api.ap-northeast-1.amazonaws.com/prod/price",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(async res => {
      const all = await res.json();
      const newPriceMap: { [sym: string]: number } = {};
      all.forEach(({ symbol, price }: { symbol: string; price: string }) => {
        // symbol: "ETHBTC", price: "0.02733700"
        if (symbol.match(/BTC$/)) {
          newPriceMap[symbol.replace(/BTC$/, "")] = parseFloat(price);
        } else if (symbol === "BTCUSDT") {
          setBtcPrice(parseFloat(price));
        }
      });
      setPricesByBTC(newPriceMap);
    });

    fetch(
      "https://7hes1mxv2g.execute-api.ap-northeast-1.amazonaws.com/prod/rate",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(async res => {
      const result = await res.json();
      setCnyRate(result.rate);
    });
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => {
      fetchPrices();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  function computeChartOpt(): EChartOption | undefined {
    if (groups[selectedIndex] == null) {
      return;
    }

    // 合并币种数据
    const coinMap: { [sym: string]: number } = {};

    groups[selectedIndex].coins.forEach(coin => {
      const priceByBaseCoin = getBaseCoinPrice(coin);
      const amountByBaseCoin =
        priceByBaseCoin != null ? priceByBaseCoin * coin.balance : undefined;

      if (amountByBaseCoin) {
        if (coinMap[coin.sym] == null) {
          coinMap[coin.sym] = amountByBaseCoin;
        } else {
          coinMap[coin.sym] += amountByBaseCoin;
        }
      }
    });

    const coins = Object.keys(coinMap).sort((a, b) =>
      coinMap[a] - coinMap[b] < 0 ? 1 : -1
    );

    if (coins.length <= 1) {
      return;
    }

    return {
      title: {
        text: "持仓统计（按币种）",
        // subtext: "Fayment.com",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: `{a} <br/>{b} 持仓: {c} ${baesCoin} ({d}%)`
      },
      legend: {
        bottom: 10,
        left: "center",
        data: coins
      },
      series: [
        {
          name: "持仓数据",
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: coins.map(coin => ({
            value: coinMap[coin],
            name: coin
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
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

    if (sym === "BTC") {
      return 1;
    }

    if (sym === "USD" && btcPrice) {
      return 1 / btcPrice;
    }

    if (sym === "CNY" && btcPrice && cnyRate) {
      return 1 / btcPrice / cnyRate;
    }

    return undefined;
  }

  function getBaseCoinPrice(coin: CoinInfo): number | undefined {
    const coinPriceByBTC = getPriceByBTC(coin.sym);
    const baseCoinPriceByBTC = getPriceByBTC(baesCoin);

    if (coinPriceByBTC == null || baseCoinPriceByBTC == null) {
      return undefined;
    }

    return coinPriceByBTC / baseCoinPriceByBTC;
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

        const sym = parseCoinSym(data.sym);
        if (sym == null) {
          // sym 不符合要求
          throw new Error("不支持此币种");
        }

        const balance = isNaN(data.balance) ? 0 : data.balance;
        const title = data.title || "默认";

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
            title: data.title,
            sym: data.sym,
            balance: data.balance
          })
          .toJS();
        setGroups(newGroups);
      }
    });
  }

  function reloadCoins() {
    setTimeout(() => fetchPrices());
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
        <Col span={17}>
          <div style={{ marginBottom: 20 }}>
            计价单位: &nbsp;
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
                          <Button type="link" onClick={() => addCoin()}>
                            <Icon type="plus" />
                          </Button>
                        </th>
                        <th>币种</th>
                        <th>价格</th>
                        <th>数量</th>
                        <th>总金额</th>
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
                        const priceByBaseCoin = getBaseCoinPrice(coin);
                        const amountByBaseCoin =
                          priceByBaseCoin != null
                            ? priceByBaseCoin * coin.balance
                            : undefined;

                        if (amountByBaseCoin != null) {
                          totalAmountByBaseCoin += amountByBaseCoin;
                        }

                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{coin.title}</td>
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
                            <td>
                              {priceByBaseCoin &&
                                `${priceByBaseCoin.toPrecision(5)} ${baesCoin}`}
                            </td>
                            <td>
                              {coin.balance} {coin.sym}
                            </td>
                            <td>
                              {amountByBaseCoin &&
                                `${amountByBaseCoin.toPrecision(
                                  5
                                )} ${baesCoin}`}
                            </td>
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
                        <th>
                          {totalAmountByBaseCoin &&
                            `${totalAmountByBaseCoin.toPrecision(
                              5
                            )} ${baesCoin}`}
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
