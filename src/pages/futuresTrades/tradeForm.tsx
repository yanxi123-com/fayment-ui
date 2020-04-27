import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import { showError } from "comps/popup";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";

export interface EditTradeInfo {
  id: number;
  contractSym: string;
  num: number;
  direction: "B" | "S";
  price: number;
  tradedAt: number;
}

export interface TradeInfo extends EditTradeInfo {
  varietyName: string;
  tradingUnit: number;
  marginPercent: number;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 20, offset: 4 },
};

interface Props {
  trade?: EditTradeInfo;
  onSubmit: (trade: EditTradeInfo) => void;
  onCancel: () => void;
}

interface FormValues {
  contractSym: string;
  num: number;
  direction: "B" | "S";
  price: number;
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
      contractSym,
      num,
      direction,
      price,
      tradedAt,
    } = values as FormValues;

    if (isTraded && !tradedAt) {
      return showError("请填入日期");
    }

    if (!contractSym) {
      return showError("合约代码不能为空");
    }

    if (!num || num === 0) {
      return showError("数量不能为空");
    }

    if (!price || price === 0) {
      return showError("价格不能为空");
    }

    const submitTrade: EditTradeInfo = {
      id: trade ? trade.id : 0,
      contractSym: contractSym.toUpperCase(),
      num,
      direction,
      price,
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
    contractSym: trade != null ? trade.contractSym : undefined,
    num: trade != null ? trade.num : 1,
    price: trade != null ? trade.price : undefined,
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
          if (allValues.futuresNum) {
            if (changedValues.futuresPrice) {
              const amount = allValues.futuresNum * changedValues.futuresPrice;
              form.setFieldsValue({
                amount: amount.toFixed(2),
              });
            } else if (changedValues.amount) {
              const price = changedValues.amount / allValues.futuresNum;
              form.setFieldsValue({
                futuresPrice: price.toFixed(4),
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
            onChange={(e) => {
              setIsTraded(e.target.value === "yes");
            }}
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
          label="合约代码"
          style={{ marginBottom: 10 }}
          name="contractSym"
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="数量" style={{ marginBottom: 10 }} name="num">
          <Input type="number" autoComplete="off" />
        </Form.Item>

        <Form.Item label="单价" style={{ marginBottom: 10 }} name="price">
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
