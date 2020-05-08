import { Button, Col, Form, Input, Row, Select, Table, Tabs } from "antd";
import Groups from "comps/groups/Groups";
import { showError } from "comps/popup";
import { GroupType } from "constant";
import { useGroups } from "hooks/useGroups";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { globalContext, getAuthMD } from "stores/GlobalStore";

import css from "./Grids.module.scss";
import { GetUserKvReq, UserKvDTO } from "proto/user_pb";
import { userService } from "lib/grpcClient";
import { parseGrpcError, handleGrpcError } from "lib/util/grpcUtil";
import { Loading } from "comps/loading/Loading";

type LongMode = "SameCurrency"; // 每次买入，使用相等数量货币，随着价格下跌，每次购买标的物会增加

type ShortMode = "SameCurrency"; // 每次卖出相同金额的标的

interface LongOpts {
  startPrice: number;
  endPrice: number;
  gridPercent: number;
  initCurrency: number;
  mode: LongMode;
}

interface LongRecord {
  key: string | number;
  buyAmount: number;
  leftAmount: number;
  buyTargetNum: number;
  targetTotal: number;
  tradePrice: number;
  marketValue: number;
  gridProfit: number;
}

interface ShortOpts {
  startPrice: number;
  endPrice: number;
  gridPercent: number;
  initTargetNum: number;
  mode: ShortMode;
}

interface ShortRecord {
  key: string | number;
  sellTargetNum: number;
  leftTargetNum: number;
  sellAmount: number;
  sellTotalAmount: number;
  sellPrice: number;
  marketValue: number;
  gridProfit: number;
}

interface GridInfo {
  longOpts: LongOpts;
  shortOpts: ShortOpts;
}

const defaultGridInfo: GridInfo = {
  longOpts: {
    startPrice: 10,
    endPrice: 5,
    gridPercent: 5,
    initCurrency: 10 * 10000,
    mode: "SameCurrency",
  },
  shortOpts: {
    startPrice: 5,
    endPrice: 10,
    gridPercent: 5,
    initTargetNum: 10000,
    mode: "SameCurrency",
  },
};

function getLastLeftTargetNum(
  opts: ShortOpts,
  gridNum: number,
  guessMin: number,
  guessMax: number
): number {
  const guess = (guessMax + guessMin) / 2;
  let leftNum = opts.initTargetNum;
  let tradePrice = opts.startPrice;
  for (let i = 0; i < gridNum; i++) {
    const sellNum = guess / tradePrice;
    leftNum = leftNum - sellNum;
    tradePrice = tradePrice * (1 + opts.gridPercent / 100);
  }

  return leftNum;
}

