import {jsPlumb} from 'jsplumb';
import lodash from 'lodash';
import data_A from './data_A.js';
import $ from 'jquery';
import nodeMenu from './node-menu/node-menu.vue';
import node from './node.vue';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
    nodeMenu,
    node
  },
  data () {
    return {
      data: {
        nodeList: [],
        lineList: []
      },
      jsPlumb: null,
      loadEasyFlowFinish: false,
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
  mounted () {
    const ths = this;

    ths.jsPlumb = jsPlumb.getInstance();
    ths.$nextTick(() => {
        // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
      ths.drawNodeFn();
    });
  },
  methods: {
    // 返回唯一标识
    getUUID () {
      return Math.random().toString(36).substr(3, 10);
    },
    // 改变节点的位置
    changeNodeSite (data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i];

        if (node.id === data.nodeId) {
          node.left = data.left;
          node.top = data.top;
        }
      }
    },

    /**
     * 拖拽结束后添加新的节点
     * @param evt
     * @param nodeMenu 被添加的节点对象
     * @param mousePosition 鼠标拖拽结束的坐标
     */
    addNodeFn (evt, nodeMenu, mousePosition) {
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

      console.log(node);
      // 这里可以进行业务判断、是否能够添加该节点
      this.data.nodeList.push(node);
      this.$nextTick(function () {
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions);
        // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions);
        this.jsPlumb.draggable(nodeId, {
          containment: 'parent'
        });
      });
    },
    drawNodeFn () {
      const ths = this;

      // 导入默认配置
      ths.jsPlumb.importDefaults(ths.jsplumbSetting);
      // 立即重绘
      ths.jsPlumb.setSuspendDrawing(false, true);
      // 初始化节点
      ths.loadEasyFlow();
      // 单点击了连接线,
      this.jsPlumb.bind('click', (conn, originalEvent) => {
        this.$confirm('确定删除所点击的线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.jsPlumb.deleteConnection(conn);
        }).catch(() => {
        });
      });
      // 连线
      this.jsPlumb.bind('connection', (evt) => {
        let from = evt.source.id;
        let to = evt.target.id;

        if (this.loadEasyFlowFinish) {
          this.data.lineList.push({from: from, to: to});
        }
      });

      // 删除连线回调
      this.jsPlumb.bind('connectionDetached', (evt) => {
        this.deleteLine(evt.sourceId, evt.targetId);
      });

      // 改变线的连接节点
      this.jsPlumb.bind('connectionMoved', (evt) => {
        this.changeLine(evt.originalSourceId, evt.originalTargetId);
      });

      // 单击endpoint
      // jsPlumb.bind("endpointClick", function (evt) {
      //   console.log('endpointClick', evt)
      // })
      //
      // // 双击endpoint
      // jsPlumb.bind("endpointDblClick", function (evt) {
      //   console.log('endpointDblClick', evt)
      // })

      // contextmenu
      this.jsPlumb.bind('contextmenu', (evt) => {
        console.log('contextmenu', evt);
      });

      // 连线
      this.jsPlumb.bind('beforeDrop', (evt) => {
        let from = evt.sourceId;
        let to = evt.targetId;

        if (from === to) {
          this.$message.error('不能连接自己');
          return false;
        }
        if (this.hasLine(from, to)) {
          this.$message.error('不能重复连线');
          return false;
        }
        if (this.hashOppositeLine(from, to)) {
          this.$message.error('不能回环');
          return false;
        }
        this.$message({
          message: '连线成功',
          type: 'success'
        });
        return true;
      });

      // beforeDetach
      this.jsPlumb.bind('beforeDetach', (evt) => {
        console.log('beforeDetach', evt);
      });
    },
    // 加载流程图
    loadEasyFlow () {
      const tempLineList = this.data.lineList || [];
      const tempNodeList = this.data.nodeList || [];

      // 初始化节点
      for (let i = 0; i < tempNodeList.length; i++) {
        const node = tempNodeList[i];

        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions);
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions);

        this.jsPlumb.draggable(node.id, {
          containment: 'parent'
        });
      }

      // 初始化连线
      for (let i = 0; i < tempLineList.length; i++) {
        const line = tempLineList[i];

        this.jsPlumb.connect({
          source: line.from,
          target: line.to
        }, this.jsplumbConnectOptions);
      }
      this.$nextTick(function () {
        this.loadEasyFlowFinish = true;
      });
    },
    autoAlignment () {
      const baseX = Number($('.w').eq(0).css('width').replace('px', '') || 0);
      const baseY = Number($('.w').eq(0).css('height').replace('px', '') || 0);
      let thatX = 0; let thatY = 0; let thisX = 0; let thisY = 0; let deltaX = 0; let deltaY = 0;
      const eleArray = $('.w');

      for (let i = 0; i < eleArray.length; i++) {
        thatX = Number($(eleArray[i]).css('left').replace('px', '') || 0);
        thatY = Number($(eleArray[i]).css('top').replace('px', '') || 0);
        for (let j = i + 1; j < eleArray.length; j++) {
          thisX = Number($(eleArray[j]).css('left').replace('px', '') || 0);
          thisY = Number($(eleArray[j]).css('top').replace('px', '') || 0);
          deltaX = Math.abs(thisX - thatX);
          deltaY = Math.abs(thisY - thatY);
          if (deltaX < baseX && deltaX > 0 && deltaY >= baseY) {
                        // 需要调整x
            console.log('x ' + j);
            $(eleArray[j]).css('left', thatX + 'px');
          }

          if (deltaY < baseY && deltaY > 0 && deltaX >= baseX) {
            console.log('y ' + j);
            $(eleArray[j]).css('top', thatY + 'px');
          }
        }
      }
            // 通过repaintEverything完成位置调整后的重绘
      this.jsPlumb.repaintEverything();
    }
  }
};
