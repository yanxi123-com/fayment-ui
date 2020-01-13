import React from "react";
import { Menu, Layout } from "antd";
import qrcode from "./qrcode_cfms.jpg";

import { withRouter, RouteComponentProps } from "react-router-dom";

const { Sider } = Layout;

export default withRouter(SiderComp);

interface Props extends RouteComponentProps {}

function SiderComp(props: Props) {
  const { history, location } = props;

  function handleClick(e: any) {
    history.push(`/${e.key}/`);
  }

  const current = location.pathname.split("/")[1];

  return (
    <Sider width={160} style={{ background: "#fff", minHeight: 500 }}>
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        selectedKeys={[current]}
        onClick={handleClick}
      >
        <Menu.Item key="eos-accounts" style={{ fontWeight: 600 }}>
          EOS 多账号统计
        </Menu.Item>
        <div
          style={{ margin: 15, border: "1px solid #CCC", padding: "15px 15px" }}
        >
          <img alt="" src={qrcode} style={{ width: "100%" }} />
          <div style={{ lineHeight: 1.5, textAlign: "center" }}>
            微信扫一扫
            <br />
            关注公众号
            <br />
            财富秘书
          </div>
        </div>
      </Menu>
    </Sider>
  );
}
