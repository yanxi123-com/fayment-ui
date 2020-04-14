import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import { showError } from "comps/popup";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";

export interface TradeInfo {
  id: number;
  stockSym: string;
  stockName: string;
  stockNum: number;
  direction: string;
  amount: number;
  tradedAt: number;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 20, offset: 4 },
};

interface Props {
  trade?: TradeInfo;
  onSubmit: (trade: TradeInfo) => void;
  onCancel: () => void;
}

interface FormValues {
  stockName: string;
  stockSym: string;
  stockNum: number;
  direction: "B" | "S";
  amount: number;
  tradedAt: Moment;
}

export function TradeForm(props: Props) {
  const { trade, onSubmit, onCancel } = props;
  const [isTraded, setIsTraded] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (trade) {
      setIsTraded(trade.tradedAt > 0);
    }
  }, [trade]);

  function onFinish(values: { [name: string]: any }) {
    const {
      stockName,
      stockSym,
      stockNum,
      direction,
      amount,
      tradedAt,
    } = values as FormValues;

    if (!stockSym || !stockSym.match(/^\d{6}$/)) {
      return showError("股票代码必须为6位数字");
    }

    if (!stockName) {
      return showError("股票名称不能为空");
    }

    if (!stockNum || stockNum === 0) {
      return showError("股票数量不能为空");
    }

    if (!amount || amount === 0) {
      return showError("总金额不能为空");
    }

    if (isTraded && !tradedAt) {
      return showError("请填入日期");
    }

    const submitTrade: TradeInfo = {
      id: trade ? trade.id : 0,
      stockSym,
      stockName,
      stockNum,
      direction,
      amount,
      tradedAt: isTraded ? Math.round(tradedAt.toDate().getTime() / 1000) : 0,
    };

    onSubmit(submitTrade);
  }

  function close() {
    onCancel();
  }

  const initValues = {
    traded: isTraded ? "yes" : "no",
    tradedAt:
      trade == null || trade.tradedAt === 0
        ? moment()
        : moment(trade.tradedAt * 1000),
    direction: trade != null ? trade.direction : "B",
    stockSym: trade != null ? trade.stockSym : undefined,
    stockName: trade != null ? trade.stockName : undefined,
    stockNum: trade != null ? trade.stockNum : undefined,
    stockPrice:
      trade != null ? (trade.amount / trade.stockNum).toFixed(4) : undefined,
    amount: trade != null ? trade.amount : undefined,
  };

  return (
    <Modal
      width={600}
      visible
      title={trade == null || trade.id === 0 ? "添加记录" : "修改记录"}
      onCancel={close}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <Form
        form={form}
        {...formItemLayout}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        initialValues={initValues}
        onValuesChange={(changedValues, allValues) => {
          setIsTraded(allValues.traded === "yes");

          if (allValues.stockNum) {
            if (changedValues.stockPrice) {
              const amount = allValues.stockNum * changedValues.stockPrice;
              form.setFieldsValue({
                amount: amount.toFixed(2),
              });
            } else if (changedValues.amount) {
              const price = changedValues.amount / allValues.stockNum;
              form.setFieldsValue({
                stockPrice: price.toFixed(4),
              });
            }
          }
        }}
      >
        <Form.Item label="是否成交" style={{ marginBottom: 10 }} name="traded">
          <Radio.Group
            options={[
              { label: "已成交", value: "yes" },
              { label: "未成交", value: "no" },
            ]}
          />
        </Form.Item>

        {isTraded && (
          <Form.Item
            label="成交日期"
            style={{ marginBottom: 10 }}
            name="tradedAt"
          >
            <DatePicker />
          </Form.Item>
        )}

        <Form.Item label="方向" style={{ marginBottom: 10 }} name="direction">
          <Radio.Group
            options={[
              { label: "买入", value: "B" },
              { label: "卖出", value: "S" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="股票代码"
          style={{ marginBottom: 10 }}
          name="stockSym"
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="股票名称"
          style={{ marginBottom: 10 }}
          name="stockName"
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="数量" style={{ marginBottom: 10 }} name="stockNum">
          <Input type="number" autoComplete="off" />
        </Form.Item>

        <Form.Item label="单价" style={{ marginBottom: 10 }} name="stockPrice">
          <Input type="number" autoComplete="off" />
        </Form.Item>
        <Form.Item label="总金额" style={{ marginBottom: 10 }} name="amount">
          <Input type="number" autoComplete="off" />
        </Form.Item>

        <Form.Item {...tailFormItemLayout} style={{ marginBottom: 10 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button onClick={close}>取消</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
