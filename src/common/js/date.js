export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) { // 年份
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _pageLeftZero(str));
    }
  }
  return fmt;
};

function _pageLeftZero(str) {
  return ("00" + str).substr(str.length);
}
