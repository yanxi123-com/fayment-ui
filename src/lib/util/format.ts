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

  return `${amount.toFixed(2).replace(/0+$/, "").replace(/[.]$/, "")} ${sym}`;
}

// 格式化单价，金额较小
export function formatPrice(price: number, sym: string) {
  if (sym === "CNY") {
    return formatCNY(price, 5).replace(/0+$/, "").replace(/[.]$/, "");
  }
  if (sym === "USD") {
    return formatCNY(price, 5)
      .replace("¥", "$")
      .replace(/0+$/, "")
      .replace(/[.]$/, "");
  }
  if (sym === "BTC") {
    return "฿" + price.toPrecision(5);
  }

  return `${price.toPrecision(5)} ${sym}`;
}
