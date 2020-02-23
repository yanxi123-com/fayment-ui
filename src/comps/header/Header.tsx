import React, { useContext } from "react";
import { Layout, Button, Icon } from "antd";
import { observer } from "mobx-react-lite";
import css from "./Header.module.scss";
import logo from "./fayment2.gif";
import { openPopupForm } from "comps/PopupForm";
import {
  BaseFieldSchema,
  globalContext,
  globalStore
} from "stores/GlobalStore";
import { httpPost } from "lib/apiClient";
import { getCurrentTitle } from "comps/sider/Sider";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import FriendlyDate from "../FriendlyDate";

interface Props extends RouteComponentProps {}

function afterLogin(email: string, token: string) {
  globalStore.setLoginInfo(email, token);
  window.location.reload();
}

export function login() {
  const fields: Array<BaseFieldSchema> = [
    {
      type: "text",
      key: "email",
      title: "Email",
      placeholder: "请输入你的 Email",
      defaultValue: ""
    },
    {
      type: "password",
      key: "pwd",
      title: "密码",
      placeholder: "请设置密码"
    }
  ];

  openPopupForm({
    title: "用户登录",
    labelSpan: 2,
    fields,
    onSubmit: async (data: { [key: string]: any }) => {
      const { email, pwd } = data;
      if (!email || !pwd) {
        throw new Error("请输入 Email 和密码");
      }

      return httpPost("login", {
        email: data.email,
        pwd: data.pwd
      }).then(({ token }) => {
        afterLogin(email, token);
      });
    },
    extraNode: (
      <>
        <div className={css.extra}>
          <Button type="link" onClick={() => register()}>
            没有注册过? 10 秒快速注册
          </Button>
        </div>
      </>
    )
  });
}

export function register() {
  const fields: Array<BaseFieldSchema> = [
    {
      type: "text",
      key: "email",
      title: "Email",
      placeholder: "请输入你的 Email",
      defaultValue: ""
    },
    {
      type: "password",
      key: "pwd",
      title: "密码",
      placeholder: "请设置密码"
    },
    {
      type: "password",
      key: "pwd2",
      title: "重输密码",
      placeholder: "请输入持有数量",
      defaultValue: ""
    }
  ];

  openPopupForm({
    title: "注册新用户",
    labelSpan: 4,
    fields,
    onSubmit: async (data: { [key: string]: any }) => {
      const { email, pwd, pwd2 } = data;
      if (!email || !pwd) {
        throw new Error("请输入 Email 和密码");
      }
      if (pwd !== pwd2) {
        throw new Error("两次密码输入不同");
      }

      return httpPost("register", {
        email: data.email,
        pwd: data.pwd
      }).then(({ token }) => {
        afterLogin(email, token);
      });
    },
    extraNode: (
      <>
        <div className={css.extra}>
          <Button type="link" onClick={() => login()}>
            已经注册过，直接登录
          </Button>
        </div>
      </>
    )
  });
}

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
          {getCurrentTitle(props.location) || "区块链资产统计"}
        </div>
        <div className={css.tips}>
          {user && currentGroupsVersion && (
            <>
              {currentGroupsVersion.currentVersion ===
                currentGroupsVersion.cloudVersion &&
                currentGroupsVersion.cloudUpdatedAt && (
                  <>
                    <Icon type="check" /> 上次同步时间:&nbsp;
                    <FriendlyDate date={currentGroupsVersion.cloudUpdatedAt} />
                  </>
                )}
              {currentGroupsVersion.currentVersion !==
                currentGroupsVersion.cloudVersion && "正在同步到云端..."}
            </>
          )}
        </div>
      </div>

      <div className={css.right}>
        {!globalStore.user && (
          <>
            <Button type="link" onClick={login}>
              登录
            </Button>
            <Button type="link" onClick={register}>
              注册
            </Button>
          </>
        )}

        {globalStore.user && (
          <>
            <b>{globalStore.user.email}</b>
            <Button
              type="link"
              onClick={() => {
                window.location.reload();
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
