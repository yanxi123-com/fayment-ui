import "./App.css";
import "antd/dist/antd.css";

import { Layout } from "antd";
import Footer from "comps/footer/Footer";
import Header from "comps/header/Header";
import PopupForm from "comps/PopupForm";
import Sider from "comps/sider/Sider";
import { observer } from "mobx-react-lite";
import EosAccounts from "pages/eosAccounts/EosAccounts";
import Coins from "pages/coins/Coins";
import Home from "pages/home/Home";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Header />
        <PopupForm />
        <Layout>
          <Sider />
          <Layout.Content
            style={{
              padding: "0px 30px 24px",
              borderLeft: "1px solid #e8e8e8"
            }}
          >
            <Switch>
              <Route exact path="/eos-accounts/" component={EosAccounts} />
              <Route exact path="/coins/" component={Coins} />
              <Route exact path="/" component={Home} />

              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
        <Footer />
      </Layout>
    </Router>
  );
};

export default observer(App);
