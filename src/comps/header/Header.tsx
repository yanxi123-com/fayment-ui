import { CheckOutlined } from "@ant-design/icons";
import { Button, Layout, Tooltip } from "antd";
import { getCurrentTitle } from "comps/sider/Sider";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { globalContext } from "stores/GlobalStore";

import FriendlyDate from "../FriendlyDate";
import logo from "./fayment2.gif";
import css from "./Header.module.scss";

interface Props extends RouteComponentProps {}

function Component(props: Props) {
  const globalStore = useContext(globalContext);
  const { user, currentGroupsVersion } = globalStore;

  return (
    <Layout.Header className={css.header}>
      <div className={css.left}>
        <Link to="/">
          <img src={logo} style={{ width: 130 }} alt="Fayment" />
        </Link>
        <div className={css.title}>
          {getCurrentTitle(props.location) || "资产统计和交易工具"}
        </div>
        <div className={css.tips}>
          {user && currentGroupsVersion && (
            <>
              {currentGroupsVersion.currentVersion ===
                currentGroupsVersion.cloudVersion &&
                currentGroupsVersion.cloudUpdatedAt && (
                  <Tooltip
                    placement="bottom"
                    title="所有修改都会自动保存到云端"
                  >
                    <>
                      <CheckOutlined style={{ marginRight: 5 }} />
                      <span className={css.text}>
                        上次修改时间:&nbsp;
                        <FriendlyDate
                          date={currentGroupsVersion.cloudUpdatedAt}
                        />
                      </span>
                    </>
                  </Tooltip>
                )}
              {currentGroupsVersion.currentVersion !==
                currentGroupsVersion.cloudVersion && "正在同步到云端..."}
            </>
          )}
        </div>
      </div>

      <div className={css.right}>
        {!globalStore.user && <Link to="/login">登录 / 注册</Link>}

        {globalStore.user && (
          <>
            <b>{globalStore.user.email}</b>
            <Button
              type="link"
              onClick={() => {
                globalStore.logout();
              }}
            >
              退出
            </Button>
          </>
        )}
      </div>
    </Layout.Header>
  );
}

export default withRouter(observer(Component));
