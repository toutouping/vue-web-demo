import {jsPlumb} from 'jsplumb';
import lodash from 'lodash';
import data_A from './data_A.js';
import $ from 'jquery';

export default {
  data () {
    return {
      data: {},
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
      }
    };
  },
  mounted () {
    const ths = this;

    ths.jsPlumb = jsPlumb.getInstance();
    ths.data = lodash.cloneDeep(data_A);
    ths.$nextTick(() => {
      ths.jsPlumb.ready(() => {
                // 导入默认配置
        ths.jsPlumb.importDefaults(ths.jsplumbSetting);
                // 立即重绘
        ths.jsPlumb.setSuspendDrawing(false, true);
                // 初始化节点
        ths.loadEasyFlow();
        ths.$nextTick(() => {
                    // 自动调整距离
          ths.autoAlignment();
        });
      });
    });
  },
  methods: {
        // 加载流程图
    loadEasyFlow () {
            // 初始化节点
      for (let i = 0; i < this.data.nodeList.length; i++) {
        const node = this.data.nodeList[i];
                // 设置源点，可以拖出线连接其他节点

        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions);
                // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions);

        this.jsPlumb.draggable(node.id, {
          containment: 'parent'
        });
      }

            // 初始化连线
      for (let i = 0; i < this.data.lineList.length; i++) {
        const line = this.data.lineList[i];

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
