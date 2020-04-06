import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { showError } from "comps/popup";

import { LoginReq } from "proto/user_pb";
import React, { useState } from "react";
import { globalStore, getAuthMD } from "stores/GlobalStore";

import css from "./Login.module.scss";
import { userService } from "lib/grpcClient";
import { handleGrpcError } from "lib/util/grpcUtil";
import { useHistory, useLocation } from "react-router";
import querystring from "querystring";

export default function () {
  const [mode, setMode] = useState<"login" | "register">("login");
  const history = useHistory();
  const location = useLocation();

  function afterLogin(email: string, token: string) {
    globalStore.setLoginInfo(email, token);

    if (location.search) {
      const rd = querystring.parse(location.search.substr(1)).rd;

      if (typeof rd === "string") {
        history.replace(rd);
      }
    } else {
      history.replace("/");
    }
  }

  function handleSubmit(values: any) {
    if (mode === "login") {
      const req = new LoginReq();
      req.setEmail(values.email);
      req.setPassword(values.password);
      userService
        .login(req, getAuthMD())
        .then((res) => {
          afterLogin(res.getEmail(), res.getToken());
        })
        .catch(handleGrpcError)
        .catch(showError);
    } else if (mode === "register") {
      if (values.password !== values.passwordRepeat) {
        showError("两次密码输入不同");
        return;
      }

      const req = new LoginReq();
      req.setEmail(values.email);
      req.setPassword(values.password);
      return userService
        .register(req)
        .then((res) => {
          afterLogin(res.getEmail(), res.getToken());
        })
        .catch(handleGrpcError)
        .catch(showError);
    }
  }

  return (
    <div className={css.login}>
      <div className={css.header}>{mode === "login" ? "登录" : "注册"}</div>

      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "请输入 Email" },
            { type: "email", message: "请输入正确的 Email" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            size="large"
            placeholder="Email 地址"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入登录密码" },
            { min: 6, message: "密码不能低于6位" },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            size="large"
            type="password"
            placeholder="密码"
            autoComplete="on"
          />
        </Form.Item>
        {mode === "register" && (
          <Form.Item
            name="passwordRepeat"
            rules={[{ required: true, message: "请再次输入密码" }]}
          >
            <Input
              prefix={<LockOutlined />}
              size="large"
              type="password"
              placeholder="再次输入密码"
              autoComplete="on"
            />
          </Form.Item>
        )}
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className={css.formButton}
        >
          {mode === "login" ? "登录" : "注册"}
        </Button>
      </Form>

      <div className={css.footer}>
        <Button
          type="link"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
          }}
        >
          {mode === "login"
            ? "没有注册过? 10 秒快速注册"
            : "已经注册过，直接登录"}
        </Button>
      </div>
    </div>
  );
}
