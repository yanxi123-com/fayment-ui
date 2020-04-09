import React from "react";
import { Link } from "react-router-dom";

import css from "./Home.module.scss";

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
      </div>
      <div className={css.line}>
        <Link to="/stock-trades/" className={css.item}>
          A股交易工具
        </Link>
        <Link to="/eos-accounts/" className={css.item}>
          EOS 多账号统计
        </Link>
      </div>
    </>
  );
}
