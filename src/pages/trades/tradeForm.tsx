import { AutoComplete, Button, DatePicker, Form, Modal, Radio } from "antd";
import moment, { Moment } from "moment";
import React, { useState, useEffect } from "react";
import { showError } from "comps/popup";

export interface TradeInfo {
  tradeDate: string | undefined; // 如果空表示交易计划，非空表示已成交
  buy: string; // 100 EOS
  sell: string; // 1000 USD
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const tailFormItemLayout = {
  wrapperCol: { span: 20, offset: 4 }
};

const symOrder = ["USD", "BTC", "ETH", "BNB", "HT", "EOS"];

function parseAmount(str: string): [number, string] {
  str = str.toUpperCase();
  const numPart = str.replace(/[^\d.]/g, "");
  return [parseFloat(numPart), str.substr(numPart.length).trim()];
}

function formatAmount(str: string): string {
  const [n, s] = parseAmount(str);
  return `${n} ${s}`;
}

interface Props {
  trade?: TradeInfo;
  symPriceMap: { [sym: string]: number };
  onSubmit: (trade: TradeInfo) => void;
  onCancel: () => void;
}

type TradeStatus = "yes" | "no";

export function TradeForm(props: Props) {
  const { trade, symPriceMap, onSubmit, onCancel } = props;
  const [tradeStatus, setTradeStatus] = useState<TradeStatus>("no");
  const [inputBuy, setInputBuy] = useState("");
  const [inputSell, setInputSell] = useState("");
  const [optsBuy, setOptsBuy] = useState<{ value: string }[]>([]);
  const [optsSell, setOptsSell] = useState<{ value: string }[]>([]);
  const [tradeDate, setTradeDate] = useState<Moment>(moment());

  useEffect(() => {
    if (trade) {
      setInputBuy(trade.buy);
      setInputSell(trade.sell);
      if (trade.tradeDate) {
        setTradeStatus("yes");
        setTradeDate(moment(trade.tradeDate));
      }
    }
  }, [trade]);

  function submit() {
    if (!computePrice()) {
      showError("买入或者卖出设置有误");
      return;
    }
    const trade: TradeInfo = {
      tradeDate: tradeStatus === "yes" ? tradeDate.format() : undefined,
      buy: formatAmount(inputBuy),
      sell: formatAmount(inputSell)
    };
    onSubmit(trade);
  }

  function close() {
    onCancel();
  }

  function computeAutoOpts(text: string): { value: string }[] {
    const [numPart, symPart] = parseAmount(text);

    if (!numPart || Number.isNaN(numPart)) {
      return [];
    }

    return Object.keys(symPriceMap)
      .map(sym => {
        if (!symPart) {
          return sym;
        }
        return sym.startsWith(symPart) ? sym : null;
      })
      .filter(a => a)
      .map(a => ({ value: `${numPart} ${a}` }));
  }

  function compareSym(s1: string, s2: string) {
    // 法币优先
    if (s1.indexOf("USD") > -1) {
      return -1;
    }

    if (s2.indexOf("USD") > -1) {
      return 1;
    }

    // 按照 symOrder 的顺序
    const s1order = symOrder.indexOf(s1);
    const s2order = symOrder.indexOf(s2);
    if (s1order > -1 && s2order > -1) {
      return s1order - s2order;
    }
    if (s1order > -1) {
      return -1;
    }
    if (s2order > -1) {
      return 1;
    }

    // 按照价格
    const s1price = symPriceMap[s1];
    const s2price = symPriceMap[s2];
    if (s1price && s2price) {
      return symPriceMap[s2] - symPriceMap[s1];
    }
    if (s1price) {
      return -1;
    }
    if (s2price) {
      return 1;
    }
    return 0;
  }

  function getBaseSym(...syms: string[]) {
    return syms.sort(compareSym)[0];
  }

  function computePrice(): string | undefined {
    const [num1, sym1] = parseAmount(inputBuy);
    const [num2, sym2] = parseAmount(inputSell);
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
      return;
    }

    const baseSym = getBaseSym(sym1, sym2);

    if (baseSym === sym1) {
      return `${(num1 / num2).toPrecision(5)} ${sym1}/${sym2}`;
    }

    return `${(num2 / num1).toPrecision(5)} ${sym2}/${sym1}`;
  }

  return (
    <Modal
      width={600}
      visible
      title={trade == null ? "添加记录" : "修改记录"}
      onCancel={close}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <Form {...formItemLayout} style={{ maxWidth: 800 }}>
        <Form.Item label="是否成交" style={{ marginBottom: 10 }}>
          <Radio.Group
            options={[
              { label: "已成交", value: "yes" },
              { label: "未成交", value: "no" }
            ]}
            onChange={e => setTradeStatus(e.target.value)}
            value={tradeStatus}
          />
        </Form.Item>
        {tradeStatus === "yes" && (
          <Form.Item label="成交日期" style={{ marginBottom: 10 }}>
            <DatePicker
              value={tradeDate}
              onChange={day => {
                if (day) {
                  setTradeDate(day);
                }
              }}
            />
          </Form.Item>
        )}
        <Form.Item label="买入" style={{ marginBottom: 10 }}>
          <AutoComplete
            value={inputBuy}
            options={optsBuy}
            onChange={(value: string) => {
              setInputBuy(value);
            }}
            onSearch={(text: string) => {
              setOptsBuy(computeAutoOpts(text));
            }}
            placeholder="请输入币种和数量，示例: 0.5 BTC"
          ></AutoComplete>
        </Form.Item>
        <Form.Item label="卖出" style={{ marginBottom: 10 }}>
          <AutoComplete
            value={inputSell}
            options={optsSell}
            onChange={(value: string) => {
              setInputSell(value);
            }}
            onSearch={(text: string) => {
              setOptsSell(computeAutoOpts(text));
            }}
            placeholder="请输入币种和数量，示例: 5000 USD"
          ></AutoComplete>
        </Form.Item>
        <Form.Item label="单价" style={{ marginBottom: 10 }}>
          <>{computePrice() || "根据买入和卖出值自动计算"}</>
        </Form.Item>

        <Form.Item {...tailFormItemLayout} style={{ marginBottom: 10 }}>
          <Button type="primary" onClick={submit}>
            确定
          </Button>
          <Button onClick={close}>取消</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
