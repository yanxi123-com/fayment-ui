import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import { showError } from "comps/popup";
import moment, { Moment } from "moment";
import React, { useState } from "react";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 20, offset: 4 },
};

// 用于编辑平仓信息
export interface CloseTradeInfo {
  id: number;
  closeAt: number;
  closePrice: number;
}

interface FormValues {
  closeAt: Moment;
  closePrice: number;
}

export interface CloseModalInfo {
  trade?: CloseTradeInfo;
  onSubmit?: (trade: CloseTradeInfo) => void;
}

interface TradeProps {
  trade: CloseTradeInfo;
  onSubmit: (trade: CloseTradeInfo) => void;
  onCancel: () => void;
}

export function CloseTradeForm(props: TradeProps) {
  const { trade, onSubmit, onCancel } = props;
  const [isTradeClosed, setIsTradeClosed] = useState(true);
  const [form] = Form.useForm();

  function onFinish(values: { [name: string]: any }) {
    const { closeAt, closePrice } = values as FormValues;

    if (isTradeClosed && !closeAt) {
      return showError("请填入日期");
    }

    if (isTradeClosed && !closePrice) {
      return showError("平仓单价不能为空");
    }

    const submitTrade: CloseTradeInfo = {
      id: trade.id,
      closePrice,
      closeAt: isTradeClosed
        ? Math.round(closeAt.toDate().getTime() / 1000)
        : 0,
    };

    onSubmit(submitTrade);
  }

  function close() {
    onCancel();
  }

  const initValues = {
    closeAt: trade.closeAt === 0 ? moment() : moment(trade.closeAt * 1000),
    closePrice: trade.closePrice || undefined,
  };

  return (
    <Modal
      width={600}
      visible
      title="平仓信息"
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
        <Form.Item label="是否平仓" style={{ marginBottom: 10 }}>
          <Radio.Group
            options={[
              { label: "未平仓", value: "no" },
              { label: "已平仓", value: "yes" },
            ]}
            value={isTradeClosed ? "yes" : "no"}
            onChange={(e) => {
              setIsTradeClosed(e.target.value === "yes");
            }}
          />
        </Form.Item>

        {isTradeClosed && (
          <Form.Item
            label="平仓日期"
            style={{ marginBottom: 10 }}
            name="closeAt"
          >
            <DatePicker />
          </Form.Item>
        )}

        {isTradeClosed && (
          <Form.Item
            label="平仓单价"
            style={{ marginBottom: 10 }}
            name="closePrice"
          >
            <Input type="number" autoComplete="off" />
          </Form.Item>
        )}

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
