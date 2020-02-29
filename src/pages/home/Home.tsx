import React from "react";
import { Link } from "react-router-dom";

import css from "./Home.module.scss";

export default function() {
  return (
    <div className={css.main}>
      <Link to="/coins/" className={css.item}>
        多币种统计
      </Link>
      <Link to="/trades/" className={css.item}>
        交易监控＆计划
      </Link>
      <Link to="/eos-accounts/" className={css.item}>
        EOS 多账号统计
      </Link>
    </div>
  );
}
