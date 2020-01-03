import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./Header.scss";
import logo from "./fayment.gif";

function Component() {
  return (
    <Layout.Header id="header">
      <Link className="left" to="/">
        <img src={logo} style={{ width: 143, height: 58 }} alt="Fayment" />
      </Link>

      <div className="right"></div>
    </Layout.Header>
  );
}

export default observer(Component);
