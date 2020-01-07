export default {
  props: {
    node: Object
  },
  data () {
    return {
      // 控制节点操作显示
      mouseEnter: false
    };
  },
  computed: {
    // 节点容器样式
    nodeContainerStyle () {
      return {
        position: 'absolute',
        left: this.node.x,
        top: this.node.y
      };
    },
    nodeIcoClass () {
      var nodeIcoClass = {};

      nodeIcoClass[this.node.ico] = true;
        // 添加该class可以推拽连线出来
      nodeIcoClass['flow-node-drag'] = true;
      return nodeIcoClass;
    }
  },
  methods: {
    // 删除节点
    deleteNode () {
      this.$emit('deleteNode', this.node.id);
    },
    // 编辑节点
    editNode () {
      this.$emit('editNode', this.node.id);
    },
    // 鼠标移动后抬起
    changeNodePosition () {
      // 避免抖动
      if (this.node.x === this.$refs.node.style.left && this.node.y === this.$refs.node.style.top) {
        return;
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        x: this.$refs.node.style.left,
        y: this.$refs.node.style.top
      });
    }
  }
};
