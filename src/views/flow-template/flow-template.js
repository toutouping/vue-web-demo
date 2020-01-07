import {jsPlumb} from 'jsplumb';
import $ from 'jquery';
import './utils/flow.js';
import nodeMenu from './node-menu/node-menu.vue';
import node from './node/node.vue';
import draggable from 'vuedraggable';

const ENDPOINT_DIRECTION = ['Top', 'Left', 'Right', 'Bottom'];

export default {
  components: {
    draggable,
    node,
    nodeMenu
  },
  data () {
    return {
      dataFlowInstance: null,
      data: {
        nodeList: [],
        lineList: []
      },
      isEdit: true,
      opts: {
        canvas: '#flow-contain', // 画布
        locationConfig: {
          start: ENDPOINT_DIRECTION,
          end: ENDPOINT_DIRECTION,
          task: ENDPOINT_DIRECTION
          // startpoint: ENDPOINT_DIRECTION,
          // endpoint: ENDPOINT_DIRECTION,
          // parallelgateway: ENDPOINT_DIRECTION,
          // convergegateway: ENDPOINT_DIRECTION,
          // branchgateway: ENDPOINT_DIRECTION,
          // tasknode: ENDPOINT_DIRECTION,
          // subflow: ENDPOINT_DIRECTION
        }, // 节点的类型和端点的位置
        lineWidth: 3, // 线的宽度 默认为2
        fillColor: '#348af3', // 高亮颜色
        defaultColor: '#a9adb6', // 默认颜色
        lineRadius: 1, // 线拐弯弧度
        pointColor: 'rgba(52, 138, 243, 0.15)', // 端点的颜色
        pointWidth: 3, // 连接端点的半径
        pointDistance: 0, // 端点与线的距离
        data: [], // 渲染的数据源,
        id: 'node', // 配置渲染的节点id
        isEdit: this.isEdit, // 是否编辑
        dropElevent: null // 拖拽的数据源
      }
    };
  },
  mounted () {
    const ths = this;

    $('#flow-main-content').dataflow(this.opts);
    this.dataFlowInstance = $('#flow-main-content').data('dataflow');
  },
  computed: {
  },
  methods: {
    // 返回唯一标识
    // getUUID () {
    //   return Math.random().toString(36).substr(3, 10);
    // },
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
      // let width = this.$refs.nodeMenu.$el.clientWidth;
      const ths = this;
      // let nodeId = this.getUUID();
      let nodeId = ths.dataFlowInstance.generateNodeId();

      let parentX = document.getElementById('flow-contain').getBoundingClientRect().left;
      let parentY = document.getElementById('flow-contain').getBoundingClientRect().top;
      let left = evt.originalEvent.layerX - mousePosition.left;
      let top = evt.originalEvent.layerY - mousePosition.top;

      if (parentX > evt.originalEvent.clientX) {
        // left = 0;
        return;
      }
      if (parentY > evt.originalEvent.clientY) {
        // top = 0;
        return;
      }

      let node = {
        id: nodeId,
        name: nodeId,
        type: nodeMenu.type,
        ico: nodeMenu.ico,
        x: left + 'px',
        y: top + 'px'
      };

      console.log('生成新的node：');
      console.log(node);
      // 这里可以进行业务判断、是否能够添加该节点
      ths.data.nodeList.push(node);
      // 给节点增加flow功能
      ths.$nextTick(function () {
        ths.dataFlowInstance.createLocation(node);
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
        this.dataFlowInstance.makeSource(node.id, this.jsplumbSourceOptions);
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.dataFlowInstance.makeTarget(node.id, this.jsplumbTargetOptions);
        // 限制节点的可拖动区域
        // flowUtils.draggable(this.dataFlowInstance, node.id, {containment: $('#flow-contain')});
      }

      // 初始化连线
      for (let i = 0; i < tempLineList.length; i++) {
        const line = tempLineList[i];

        this.dataFlowInstance.connect({
          source: line.from,
          target: line.to
        }, this.jsplumbConnectOptions);
      }
      console.log('-------------flow-template.js 加载流程图 loadEasyFlow end---------');
    }
  }
};
