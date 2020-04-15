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
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Input,
  List as AntList,
  Row,
  Table,
  Menu,
  Dropdown,
} from "antd";
import cx from "classnames";
import { Loading } from "comps/loading/Loading";
import { confirmPromise, showError } from "comps/popup";
import { openPopupForm } from "comps/PopupForm";
import { GroupType } from "constant";
import { EChartOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useGroups } from "hooks/useGroups";
import { useStockPrices } from "hooks/useStockPrices";
import { userService } from "lib/grpcClient";
import { handleGrpcError } from "lib/util/grpcUtil";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { IdWrapper } from "proto/base_pb";
import {
  AddStockAccountReq,
  StockAccountDTO,
  ListAccountLogsReq,
  SwitchOrderReq,
} from "proto/user_pb";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BaseFieldSchema, getAuthMD, globalContext } from "stores/GlobalStore";

import css from "./Stocks.module.scss";

let actionClicked = false;

interface StockInfo {
  id: number;
  site: string;
  sym: string;
  name: string;
  num: number;
}

interface StockLog {
  id: number;
  site: string;
  sym: string;
  name: string;
  num: number;
  stockId: number;
}

function Component() {
  // 用来让 stocks 自动更新
  const [stocksVersion, setStocksVersion] = useState(0);
  const [filerText, setFilterText] = useState("");
  const [stocks, setStocks] = useState<StockInfo[]>();
  const [stockLogs, setStockLogs] = useState<StockLog[]>();

  const { refreshPrice, prices, addStocks } = useStockPrices();

  const {
    groups,
    selectedIndex,
    addGroup,
    updateGroup,
    moveGroup,
    deleteGroup,
    changeGroup,
    setSelectedIndex,
  } = useGroups(GroupType.StockAccount);

  const logTableColumns = [
    { title: "名称", dataIndex: "name" },
    { title: "代码", dataIndex: "sym" },
    { title: "数量", dataIndex: "num" },
    {
      title: "增减",
      dataIndex: "num",
      render: (num: number, log: StockLog, index: number) => {
        if (stockLogs && stockLogs[index + 1]) {
          const value = num - stockLogs[index + 1].num;
          return (value > 0 ? "+" : "") + parseFloat(value.toFixed(2));
        }
        return "-";
      },
    },
    {
      title: "修改时间",
      dataIndex: "createdAt",
      render: (createdAt: number) =>
        moment(createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      render: (log: StockLog) => {
        return (
          <DeleteOutlined
            className={css.icon}
            onClick={() => deleteStockLog(log)}
          />
        );
      },
    },
  ];

  // fetch stock accounts
  useEffect(() => {
    if (!groups || groups.length === 0) {
      return;
    }

    const req = new IdWrapper();
    req.setId(groups[selectedIndex].id);
    userService
      .listStockAccounts(req, getAuthMD())
      .then((res) => {
        setStocks(
          res.getAccountsList().map((a) => ({
            id: a.getId(),
            site: a.getSite(),
            sym: a.getSym(),
            name: a.getName(),
            num: a.getNum(),
          }))
        );

        addStocks(
          res.getAccountsList().map((a) => ({
            site: a.getSite(),
            sym: a.getSym(),
          }))
        );
      })
      .catch(handleGrpcError)
      .catch(showError);
  }, [selectedIndex, groups, stocksVersion, addStocks]);

  function deleteStockLog(log: StockLog) {
    confirmPromise("请确认", `确实要删除此记录吗？`).then((confirm) => {
      if (confirm) {
        const req = new IdWrapper();
        req.setId(log.id);
        userService
          .deleteStockAccountLog(req, getAuthMD())
          .then(() => {
            showStockLogs(log.stockId);
          })
          .catch(handleGrpcError)
          .catch(showError);
      }
    });
  }

  function showStockLogs(stockId: number) {
    const req = new ListAccountLogsReq();
    req.setAccountId(stockId);
    req.setMax(100);
    userService
      .listStockAccountLogs(req, getAuthMD())
      .then((res) => {
        setStockLogs(
          res.getLogsList().map((l) => ({
            id: l.getId(),
            site: l.getSite(),
            sym: l.getSym(),
            name: l.getName(),
            num: l.getNum(),
            createdAt: l.getCreatedAt(),
            stockId,
          }))
        );
      })
      .catch(handleGrpcError)
      .catch(showError);
  }

  // 饼图数据
  function computeChartOpt(): EChartOption | undefined {
    if (!groups || groups[selectedIndex] == null) {
      return;
    }

    if (!stocks) {
      return;
    }

    // 合并币种数据
    const stockNumMap: { [name: string]: number } = {};

    if (stocks) {
      stocks.forEach((stock) => {
        const name = stock.name;
        const price = stock.sym === "CNY" ? 1 : prices[stock.sym];

        if (!price) {
          return;
        }

        if (stockNumMap[name] == null) {
          stockNumMap[name] = stock.num * price;
        } else {
          stockNumMap[name] += stock.num * price;
        }
      });
    }

    const combinedStocks = Object.keys(stockNumMap).sort((a, b) =>
      stockNumMap[a] - stockNumMap[b] < 0 ? 1 : -1
    );

    if (combinedStocks.length <= 1) {
      return;
    }

    return {
      title: {
        text: "持仓统计",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: `{a} <br/>{b} 持仓: ￥{c} ({d}%)`,
      },
      legend: {
        bottom: 10,
        left: "center",
        data: combinedStocks,
      },
      series: [
        {
          name: "持仓数据",
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: combinedStocks.map((stock) => ({
            value: stockNumMap[stock],
            name: stock,
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

  function addStock() {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "sym",
        title: "股票代码",
        placeholder: "请填写股票代码",
      },
      {
        type: "text",
        key: "name",
        title: "股票名称",
        placeholder: "请填写股票名称",
      },
      {
        type: "number",
        key: "num",
        title: "持有数量",
        placeholder: "请输入持有数量",
        defaultValue: "0",
      },
    ];
    openPopupForm({
      title: "添加股票",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!groups) {
          return;
        }

        const { sym, name, num: numStr } = data;
        const num = parseFloat(numStr);

        if (!sym) {
          throw new Error("股票代码不能为空");
        }
        if (!name) {
          throw new Error("股票名称不能为空");
        }
        if (isNaN(num)) {
          throw new Error("股票数量必须为数字");
        }

        const req = new AddStockAccountReq();
        req.setGroupId(groups[selectedIndex].id);
        req.setName(name);
        req.setSym(sym);
        req.setNum(num);
        return userService
          .addStockAccount(req, getAuthMD())
          .then(() => setStocksVersion((i) => i + 1))
          .catch(handleGrpcError);
      },
    });
  }

  function updateStock(stockIndex: number) {
    if (!stocks) {
      return;
    }

    const stock = stocks[stockIndex];
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "sym",
        title: "股票代码",
        placeholder: "请填写股票代码",
        defaultValue: stock.sym,
      },
      {
        type: "text",
        key: "name",
        title: "股票名称",
        placeholder: "请填写股票名称",
        defaultValue: stock.name,
      },
      {
        type: "number",
        key: "num",
        title: "持有数量",
        placeholder: "请输入持有数量",
        defaultValue: stock.num.toString(),
      },
    ];
    openPopupForm({
      title: "修改股票信息",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        const { sym, name, num: numStr } = data;
        const num = parseFloat(numStr);

        if (!sym) {
          throw new Error("股票代码不能为空");
        }
        if (!name) {
          throw new Error("股票名称不能为空");
        }
        if (isNaN(num)) {
          throw new Error("股票数量必须为数字");
        }

        const req = new StockAccountDTO();
        req.setId(stock.id);
        req.setName(name);
        req.setSym(sym);
        req.setNum(num);
        return userService
          .updateStockAccount(req, getAuthMD())
          .then(() => setStocksVersion((i) => i + 1))
          .catch(handleGrpcError);
      },
    });
  }

  function deleteStock(index: number) {
    if (!stocks) {
      return;
    }

    const name = `${stocks[index].name} [${stocks[index].sym}] `;
    confirmPromise("请确认", `确实要删除${name}吗？`).then((confirm) => {
      if (confirm) {
        const req = new IdWrapper();
        req.setId(stocks[index].id);
        userService
          .deleteStockAccount(req, getAuthMD())
          .then((res) => {
            setStocksVersion((i) => i + 1);
          })
          .catch(handleGrpcError)
          .catch(showError);
      }
    });
  }

  function moveStock(direction: "up" | "down", index: number) {
    if (!stocks) {
      return;
    }
    const otherIndex = direction === "up" ? index - 1 : index + 1;
    if (otherIndex < 0 || otherIndex >= stocks.length) {
      return;
    }

    const req = new SwitchOrderReq();
    req.setIdA(stocks[index].id);
    req.setIdB(stocks[otherIndex].id);
    userService
      .switchStockAccount(req, getAuthMD())
      .then(() => {
        setStocksVersion((i) => i + 1);
      })
      .catch(handleGrpcError)
      .catch(showError);
  }

  function addCurrency() {
    const fields: Array<BaseFieldSchema> = [
      {
        type: "text",
        key: "name",
        title: "名称",
        defaultValue: "账户余额",
      },
      {
        type: "number",
        key: "num",
        title: "金额",
        placeholder: "请输入金额",
        defaultValue: "0",
      },
    ];
    openPopupForm({
      title: "添加现金",
      labelSpan: 3,
      fields,
      onSubmit: (data: { [key: string]: any }) => {
        if (!groups) {
          return;
        }

        const { name, num: numStr } = data;
        const num = parseFloat(numStr);

        if (!name) {
          throw new Error("名称不能为空");
        }
        if (isNaN(num)) {
          throw new Error("金额必须为数字");
        }

        const req = new AddStockAccountReq();
        req.setGroupId(groups[selectedIndex].id);
        req.setName(name);
        req.setSym("CNY");
        req.setNum(num);
        return userService
          .addStockAccount(req, getAuthMD())
          .then(() => setStocksVersion((i) => i + 1))
          .catch(handleGrpcError);
      },
    });
  }

  if (groups == null) {
    return <Loading />;
  }

  const chartOpt = computeChartOpt();
  let totalAmount: number = 0;

  return (
    <div className={css.container}>
      <Row>
        <Col span={7}>
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
            <Button
              onClick={() => addStock()}
              icon={<PlusOutlined />}
              style={{ marginRight: 20 }}
            >
              添加股票
            </Button>
            <Button
              onClick={() => addCurrency()}
              icon={<PlusOutlined />}
              style={{ marginRight: 30 }}
            >
              添加现金
            </Button>
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
                  <table className={cx("table", css.stocks)}>
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row ant-table-row-level-0">
                        <th>序号</th>
                        <th>股票代码</th>
                        <th>股票名称</th>
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
                      {stocks &&
                        stocks.map((stock, i) => {
                          const stockPrice: number | undefined =
                            prices[stock.sym];
                          if (stockPrice) {
                            totalAmount += stock.num * stockPrice;
                          }

                          if (filerText) {
                            const word = filerText.toUpperCase();
                            const { name, sym } = stock;
                            if (
                              name.toUpperCase().indexOf(word) === -1 &&
                              sym.indexOf(word) === -1
                            ) {
                              return null;
                            }
                          }

                          const menu = (
                            <Menu>
                              <Menu.Item onClick={() => deleteStock(i)}>
                                <DeleteOutlined className={css.icon} />
                                删除
                              </Menu.Item>

                              <Menu.Item onClick={() => changeGroup(stock.id)}>
                                <ArrowRightOutlined className={css.icon} />
                                换组
                              </Menu.Item>
                            </Menu>
                          );

                          return (
                            <tr key={i}>
                              <td>
                                <Button
                                  type="link"
                                  style={{
                                    padding: "0 0 0 5px",
                                    height: "auto",
                                    border: 0,
                                  }}
                                  onClick={() => showStockLogs(stock.id)}
                                >
                                  {i + 1}
                                </Button>
                              </td>
                              <td>{stock.sym}</td>
                              <td>{stock.name}</td>
                              <td>{stock.num} </td>
                              <td>{stockPrice}</td>
                              <td>
                                {stockPrice &&
                                  (stockPrice * stock.num).toFixed(2)}
                              </td>
                              <td style={{ width: 150, textAlign: "center" }}>
                                <EditOutlined
                                  className={css.icon}
                                  onClick={() => updateStock(i)}
                                />
                                <Divider type="vertical" />

                                {filerText === "" && (
                                  <>
                                    <UpOutlined
                                      className={css.icon}
                                      onClick={() => moveStock("up", i)}
                                    />
                                    <Divider type="vertical" />

                                    <DownOutlined
                                      className={css.icon}
                                      onClick={() => moveStock("down", i)}
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
                        <th>{totalAmount && `${totalAmount.toFixed(2)}`}</th>
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

      {stocks && stockLogs && (
        <Drawer
          title={`${stocks[selectedIndex].name} ${stocks[selectedIndex].sym} 修改历史`}
          placement="right"
          closable={false}
          onClose={() => setStockLogs(undefined)}
          visible
          width={700}
        >
          <Table
            columns={logTableColumns}
            dataSource={stockLogs}
            size="small"
            rowKey="id"
            pagination={false}
          />
        </Drawer>
      )}
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
