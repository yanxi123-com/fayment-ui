import moment, { Moment } from "moment";

export function formatDateFriendly(d: number | string | Date) {
  const date: Date = d instanceof Date ? d : new Date(d);

  const now = new Date();
  const seconds = (now.getTime() - date.getTime()) / 1000;

  //存储转换值
  if (seconds < 60 * 5) {
    // 5分钟内
    return "刚刚";
  }
  if (seconds < 60 * 60 && seconds >= 60 * 5) {
    //超过十分钟少于1小时
    const s = Math.floor(seconds / 60);
    return s + "分钟前";
  }
  if (seconds < 60 * 60 * 24 && seconds >= 60 * 60) {
    //超过1小时少于24小时
    const s = Math.floor(seconds / 60 / 60);
    return s + "小时前";
  }
  if (seconds < 60 * 60 * 24 * 3 && seconds >= 60 * 60 * 24) {
    //超过1天少于3天内
    const s = Math.floor(seconds / 60 / 60 / 24);
    return s + "天前";
  }

  //超过3天
  return formatDate(date);
}

export function formatDate(
  d: number | string | Date | undefined | Moment
): string {
  if (d == null) {
    return "";
  }

  return moment(d).format("YYYY-MM-DD");
}

export function formatCNY(amount: number, fractionDigits?: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "JPY",
    currencyDisplay: "symbol",
    minimumFractionDigits: fractionDigits || 2,
  }).format(amount);
}

// 格式化总额，金额较大
export function formatAmount(amount: number, sym: string) {
  if (sym === "CNY") {
    return formatCNY(amount, 2);
  }
  if (sym === "USD") {
    return formatCNY(amount, 2).replace("¥", "$");
  }
  if (sym === "BTC") {
    return formatCNY(amount, 4).replace("¥", "฿");
  }

  return `${removeEndingZero(amount.toFixed(2))} ${sym}`;
}

// 格式化单价，金额较小
export function formatPrice(
  price: number,
  sym: string,
  fractionDigits?: number
) {
  if (sym === "CNY") {
    return removeEndingZero(formatCNY(price, fractionDigits || 5));
  }
  if (sym === "USD") {
    return removeEndingZero(
      formatCNY(price, fractionDigits || 5).replace("¥", "$")
    );
  }
  if (sym === "BTC") {
    return "฿" + removeEndingZero(price.toPrecision(fractionDigits || 5));
  }

  return `${removeEndingZero(price.toPrecision(fractionDigits || 5))} ${sym}`;
}

export function removeEndingZero(numStr: string) {
  if (numStr.indexOf(".") === -1) {
    return numStr;
  }
  return numStr.replace(/0+$/, "").replace(/[.]$/, "");
}
