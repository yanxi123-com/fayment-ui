import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { observer } from "mobx-react-lite";
import css from "./Header.module.scss";
import logo from "./fayment2.gif";
import { openPopupForm } from "comps/PopupForm";
import { BaseFieldSchema, globalContext } from "stores/GlobalStore";
import { httpPost } from "lib/apiClient";

function Component() {
  const globalStore = useContext(globalContext);

  function login() {
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
      onSubmit: (data: { [key: string]: any }) => {
        const { email, pwd } = data;
        if (!email || !pwd) {
          throw new Error("请输入 Email 和密码");
        }

        return httpPost("login", {
          email: data.email,
          pwd: data.pwd
        }).then(({ token }) => {
          globalStore.setLoginInfo(email, token);
        });
      }
    });
  }

  function register() {
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
          globalStore.setLoginInfo(email, token);
        });
      }
    });
  }

  return (
    <Layout.Header className={css.header}>
      <a href="/">
        <img src={logo} style={{ width: 130 }} alt="Fayment" />
      </a>
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
            <Button type="link" onClick={() => globalStore.logout()}>
              退出
            </Button>
          </>
        )}
      </div>
    </Layout.Header>
  );
}

export default observer(Component);
