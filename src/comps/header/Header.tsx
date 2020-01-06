import React from "react";
import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import "./Header.scss";
import logo from "./fayment.gif";

function Component() {
  return (
    <Layout.Header id="header">
      <a href="https://fayment.com/">
        <img src={logo} style={{ width: 143, height: 58 }} alt="Fayment" />
      </a>

      <div className="right"></div>
    </Layout.Header>
  );
}

export default observer(Component);
