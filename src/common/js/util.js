/**
 * 获取浏览器的默认语言设置
 */
export function getLanguage () {
  let lang = navigator.language || navigator.userLanguage;

  lang = lang.substr(0, 2);
  return localStorage.getItem('web-language') || lang;
}
