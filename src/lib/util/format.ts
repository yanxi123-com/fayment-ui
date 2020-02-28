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
