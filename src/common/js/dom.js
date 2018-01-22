/**
 * 操作DOM元素
 */
let collection = {
  /**
   * 判断是否包含某class样式
   * @param {元素} el
   * @param {样式名} className
   */
  hasClass (el, className) {
    let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return reg.test(el.className);
  }
}

export default collection;
