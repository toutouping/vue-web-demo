/**
 *  批量设置节点的拖动状态
 *  @param el 指定的元素或者元素的id，可以是字符串（设置单个节点）、数组（设置多个节点）
 *  @param status 指定节点需要被修改的拖动状态，可选值有true/false
 *  @demo
 *      setDraggable(false) - 设置全部节点为不可拖动
 *      setDraggable('xxx', true) - 设置某个节点可拖动
 *      setDraggable(['xxx', 'yyy', 'zzz'], false) - 批量设置部分节点不可拖动
 */
var setDraggable = function (instance, el, status = false) {
  if (!el) {
    return;
  }
  instance.setDraggable(el, status);
};

export default {
  setDraggable // 批量设置节点的拖动状态
};
