import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import { showError } from "comps/popup";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 19, offset: 5 },
};

export interface EditTradeInfo {
  id: number;
  tradedAt: number;

  longContractSym: string;
  longNum: number;
  longPrice: number;

  shortContractSym: string;
  shortNum: number;
  shortPrice: number;
}

export interface ModalInfo {
  trade?: EditTradeInfo;
  onSubmit?: (trade: EditTradeInfo) => void;
}

interface TradeProps {
  trade?: EditTradeInfo;
  onSubmit: (trade: EditTradeInfo) => void;
  onCancel: () => void;
}

interface FormValues {
  tradedAt: Moment;

  longContractSym: string;
  longNum: number;
  longPrice: number;

  shortContractSym: string;
  shortNum: number;
  shortPrice: number;
}

export function TradeForm(props: TradeProps) {
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
      tradedAt,
      longContractSym,
      longNum,
      longPrice,
      shortContractSym,
      shortPrice,
      shortNum,
    } = values as FormValues;

    if (isTraded && !tradedAt) {
      return showError("请填入日期");
    }

    if (!longContractSym || !shortContractSym) {
      return showError("合约代码不能为空");
    }

    if (!longNum || !shortNum) {
      return showError("数量不能为空");
    }

    if (!longPrice || !shortPrice) {
      return showError("价格不能为空");
    }

    const submitTrade: EditTradeInfo = {
      id: trade ? trade.id : 0,
      longContractSym,
      longPrice,
      longNum,
      shortContractSym,
      shortPrice,
      shortNum,
      tradedAt: isTraded ? Math.round(tradedAt.toDate().getTime() / 1000) : 0,
    };

    onSubmit(submitTrade);
  }

  function close() {
    onCancel();
  }

  const initValues = {
    tradedAt:
      trade == null || trade.tradedAt === 0
        ? moment()
        : moment(trade.tradedAt * 1000),
    longContractSym: trade != null ? trade.longContractSym : undefined,
    longNum: trade != null ? trade.longNum : 1,
    longPrice: trade != null ? trade.longPrice : undefined,
    shortContractSym: trade != null ? trade.shortContractSym : undefined,
    shortNum: trade != null ? trade.shortNum : 1,
    shortPrice: trade != null ? trade.shortPrice : undefined,
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
      >
        <Form.Item label="是否成交" style={{ marginBottom: 10 }}>
          <Radio.Group
            options={[
              { label: "已成交", value: "yes" },
              { label: "未成交", value: "no" },
            ]}
            value={isTraded ? "yes" : "no"}
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

        <Form.Item
          label="做多合约代码"
          style={{ marginBottom: 10 }}
          name="longContractSym"
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="做多数量" style={{ marginBottom: 10 }} name="longNum">
          <Input type="number" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="做多单价"
          style={{ marginBottom: 10 }}
          name="longPrice"
        >
          <Input type="number" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="做空合约代码"
          style={{ marginBottom: 10 }}
          name="shortContractSym"
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="做空数量"
          style={{ marginBottom: 10 }}
          name="shortNum"
        >
          <Input type="number" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="做空单价"
          style={{ marginBottom: 10 }}
          name="shortPrice"
        >
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
