import { AutoComplete, Button, DatePicker, Form, Modal, Radio } from "antd";
import { showError } from "comps/popup";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";

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

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 20, offset: 4 },
};

function parseQuantity(str: string): { amount: number; sym: string } {
  str = str.toUpperCase();
  const numPart = str.replace(/[^\d.]/g, "");
  const amount = parseFloat(numPart);
  let sym = str.substr(numPart.length).trim();
  if (sym.indexOf("USD") > -1) {
    sym = "USD";
  }
  return { amount, sym };
}

interface Props {
  trade?: EditTradeInfo;
  symPriceMap: { [sym: string]: number };
  onSubmit: (trade: EditTradeInfo) => void;
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
      // setInputBuy(`${trade.buyAmount} ${trade.buySym}`);
      // setInputSell(`${trade.sellAmount} ${trade.sellSym}`);
      if (trade.tradedAt > 0) {
        setTradeStatus("yes");
        setTradeDate(moment(trade.tradedAt * 1000));
      }
    }
  }, [trade]);

  function submit() {
    // if (!computePrice()) {
    //   showError("买入或者卖出设置有误");
    //   return;
    // }
    // const submitTrade: EditTradeInfo = {
    //   id: trade ? trade.id : 0,
    //   buySym: parseQuantity(inputBuy).sym,
    //   buyAmount: parseQuantity(inputBuy).amount,
    //   sellSym: parseQuantity(inputSell).sym,
    //   sellAmount: parseQuantity(inputSell).amount,
    //   tradedAt:
    //     tradeStatus === "yes"
    //       ? Math.round(tradeDate.toDate().getTime() / 1000)
    //       : 0,
    // };
    // onSubmit(submitTrade);
  }

  function close() {
    onCancel();
  }

  function computeAutoOpts(text: string): { value: string }[] {
    const quantity = parseQuantity(text);

    if (!quantity.amount || Number.isNaN(quantity.amount)) {
      return [];
    }

    return Object.keys(symPriceMap)
      .map((sym) => {
        if (!quantity.sym) {
          return sym;
        }
        return sym.startsWith(quantity.sym) ? sym : null;
      })
      .filter((a) => a)
      .map((a) => ({ value: `${quantity.amount} ${a}` }));
  }

  // function computePrice(): string | undefined {
  //   const buyQuantity = parseQuantity(inputBuy);
  //   const sellQuantity = parseQuantity(inputSell);
  //   if (
  //     !buyQuantity.amount ||
  //     !sellQuantity.amount ||
  //     isNaN(buyQuantity.amount) ||
  //     isNaN(sellQuantity.amount)
  //   ) {
  //     return;
  //   }

  //   const baseSym = getBaseSym(symPriceMap, buyQuantity.sym, sellQuantity.sym);

  //   if (baseSym === buyQuantity.sym) {
  //     return `${(buyQuantity.amount / sellQuantity.amount).toPrecision(5)} ${
  //       buyQuantity.sym
  //     }/${sellQuantity.sym}`;
  //   }

  //   return `${(sellQuantity.amount / buyQuantity.amount).toPrecision(5)} ${
  //     sellQuantity.sym
  //   }/${buyQuantity.sym}`;
  // }

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
      <Form {...formItemLayout} style={{ maxWidth: 800 }}>
        <Form.Item label="是否成交" style={{ marginBottom: 10 }}>
          <Radio.Group
            options={[
              { label: "已成交", value: "yes" },
              { label: "未成交", value: "no" },
            ]}
            onChange={(e) => setTradeStatus(e.target.value)}
            value={tradeStatus}
          />
        </Form.Item>
        {tradeStatus === "yes" && (
          <Form.Item label="成交日期" style={{ marginBottom: 10 }}>
            <DatePicker
              value={tradeDate}
              onChange={(day) => {
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
          {/* <>{computePrice() || "根据买入和卖出值自动计算"}</> */}
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
