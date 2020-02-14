import React from "react";
import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import css from "./Header.module.scss";
import logo from "./fayment2.gif";

function Component() {
  return (
    <Layout.Header className={css.header}>
      <a href="/">
        <img src={logo} style={{ width: 130 }} alt="Fayment" />
      </a>

      <div className="right"></div>
    </Layout.Header>
  );
}

export default observer(Component);
