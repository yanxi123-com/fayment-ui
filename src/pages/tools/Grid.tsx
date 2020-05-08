import { Button, Col, Form, Input, Row, Tabs, Table, Select } from "antd";
import React, { useState } from "react";
import { showError } from "comps/popup";

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

  console.log("guess=", guess, "leftNum", leftNum);
  return leftNum;
}

export default function Grid() {
  const [formLong] = Form.useForm();
  const [formShort] = Form.useForm();
  const [longRecords, setLongRecords] = useState<LongRecord[]>([]);
  const [shortRecords, setShortRecords] = useState<ShortRecord[]>([]);

  function listLongResult(values: { [name: string]: any }) {
    const opts: LongOpts = {
      startPrice: Number(values.startPrice),
      endPrice: Number(values.endPrice),
      gridPercent: Number(values.gridPercent),
      initCurrency: Number(values.initCurrency),
      mode: values.mode,
    };
    const records: LongRecord[] = [];

    if (opts.startPrice <= opts.endPrice) {
      return showError("做空时，起始价格应大于结束价格");
    }

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
  }

  function renderNumber(num: number) {
    return num.toFixed(2);
  }

  function listShortResult(values: { [name: string]: any }) {
    const opts: ShortOpts = {
      startPrice: Number(values.startPrice),
      endPrice: Number(values.endPrice),
      gridPercent: Number(values.gridPercent),
      initTargetNum: Number(values.initTargetNum),
      mode: values.mode,
    };
    const records: ShortRecord[] = [];

    if (opts.startPrice >= opts.endPrice) {
      return showError("做空时，起始价格应小于结束价格");
    }

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
  }

  const longColumns = [
    {
      title: "买入金额",
      dataIndex: "buyAmount",
      render(buyAmount: number, record: LongRecord) {
        return buyAmount.toFixed(2);
      },
    },
    {
      title: "剩余金额",
      dataIndex: "leftAmount",
      render(leftAmount: number) {
        return leftAmount.toFixed(2);
      },
    },
    {
      title: "买入标的数量",
      dataIndex: "buyTargetNum",
      render(buyTargetNum: number) {
        return buyTargetNum.toFixed(2);
      },
    },
    {
      title: "标的总数量",
      dataIndex: "targetTotal",
      render(targetTotal: number) {
        return targetTotal.toFixed(2);
      },
    },
    {
      title: "交易价格",
      dataIndex: "tradePrice",
      render(tradePrice: number) {
        return tradePrice.toFixed(2);
      },
    },
    {
      title: "市值",
      dataIndex: "marketValue",
      render(marketValue: number) {
        return marketValue.toFixed(2);
      },
    },
    {
      title: "本格盈利",
      dataIndex: "gridProfit",
      render(gridProfit: number) {
        return gridProfit.toFixed(2);
      },
    },
  ];

  const shortColumns = [
    {
      title: "卖出标的数量",
      dataIndex: "sellTargetNum",
      render: renderNumber,
    },
    {
      title: "剩余标的数量",
      dataIndex: "leftTargetNum",
      render: renderNumber,
    },
    {
      title: "卖出金额",
      dataIndex: "sellAmount",
      render: renderNumber,
    },
    {
      title: "卖出总金额",
      dataIndex: "sellTotalAmount",
      render: renderNumber,
    },
    { title: "卖出价格", dataIndex: "sellPrice", render: renderNumber },
    { title: "市值", dataIndex: "marketValue", render: renderNumber },
    {
      title: "本格盈利",
      dataIndex: "gridProfit",
      render: renderNumber,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="long" onChange={() => {}}>
        <Tabs.TabPane tab="网格做多" key="long">
          <Form
            form={formLong}
            onFinish={listLongResult}
            labelCol={{ span: 8 }}
            initialValues={{
              startPrice: 10,
              endPrice: 5,
              gridPercent: 5,
              initCurrency: 10 * 10000,
              mode: "SameCurrency",
            }}
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
          <Table
            columns={longColumns}
            dataSource={longRecords}
            pagination={{ hideOnSinglePage: true, pageSize: 100 }}
            size="small"
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="网格做空" key="short">
          <Form
            form={formShort}
            onFinish={listShortResult}
            labelCol={{ span: 8 }}
            initialValues={{
              startPrice: 5,
              endPrice: 10,
              gridPercent: 5,
              initTargetNum: 10000,
              mode: "SameCurrency",
            }}
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
          <Table
            columns={shortColumns}
            dataSource={shortRecords}
            pagination={{ hideOnSinglePage: true, pageSize: 100 }}
            size="small"
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
