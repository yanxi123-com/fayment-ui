export function formatDateFriendly(date: number | string | Date) {
  if (typeof date === "string") {
    date = new Date();
  }

  if (date instanceof Date) {
    date = date.getTime();
  }

  const now = new Date();
  const seconds = (now.getTime() - date) / 1000;

  //存储转换值
  if (seconds < 60 * 5) {
    // 5分钟内
    return "刚刚";
  } else if (seconds < 60 * 60 && seconds >= 60 * 10) {
    //超过十分钟少于1小时
    const s = Math.floor(seconds / 60);
    return s + "分钟前";
  } else if (seconds < 60 * 60 * 24 && seconds >= 60 * 60) {
    //超过1小时少于24小时
    const s = Math.floor(seconds / 60 / 60);
    return s + "小时前";
  } else if (seconds < 60 * 60 * 24 * 3 && seconds >= 60 * 60 * 24) {
    //超过1天少于3天内
    const s = Math.floor(seconds / 60 / 60 / 24);
    return s + "天前";
  } else {
    //超过3天
    return now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
  }
}
