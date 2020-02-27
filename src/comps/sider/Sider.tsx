import React from "react";
import { Menu, Layout } from "antd";
import qrcode from "./qrcode_cfms.jpg";
import { trackPageview } from "lib/gtag";
import { Location } from "history";

import { withRouter, RouteComponentProps } from "react-router-dom";

const { Sider } = Layout;

export default withRouter(SiderComp);

interface Props extends RouteComponentProps {}

const keyTitleMap: { [key: string]: string } = {
  coins: "多币种统计",
  trades: "交易记录＆计划",
  "eos-accounts": "EOS 多账号统计"
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
        {Object.keys(keyTitleMap).map(key => (
          <Menu.Item key={key}>{keyTitleMap[key]}</Menu.Item>
        ))}

        <div
          style={{
            margin: "30px 15px",
            border: "1px solid #CCC",
            padding: "15px 15px"
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
