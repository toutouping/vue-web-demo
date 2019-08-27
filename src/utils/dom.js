const dom = {
  nodeContains: function (root, el) {
    if (root.compareDocumentPosition) {
      return root === el || !!(root.compareDocumentPosition(el) & 16);
    }
    if (root.contains && el.nodeType === 1) {
      return root.contains(el) && root !== el;
    }
    while ((el = el.parentNode)) {
      if (el === root) return true;
    }
    return false;
  }
};

export default dom;
