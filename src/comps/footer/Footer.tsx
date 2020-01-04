import React from "react";
import css from "./Footer.module.scss";

const Comopnent: React.FC = () => {
  return (
    <div className={css.footer}>
      <a href="https://fayment.com/">Fayment.com</a> &copy; 2020
    </div>
  );
};

export default Comopnent;
