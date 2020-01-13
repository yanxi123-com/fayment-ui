import React from "react";
import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import css from "./Header.module.scss";
import imgCfms from "./cfms.png";

function Component() {
  return (
    <Layout.Header className={css.header}>
      {/* <a href="https://fayment.com/">
        <img src={logo} style={{ width: 143, height: 58 }} alt="Fayment" />
      </a> */}

      <img className={css.cfms} src={imgCfms} alt="" />

      <div className="right"></div>
    </Layout.Header>
  );
}

export default observer(Component);
