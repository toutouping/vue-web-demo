import {jsPlumb} from 'jsplumb';
import lodash from 'lodash';
// import $ from 'jquery';
import nodeMenu from './node-menu/node-menu.vue';
import node from './node.vue';
import flowUtils from './utils/flow.js';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
    node,
    nodeMenu
  },
  data () {
    return {
      jsPlumbInstance: null,
      data: {
        nodeList: [],
        lineList: []
      },
      // 默认设置参数
      jsplumbSetting: {
                // 动态锚点、位置自适应
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
        Container: 'flowContainer',
                // 连线的样式 StateMachine、Flowchart
        Connector: 'Flowchart',
                // 鼠标不能拖动删除线
        ConnectionsDetachable: false,
                // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
                // 连线的端点
                // Endpoint: ["Dot", {radius: 5}],
        Endpoint: ['Rectangle', {height: 10, width: 10}],
                // 线端点的样式
        EndpointStyle: {fill: 'rgba(255,255,255,0)', outlineWidth: 1},
        LogEnabled: true, // 是否打开jsPlumb的内部日志记录
                // 绘制线
        PaintStyle: {stroke: 'black', strokeWidth: 3},
                // 绘制箭头
        Overlays: [['Arrow', {width: 12, length: 12, location: 1}]],
        RenderMode: 'svg'
      },
      jsplumbSourceOptions: {
        /* "span"表示标签，".className"表示类，"#id"表示元素id */
        filter: '.flow-node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      },
      jsplumbTargetOptions: {
        /* "span"表示标签，".className"表示类，"#id"表示元素id */
        filter: '.flow-node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      }
    };
  },
  created () {
  },
  mounted () {
    const ths = this;

    // 获取jsPlumb的实例
    ths.jsPlumbInstance = jsPlumb.getInstance();
    // 导入默认配置
    ths.jsPlumbInstance.importDefaults(ths.jsplumbSetting);
  },
  computed: {
  },
  methods: {
    // 返回唯一标识
    getUUID () {
      return Math.random().toString(36).substr(3, 10);
    },
    // 改变节点的位置
    changeNodeSite (data) {
      console.log('-------------flow-template.js 改变节点的位置changeNodeSite begin---------');
      console.log(data);
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i];

        if (node.id === data.nodeId) {
          node.left = data.left;
          node.top = data.top;
        }
      }
      console.log('-------------flow-template.js 改变节点的位置changeNodeSite end---------');
    },

    /**
     * 拖拽结束后添加新的节点
     * @param evt
     * @param nodeMenu 被添加的节点对象
     * @param mousePosition 鼠标拖拽结束的坐标
     */
    addNodeFn (evt, nodeMenu, mousePosition) {
      console.log('-------------flow-template.js addNodeFn begin---------');
      console.log(evt, nodeMenu, mousePosition);
      let width = this.$refs.nodeMenu.$el.clientWidth;
      let nodeId = this.getUUID();
      let left = mousePosition.left;
      let top = mousePosition.top;

      if (left < 0) {
        left = evt.originalEvent.layerX - width;
      }
      if (top < 0) {
        top = evt.originalEvent.clientY - 50;
      }
      var node = {
        id: nodeId,
        name: nodeId,
        left: left + 'px',
        top: top + 'px',
        ico: nodeMenu.ico,
        show: true
      };

      console.log('生成新的node：');
      console.log(node);
      // 这里可以进行业务判断、是否能够添加该节点
      this.data.nodeList.push(node);
      this.$nextTick(function () {
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumbInstance.makeSource(nodeId, this.jsplumbSourceOptions);
        // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumbInstance.makeTarget(nodeId, this.jsplumbTargetOptions);
        // this.jsPlumbInstance.draggable(nodeId, {
        //   containment: 'parent'
        // });
        flowUtils.setDraggable(this.jsPlumbInstance, nodeId, false);
      });
      console.log('-------------flow-template.js addNodeFn end---------');
    },
    // 加载流程图
    loadEasyFlow () {
      console.log('-------------flow-template.js 加载流程图 loadEasyFlow begin---------');
      const tempLineList = this.data.lineList || [];
      const tempNodeList = this.data.nodeList || [];

      // 初始化节点
      for (let i = 0; i < tempNodeList.length; i++) {
        const node = tempNodeList[i];

        // 设置源点，可以拖出线连接其他节点
        this.jsPlumbInstance.makeSource(node.id, this.jsplumbSourceOptions);
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumbInstance.makeTarget(node.id, this.jsplumbTargetOptions);

        // this.jsPlumb.draggable(node.id, {
        //   containment: 'parent'
        // });
        flowUtils.setDraggable(this.jsPlumbInstance, node.id, true);
      }

      // 初始化连线
      for (let i = 0; i < tempLineList.length; i++) {
        const line = tempLineList[i];

        this.jsPlumbInstance.connect({
          source: line.from,
          target: line.to
        }, this.jsplumbConnectOptions);
      }
      console.log('-------------flow-template.js 加载流程图 loadEasyFlow end---------');
    }
  }
};
