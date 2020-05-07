import { Layout, Menu } from "antd";
import { Location } from "history";
import { trackPageview } from "lib/gtag";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import qrcode from "./qrcode_cfms.jpg";

const { Sider } = Layout;

export default withRouter(SiderComp);

interface Props extends RouteComponentProps {}

const keyTitleMap: { [key: string]: string } = {
  coins: "多币种统计",
  trades: "数字币交易工具",
  stocks: "A股资产统计",
  "stock-trades": "A股交易工具",
  "futures-trades": "期货交易工具",
  "eos-accounts": "EOS 多账号统计",
  tools: "网格交易工具",
  "futures-arbitrages": "期货套利工具",
};

function getCurrentKey(location: Location) {
  return location.pathname.split("/")[1];
}

export function getCurrentTitle(location: Location) {
  return keyTitleMap[getCurrentKey(location)];
}

function SiderComp(props: Props) {
  const { history, location } = props;

  function handleClick(e: any) {
    const path = `/${e.key}/`;
    trackPageview(path);
    history.push(path);
  }

  return (
    <Sider width={160} style={{ background: "#fff", minHeight: 500 }}>
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        selectedKeys={[getCurrentKey(location)]}
        onClick={handleClick}
      >
        <Menu.ItemGroup key="digitalCurrency" title="数字货币">
          {["coins", "trades", "eos-accounts"].map((key) => (
            <Menu.Item key={key}>{keyTitleMap[key]}</Menu.Item>
          ))}
        </Menu.ItemGroup>

        <Menu.ItemGroup key="cnyAssets" title="人民币资产">
          {[
            "stocks",
            "stock-trades",
            "futures-trades",
            "futures-arbitrages",
          ].map((key) => (
            <Menu.Item key={key}>{keyTitleMap[key]}</Menu.Item>
          ))}
        </Menu.ItemGroup>

        <Menu.ItemGroup key="tools" title="工具箱">
          {["tools"].map((key) => (
            <Menu.Item key={key}>{keyTitleMap[key]}</Menu.Item>
          ))}
        </Menu.ItemGroup>

        <div
          style={{
            margin: "30px 15px",
            border: "1px solid #CCC",
            padding: "15px 15px",
          }}
        >
          <img alt="" src={qrcode} style={{ width: "100%" }} />
          <div style={{ lineHeight: 1.5, textAlign: "center" }}>
            微信扫一扫
            <br />
            关注&nbsp;
            <span style={{ fontWeight: 600, color: "#6a9fb5", fontSize: 16 }}>
              阎说
            </span>
          </div>
        </div>
      </Menu>
    </Sider>
  );
}
