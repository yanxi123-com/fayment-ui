import React from "react";
import { Link } from "react-router-dom";

import css from "./Home.module.scss";
import { showInfo } from "comps/popup";

export default function () {
  return (
    <>
      <div className={css.line}>
        <Link to="/coins/" className={css.item}>
          多币种统计
        </Link>
        <Link to="/trades/" className={css.item}>
          数字币交易工具
        </Link>
        <Link to="/eos-accounts/" className={css.item}>
          EOS 多账号统计
        </Link>
      </div>
      <div className={css.line}>
        <Link
          to="/"
          className={css.item}
          onClick={() => showInfo("将于近期推出，尽情期待！")}
        >
          A股资产统计
        </Link>
        <Link to="/stock-trades/" className={css.item}>
          A股交易工具
        </Link>
        <Link
          to="/"
          className={css.item}
          onClick={() => showInfo("将于近期推出，尽情期待！")}
        >
          期货交易工具
        </Link>
      </div>
    </>
  );
}
