import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
} from "antd";
import { showError } from "comps/popup";
import moment, { Moment } from "moment";
import React, { useState, useEffect } from "react";

export interface EditTradeInfo {
  id: number;
  tradedAt: number;
  tradeSym: string;
  baseSym: string;
  direction: "B" | "S";
  tradeAmount: number;
  baseAmount: number;
}

export interface ModalInfo {
  trade?: EditTradeInfo;
  onSubmit?: (trade: EditTradeInfo) => void;
}

interface Props {
  trade?: EditTradeInfo;
  allSyms: string[];
  onSubmit: (trade: EditTradeInfo) => void;
  onCancel: () => void;
}

interface FormValues {
  direction: "B" | "S";
  tradedAt: Moment;

  tradePair: string;
  tradeAmount: number | string;
  baseAmount: number | string;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 20, offset: 4 },
};

export function TradeForm(props: Props) {
  const { trade, allSyms, onSubmit, onCancel } = props;
  const [isTraded, setIsTraded] = useState(false);
  const [form] = Form.useForm();
  const [optsPair, setOptsPair] = useState<{ value: string }[]>([]);

  useEffect(() => {
    setIsTraded(trade != null && trade.tradedAt > 0);
  }, [trade]);

  function onFinish(values: { [name: string]: any }) {
    let {
      tradePair,
      direction,
      tradeAmount,
      baseAmount,
      tradedAt,
    } = values as FormValues;

    if (tradePair == null) {
      return showError("交易对不能为空");
    }
    const match = tradePair.match(/^([a-zA-Z]{1,6})[/]([a-zA-Z]{1,6})$/);
    if (!match) {
      return showError("交易对格式不正确，举例: BTC/USD");
    }
    let tradeSym = match[1].toUpperCase();
    let baseSym = match[2].toUpperCase();
    if (tradeSym.indexOf("USD") > -1) {
      tradeSym = "USD";
    }
    if (baseSym.indexOf("USD") > -1) {
      baseSym = "USD";
    }

    if (isTraded && !tradedAt) {
      return showError("请填入日期");
    }

    if (typeof tradeAmount === "string") {
      tradeAmount = parseFloat(tradeAmount);
      if (isNaN(tradeAmount)) {
        return showError("交易数量必须为数字");
      }
    }

    if (typeof baseAmount === "string") {
      baseAmount = parseFloat(baseAmount);
      if (isNaN(baseAmount)) {
        return showError("基础币数量必须为数字");
      }
    }

    const submitTrade: EditTradeInfo = {
      id: trade ? trade.id : 0,
      direction,
      tradedAt: isTraded ? Math.round(tradedAt.toDate().getTime() / 1000) : 0,
      tradeSym,
      baseSym,
      tradeAmount,
      baseAmount,
    };

    onSubmit(submitTrade);
  }

  function close() {
    onCancel();
  }

  function computeAutoOpts(text: string): { value: string }[] {
    text = text.toUpperCase();
    const result: { value: string }[] = [];
    if (text.indexOf("/") === -1) {
      const optTradeSyms = allSyms
        .map((sym) => (sym.startsWith(text) ? sym : null))
        .filter((a) => a) as string[];

      ["USD", "BTC", "EOS"].forEach((baseSym) => {
        optTradeSyms.forEach((tradeSym) => {
          if (tradeSym !== baseSym) {
            result.push({ value: `${tradeSym}/${baseSym}` });
          }
        });
      });
      return result;
    } else {
      const [tradeSym, baseSymInput] = text.split("/");
      ["USD", "BTC", "EOS"].forEach((baseSym) => {
        if (tradeSym !== baseSym && baseSym.indexOf(baseSymInput) > -1) {
          result.push({ value: `${tradeSym}/${baseSym}` });
        }
      });
    }
    return result;
  }

  const initValues = {
    tradedAt:
      trade == null || trade.tradedAt === 0
        ? moment()
        : moment(trade.tradedAt * 1000),
    direction: trade != null ? trade.direction : "B",

    tradePair: trade == null ? "" : `${trade.tradeSym}/${trade.baseSym}`,
    tradeAmount: trade == null ? undefined : trade.tradeAmount,
    tradePrice:
      trade == null
        ? undefined
        : (trade.baseAmount / trade.tradeAmount).toPrecision(5),
    baseAmount: trade == null ? undefined : trade.baseAmount,
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
        {...formItemLayout}
        form={form}
        style={{ maxWidth: 800 }}
        initialValues={initValues}
        onFinish={onFinish}
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

        <Form.Item label="方向" style={{ marginBottom: 10 }} name="direction">
          <Radio.Group
            options={[
              { label: "买入", value: "B" },
              { label: "卖出", value: "S" },
            ]}
          />
        </Form.Item>

        <Form.Item label="交易对" style={{ marginBottom: 10 }} name="tradePair">
          <AutoComplete
            options={optsPair}
            onSearch={(text: string) => {
              setOptsPair(computeAutoOpts(text));
            }}
            placeholder="请输入交易对，示例: BTC/USD"
          />
        </Form.Item>

        <Form.Item label="价格" style={{ marginBottom: 10 }} name="tradePrice">
          <Input
            type="number"
            autoComplete="off"
            onChange={(e) => {
              const tradePrice = parseFloat(e.currentTarget.value);
              const tradeAmount = parseFloat(form.getFieldValue("tradeAmount"));

              if (isNaN(tradeAmount) || isNaN(tradePrice)) {
                return;
              }
              form.setFieldsValue({
                baseAmount: (tradeAmount * tradePrice).toFixed(6),
              });
            }}
          />
        </Form.Item>

        <Form.Item label="数量" style={{ marginBottom: 10 }} name="tradeAmount">
          <Input
            type="number"
            autoComplete="off"
            onChange={(e) => {
              const tradeAmount = parseFloat(e.currentTarget.value);
              const tradePrice = parseFloat(form.getFieldValue("tradePrice"));

              if (isNaN(tradeAmount) || isNaN(tradePrice)) {
                return;
              }
              form.setFieldsValue({
                baseAmount: (tradeAmount * tradePrice).toFixed(6),
              });
            }}
          />
        </Form.Item>

        <Form.Item
          label="成交额"
          style={{ marginBottom: 10 }}
          name="baseAmount"
        >
          <Input
            type="number"
            autoComplete="off"
            onChange={(e) => {
              const baseAmount = parseFloat(e.currentTarget.value);
              const tradePrice = parseFloat(form.getFieldValue("tradePrice"));

              if (isNaN(baseAmount) || isNaN(tradePrice)) {
                return;
              }
              form.setFieldsValue({
                tradeAmount: (baseAmount / tradePrice).toFixed(6),
              });
            }}
          />
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
