/**
 *  批量设置节点的拖动状态
 *  @param el 指定的元素或者元素的id，可以是字符串（设置单个节点）、数组（设置多个节点）
 *  @param status 指定节点需要被修改的拖动状态
 *  @demo
 *      draggable('xxx', true) - 设置某个节点可拖动
 *      draggable(['xxx', 'yyy', 'zzz'], false) - 批量设置部分节点不可拖动
 */
var draggable = function (instance, el, status = true) {
  if (!el) {
    return;
  }
  instance.draggable(el, status);
};

export default {
  draggable // 批量设置节点的拖动状态
};