function Component() {
  const groupsProps = useGroups(GroupType.GridTrade);
  const [gridVersion, setGridVersion] = useState(0);
  // const [formLong] = Form.useForm();
  // const [formShort] = Form.useForm();
  const [longRecords, setLongRecords] = useState<LongRecord[]>([]);
  const [shortRecords, setShortRecords] = useState<ShortRecord[]>([]);
  const [gridInfo, setGridInfo] = useState<GridInfo>();
  const [showForm, setShowForm] = useState(true);
  const { groups, currentGroupIndex } = groupsProps;

  // fetch grid info
  useEffect(() => {
    if (!groups || groups.length === 0) {
      return;
    }
    const req = new GetUserKvReq();
    req.setKey(`grid-info-${groups[currentGroupIndex].id}`);
    setShowForm(false);
    userService
      .getUserKv(req, getAuthMD())
      .then((res) => {
        setGridInfo(JSON.parse(res.getValue()));
      })
      .catch((e: any) => {
        const grpcError = parseGrpcError(e);
        if (grpcError.code === "NOT_FOUND") {
          setGridInfo(defaultGridInfo);
        } else {
          showError(grpcError);
        }
      })
      .finally(() => {
        setShowForm(true);
      });
  }, [currentGroupIndex, groups, gridVersion]);

  function saveGridInfo(info: GridInfo) {
    if (!groups || !gridInfo) {
      return;
    }

    const req = new UserKvDTO();
    req.setKey(`grid-info-${groups[currentGroupIndex].id}`);
    req.setValue(JSON.stringify(info));
    userService
      .saveUserKv(req, getAuthMD())
      .then(() => setGridVersion((v) => v + 1))
      .catch(handleGrpcError)
      .catch(showError);
    setGridInfo(info);
  }

  function saveLongGridInfo(values: { [name: string]: any }) {
    const opts: LongOpts = {
      startPrice: Number(values.startPrice),
      endPrice: Number(values.endPrice),
      gridPercent: Number(values.gridPercent),
      initCurrency: Number(values.initCurrency),
      mode: values.mode,
    };

    if (opts.startPrice <= opts.endPrice) {
      return showError("做空时，起始价格应大于结束价格");
    }
    if (gridInfo) {
      saveGridInfo({ ...gridInfo, longOpts: opts });
    }
  }

  function saveShortGridInfo(values: { [name: string]: any }) {
    const opts: ShortOpts = {
      startPrice: Number(values.startPrice),
      endPrice: Number(values.endPrice),
      gridPercent: Number(values.gridPercent),
      initTargetNum: Number(values.initTargetNum),
      mode: values.mode,
    };

    if (opts.startPrice >= opts.endPrice) {
      return showError("做空时，起始价格应小于结束价格");
    }
    if (gridInfo) {
      saveGridInfo({ ...gridInfo, shortOpts: opts });
    }
  }

  const listLongResult = useCallback(() => {
    if (!gridInfo) {
      return;
    }
    const opts = gridInfo.longOpts;
    const records: LongRecord[] = [];

    const gridNum =
      Math.ceil(
        Math.log(opts.endPrice / opts.startPrice) /
          Math.log(1 - opts.gridPercent / 100)
      ) + 1;

    let tradePrice = opts.startPrice;
    let leftAmount = opts.initCurrency;
    let targetTotal = 0;

    for (let i = 0; i < gridNum; i++) {
      const buyAmount = Math.min(opts.initCurrency / gridNum, leftAmount);
      const buyTargetNum = buyAmount / tradePrice;

      targetTotal += buyTargetNum;
      leftAmount -= buyAmount;
      const marketValue = leftAmount + targetTotal * tradePrice;
      records.push({
        key: i,
        buyAmount,
        leftAmount,
        buyTargetNum,
        targetTotal,
        tradePrice,
        marketValue,
        gridProfit: (buyAmount * opts.gridPercent) / 100,
      });
      tradePrice = tradePrice * (1 - opts.gridPercent / 100);
    }

    setLongRecords(records);
  }, [gridInfo]);
  // function listLongResult() {}

  function toFixed(num: number) {
    return num.toFixed(2);
  }

  function toPrecision(num: number) {
    return num.toPrecision(5);
  }

  const listShortResult = useCallback(() => {
    if (!gridInfo) {
      return;
    }

    const opts = gridInfo.shortOpts;
    const records: ShortRecord[] = [];

    // startPrice * (1 + percent/100) ^ n = endPrice
    // (1+percent/100)^n = (endPrice / startPrice)
    const gridNum =
      Math.ceil(
        Math.log(opts.endPrice / opts.startPrice) /
          Math.log(1 + opts.gridPercent / 100)
      ) + 1;

    let guessMin = opts.startPrice * (opts.initTargetNum / gridNum);
    let guessMax = opts.startPrice * opts.initTargetNum;
    let tryNum = 0;
    let sellAmount: number = 0;
    while (true) {
      if (tryNum++ > 100) {
        break;
      }

      const lastLeftTargetNum = getLastLeftTargetNum(
        opts,
        gridNum,
        guessMin,
        guessMax
      );

      if (Math.abs(lastLeftTargetNum / opts.initTargetNum) < 0.0001) {
        sellAmount = (guessMin + guessMax) / 2;
        break;
      }

      if (lastLeftTargetNum > 0) {
        guessMin = (guessMin + guessMax) / 2;
      } else {
        guessMax = (guessMin + guessMax) / 2;
      }
    }

    let sellPrice = opts.startPrice;
    let leftTargetNum = opts.initTargetNum;
    let sellTotalAmount = 0;

    if (!sellAmount) {
      showError("sellAmount 错误");
    }

    for (let i = 0; i < gridNum; i++) {
      let sellTargetNum = Math.min(leftTargetNum, sellAmount / sellPrice);

      leftTargetNum = leftTargetNum - sellTargetNum;
      const thisSellAmount = sellTargetNum * sellPrice;
      sellTotalAmount += thisSellAmount;

      const marketValue = sellTotalAmount + leftTargetNum * sellPrice;

      records.push({
        key: i,
        sellTargetNum,
        leftTargetNum,
        sellAmount: thisSellAmount,
        sellTotalAmount,
        sellPrice,
        marketValue,
        gridProfit: (thisSellAmount * opts.gridPercent) / 100,
      });
      sellPrice = sellPrice * (1 + opts.gridPercent / 100);
    }

    setShortRecords(records);
  }, [gridInfo]);

  useEffect(() => {
    if (gridInfo) {
      listLongResult();
      listShortResult();
    }
  }, [gridInfo, listLongResult, listShortResult]);

  const longColumns = [
    {
      title: "买入金额",
      dataIndex: "buyAmount",
      render: toFixed,
    },
    {
      title: "剩余金额",
      dataIndex: "leftAmount",
      render: toFixed,
    },
    {
      title: "买入标的数量",
      dataIndex: "buyTargetNum",
      render: toFixed,
    },
    {
      title: "标的总数量",
      dataIndex: "targetTotal",
      render: toFixed,
    },
    {
      title: "交易价格",
      dataIndex: "tradePrice",
      render: toPrecision,
    },
    {
      title: "市值",
      dataIndex: "marketValue",
      render: toFixed,
    },
    {
      title: "本格盈利",
      dataIndex: "gridProfit",
      render: toFixed,
    },
  ];

  const shortColumns = [
    {
      title: "卖出标的数量",
      dataIndex: "sellTargetNum",
      render: toFixed,
    },
    {
      title: "剩余标的数量",
      dataIndex: "leftTargetNum",
      render: toFixed,
    },
    {
      title: "卖出金额",
      dataIndex: "sellAmount",
      render: toFixed,
    },
    {
      title: "卖出总金额",
      dataIndex: "sellTotalAmount",
      render: toFixed,
    },
    { title: "卖出价格", dataIndex: "sellPrice", render: toPrecision },
    { title: "市值", dataIndex: "marketValue", render: toFixed },
    {
      title: "本格盈利",
      dataIndex: "gridProfit",
      render: toFixed,
    },
  ];

  if (gridInfo == null) {
    return <Loading />;
  }

  return (
    <div className={css.container}>
      <Row>
        <Col span={6}>
          <Groups {...groupsProps} />
        </Col>
        <Col span={18} className={css.main}>
          <Tabs defaultActiveKey="long" onChange={() => {}}>
            <Tabs.TabPane tab="网格做多" key="long">
              {showForm && (
                <Form
                  // form={formLong}
                  onFinish={saveLongGridInfo}
                  labelCol={{ span: 8 }}
                  initialValues={gridInfo.longOpts}
                >
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item
                        name="startPrice"
                        label="网格起始价格"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "起始价格必须为数字",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="endPrice"
                        label="网格结束价格"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "结束价格必须为数字",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="gridPercent"
                        label="每格跌幅百分比"
                        validateFirst
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "涨跌百分比必须为数字",
                            transform: Number,
                          },
                          {
                            type: "number",
                            max: 20,
                            message: "每格涨跌不能超过 20%",
                            transform: Number,
                          },
                          {
                            type: "number",
                            min: 0.1,
                            message: "每格涨跌不能小于 0.1%",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input addonAfter="%" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="initCurrency"
                        label="投入总资金"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "初始资金必须为数字",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="mode"
                        label="买入模式"
                        rules={[{ required: true }]}
                      >
                        <Select>
                          <Select.Option value="SameCurrency">
                            每次等额资金买入
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item wrapperCol={{ offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                          查看交易计划
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              )}
              <Table
                columns={longColumns}
                dataSource={longRecords}
                pagination={{ hideOnSinglePage: true, pageSize: 100 }}
                size="small"
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="网格做空" key="short">
              {showForm && (
                <Form
                  // form={formShort}
                  onFinish={saveShortGridInfo}
                  labelCol={{ span: 8 }}
                  initialValues={gridInfo.shortOpts}
                >
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item
                        name="startPrice"
                        label="网格起始价格"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "起始价格必须为数字",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="endPrice"
                        label="网格结束价格"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "结束价格必须为数字",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="gridPercent"
                        label="每格涨幅百分比"
                        validateFirst
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "涨跌百分比必须为数字",
                            transform: Number,
                          },
                          {
                            type: "number",
                            max: 20,
                            message: "每格涨跌不能超过 20%",
                            transform: Number,
                          },
                          {
                            type: "number",
                            min: 0.1,
                            message: "每格涨跌不能小于 0.1%",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input addonAfter="%" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="initTargetNum"
                        label="初始总标的数量"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            message: "初始标的必须为数字",
                            transform: Number,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="mode"
                        label="卖出模式"
                        rules={[{ required: true }]}
                      >
                        <Select>
                          <Select.Option value="SameCurrency">
                            每次卖出等额标的
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item wrapperCol={{ offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                          查看交易计划
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              )}
              <Table
                columns={shortColumns}
                dataSource={shortRecords}
                pagination={{ hideOnSinglePage: true, pageSize: 100 }}
                size="small"
              />
            </Tabs.TabPane>
          </Tabs>
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
