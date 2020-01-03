import React from "react";
import { Menu, Layout } from "antd";

import { withRouter, RouteComponentProps } from "react-router-dom";

const { Sider } = Layout;

export default withRouter(SiderComp);

interface Props extends RouteComponentProps {}

function SiderComp(props: Props) {
  const { history, location } = props;

  function handleClick(e: any) {
    history.push(`/${e.key}`);
  }

  const current = location.pathname.split("/")[1];

  return (
    <Sider
      width={160}
      style={{ background: "#fff", paddingTop: 20, minHeight: 500 }}
    >
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        selectedKeys={[current]}
        onClick={handleClick}
      >
        <Menu.Item key="eos-accounts">EOS 多账号管理</Menu.Item>
      </Menu>
    </Sider>
  );
}
