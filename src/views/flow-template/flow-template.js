import menubar from './component/menubar.vue';
import NodeCanvas from './component/NodeCanvas.vue';
import NodeTemplate from './component/NodeTemplate.vue';
import tools from 'src/utils/tools.js';
import './js/flow.js';
import validatePipeline from 'src/utils/validatePipeline.js';
import {uuid} from 'src/utils/uuid.js';
import formatPositionUtils from 'src/utils/formatPosition.js';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
const ENDPOINT_DIRECTION = ['Top', 'Left', 'Right', 'Bottom'];

export default {
  components: {
    menubar,
    NodeCanvas,
    NodeTemplate
  },
  data () {
    return {
      opts: {
        canvas: '#nodeCanvas', // 画布
        template: '#node-template', // 可配置的模版
        tools: '.node-source', // 流程拖动源
        dataFlowInstance: null,
        canvasInstance: null,
        locationConfig: {
          startpoint: ENDPOINT_DIRECTION,
          endpoint: ENDPOINT_DIRECTION,
          parallelgateway: ENDPOINT_DIRECTION,
          convergegateway: ENDPOINT_DIRECTION,
          branchgateway: ENDPOINT_DIRECTION,
          tasknode: ENDPOINT_DIRECTION,
          subflow: ENDPOINT_DIRECTION
        }, // 节点的类型和端点的位置
        lineWidth: 3, // 线的宽度 默认为2
        fillColor: '#348af3', // 高亮颜色
        defaultColor: '#a9adb6', // 默认颜色
        lineRadius: 1, // 线拐弯弧度
        pointColor: 'rgba(52, 138, 243, 0.15)', // 端点的颜色
        pointWidth: 3, // 连接端点的半径
        pointDistance: 0, // 端点与线的距离
        data: tools.deepClone(this.canvasData), // 渲染的数据源,
        id: 'node', // 配置渲染的节点id
        isEdit: this.isEdit, // 是否编辑
        dropElevent: null, // 拖拽的数据源
        getDefaultLocation: this.getDefaultLocation, // 获取某一类型节点的初始化节点数据
        onCreateLocationBefore: this.onCreateLocationBefore, // 节点创建前事件回调
        onCreateLocationAfter: this.onCreateLocationAfter, // 节点创建初始化后事件回调, 参数为节点id
        onCreateLineAfter: this.onCreateLineAfter, // 创建线条后事件回调
        onRemoveLineAfter: this.onRemoveLineAfter, // 删除线之后的回调函数
        onNodeMoveAfter: this.onNodeMoveAfter, // 拖动节点停止后的回调函数
        ondrawData: null, // 渲染流程后回调
        onLineDragStop: this.onLineDragStop, // 节点端点拖拽连线结束回调
        onNodeClick: this.onNodeClick, // 标准插件节点点击事件回调
        onLabelBlur: this.onLabelBlur, // 标准插件节点点击事件回调
        onLocationMoveAfter: this.onLocationMoveAfter, // 标准插件节点移动事件回调
        onRemoveLocationAfter: this.onRemoveLocationAfter, // 删除标准插件节点事件回调
        onCopyElement: this.onCopyElement, // 复制节点、连线回调
        onPasteElement: this.onPasteElement, // 粘贴节点、连线回调
        onDeleteElement: this.onDeleteElement, // 删除节点、连线回调
        onCloseDragSelection: this.onCloseDragSelection // 关闭节点框选回调
      }
    };
  },
  created () {
    this.onFormatPosition = tools.debounce(this.formatPositionHandler, 500);
  },
  mounted () {
    const canvasInstance = window.$('#pipelineCanvas').dataflow(this.opts);

    this.canvasInstance = canvasInstance;
    this.dataFlowInstance = window.$('#pipelineCanvas').data('dataflow');
  },
  computed: {
    ...mapState({
      'singleAtom': state => state.atomList.singleAtom,
      'subAtom': state => state.atomList.subAtom,
      'searchAtomResult': state => state.atomList.searchAtomResult,
      'atomConfig': state => state.atomForm.config,
      'name': state => state.template.name,
      'activities': state => state.template.activities,
      'locations': state => state.template.location,
      'lines': state => state.template.line,
      'constants': state => state.template.constants,
      'gateways': state => state.template.gateways,
      'businessBaseInfo': state => state.template.businessBaseInfo,
      'category': state => state.template.category,
      'subprocess_info': state => state.template.subprocess_info
    }),
    canvasData () {
      const branchConditions = {};

      for (const gKey in this.gateways) {
        const item = this.gateways[gKey];

        if (item.conditions) {
          branchConditions[item.id] = Object.assign({}, item.conditions);
        }
      }
      return {
        activities: this.activities,
        lines: this.lines,
        locations: this.locations.map(item => {
          const data = {...item, mode: 'edit'};

          if (
                    this.subprocess_info &&
                    this.subprocess_info.details &&
                    item.type === 'subflow'
                ) {
            this.subprocess_info.details.some(subflow => {
              if (subflow.subprocess_node_id === item.id && subflow.expired) {
                data.hasUpdated = true;
                return true;
              }
            });
          }
          return data;
        }),
        branchConditions
      };
    }
  },
  methods: {
    getDefaultLocation (type) {
      return {
        id: uuid(),
        atomId: '',
        stage_name: window.gettext('步骤1'),
        optional: false,
        error_ignorable: false,
        mode: 'edit', // edit：编辑模板；select：选择节点；excute：执行任务；preview：预览
        checked: true, // 节点选中状态
        can_retry: true,
        isSkipped: true
      };
    },
    transformArrayToObj (data) {
      const obj = {};

      data.forEach(item => {
        obj[item.id] = tools.deepClone(item);
      });
      return obj;
    },

    /**
     * 获取包含连线目标端点的节点
     * @param {Object} 端点 DOM 对象
     */
    getNodeWithEndpoint (endpoint) {
      console.log('---------------getNodeWithEndpoint------------------');
      console.log(endpoint);
      const parentEl = endpoint.parentNode;

      if (!parentEl || parentEl.nodeName === 'HTML') {
        return false;
      }

      if (parentEl.classList.contains('bk-flow-location')) {
        return parentEl;
      } else {
        return this.getNodeWithEndpoint(parentEl);
      }
    },
    onCreateLocationBefore (loc) {
      console.log('---------------onCreateLocationBefore------------------');
      console.log(loc);
      const validateMessage = validatePipeline.isLocationValid(loc, this.canvasData.locations);

      if (!validateMessage.result) {
        console.error({
          message: validateMessage.message,
          theme: 'warning'
        });
        return false;
      }
      return true;
    },
    onCreateLocationAfter (loc) {
      console.log('---------------onCreateLocationAfter------------------');
      console.log(loc);
      this.$emit('onLocationChange', 'add', Object.assign({}, loc));
      if (loc.type === 'startpoint') {
        this.isDisableStartPoint = true;
      } else if (loc.type === 'endpoint') {
        this.isDisableEndPoint = true;
      }
    },
    onLineDragStop (line, event, connection) {
      console.log('---------------onLineDragStop------------------');
      console.log(line, event, connection);
      let validateMessage;

      if (!line.target.arrow) {
        const nodeEl = this.getNodeWithEndpoint(event.target);

        if (!nodeEl) { // 无效连线
          return false;
        } else { // 连线端点在节点上自动吸附
          if (line.source.id === nodeEl.id) {
            return false; // 节点不可以连接自身
          }
          let arrow;
          const nodeRects = nodeEl.getBoundingClientRect();
          const offsetX = event.clientX - nodeRects.left;
          const offsetY = event.clientY - nodeRects.top;

          if (offsetX < nodeRects.width / 2) {
            if (offsetY < nodeRects.height / 2) {
              arrow = offsetX > offsetY ? 'Top' : 'Left';
            } else {
              arrow = offsetX > (nodeRects.height - offsetY) ? 'Bottom' : 'Left';
            }
          } else {
            if (offsetY < nodeRects.height / 2) {
              arrow = (nodeRects.width - offsetX) > offsetY ? 'Top' : 'right';
            } else {
              arrow = (nodeRects.width - offsetX) > (nodeRects.height - offsetY) ? 'Bottom' : 'Right';
            }
          }

          line.target = {
            arrow,
            id: nodeEl.id
          };
          validateMessage = validatePipeline.isLineValid(line, this.canvasData);
          validateMessage.result && this.dataFlowInstance.createLine(line);
        }
      } else {
        validateMessage = validatePipeline.isLineValid(line, this.canvasData);
        console.log('aaaaaaaaa');
        console.log(validateMessage);
      }

      if (!validateMessage.result) {
        console.error({
          message: validateMessage.message,
          theme: 'warning'
        });
        return false;
      }
      return true;
    },
    onCreateLineAfter (line) {
      console.log('---------------onCreateLineAfter------------------');
      console.log(line);
      this.$emit('onLineChange', 'add', line);
      this.$nextTick(function () {
        const branchInfo = this.canvasData.branchConditions[line.source.id];

        if (branchInfo) {
          const lineId = this.canvasData.lines.filter(item => {
            return item.source.id === line.source.id && item.target.id === line.target.id;
          })[0].id;
          const labelName = branchInfo[lineId].evaluate;
          const labelData = {
            id: lineId,
            nodeId: line.source.id,
            name: labelName
          };

          this.dataFlowInstance.addLabel(line, labelData);
        }
      });
    },
    onRemoveLineAfter (line) {
      console.log('---------------onRemoveLineAfter------------------');
      console.log(line);
      this.$emit('onLineChange', 'delete', line);
    },
    onLocationMoveAfter (loc) {
      console.log('---------------onLocationMoveAfter------------------');
      console.log(loc);
      this.$emit('onLocationMoveDone', loc);
    },
    onOpenDragSelection () {
      console.log('---------------onOpenDragSelection------------------');
      this.dataFlowInstance.setDragSelection(true);
      this.isSelectionOpen = true;
    },
    onCloseDragSelection () {
      this.isSelectionOpen = false;
    },
    onZoomIn () {
      this.zoomRadio = this.zoomRadio * 1.1;
    },
    onZoomOut () {
      this.zoomRadio = this.zoomRadio * 0.9;
    },
    onResetPosition () {
      console.log('---------------onResetPosition------------------');
      this.dataFlowInstance.resetLocation();
      this.zoomRadio = 1;
    },
    formatPositionHandler () {
      console.log('---------------formatPositionHandler------------------');
      const validateMessage = validatePipeline.isDataValid(this.canvasData);
        // 判断是否结构完整

      if (!validateMessage.result) {
        console.error({
          message: validateMessage.message,
          theme: 'error'
        });
        return false;
      }
        // 恢复大小后进行编排
      this.onResetPosition();

        // 需要做深拷贝一次 防止改变vue store内容
      const lines = tools.deepClone(this.canvasData.lines);
      const locations = this.canvasData.locations;
      const data = formatPositionUtils.formatPosition(lines, locations);

      this.onNewDraft(window.gettext('排版自动保存'), false);
      const message = window.gettext('排版完成，原内容在本地缓存中');
        // 重绘Canvas

      this.dataFlowInstance.updateCanvas(data);
      const {overBorderLine} = data;

      if (overBorderLine.length !== 0) {
        overBorderLine.forEach(line => {
          const config = [
            'Flowchart', // 流程图种类
            {
              stub: [5, 20], // 起始端点连接线的最小长度
              gap: 8, // 线与端点点最小间隔
              cornerRadius: 2, // 折线弧度
              alwaysRespectStubs: true, // 允许 stub 配置生效
              midpoint: line.midpoint// 折线比例
                    // todo:需要增加midpoint数据的source,target,midpoint数据进行后台和前端保存
            }
          ];

          this.dataFlowInstance.setConnector(line.source, line.target, config);
        });
      }
        // 提示信息
      console.error({
        message: message,
        theme: 'success'
      });
        // 改变store中的line和location内容
      this.onReplaceLineAndLocation(data);
    },
    handleDeleteNode (event) {
      console.log('---------------handleDeleteNode------------------');
      console.log(event);
      const node = event.target;

      if (!node.classList.contains('common-icon-dark-circle-close')) return;
      const id = node.dataset.id;
      const type = node.dataset.type;

      if (this.canvasInstance && id && type) {
        this.dataFlowInstance.deleteLocation(id);
        this.$emit('onLocationChange', 'delete', {id, type});
      }
      if (type === 'startpoint') {
        this.isDisableStartPoint = false;
      } else if (type === 'endpoint') {
        this.isDisableEndPoint = false;
      }
    },
    onNodeClick (id) {
      console.log('---------------onNodeClick------------------');
      this.$emit('onNodeClick', id);
    },
    onLabelBlur (labelData) {
      console.log('---------------onLabelBlur------------------');
      this.$emit('onLabelBlur', labelData);
    },
    onUpdateNodeInfo (id, data) {
      console.log('---------------onUpdateNodeInfo------------------');
      this.dataFlowInstance.updateLocationById(id, data);
    },
    onUpdateCanvas (data) {
      console.log('---------------onUpdateCanvas------------------');
      this.dataFlowInstance.updateCanvas(data);
    },
    onSearchAtom (data) {
      console.log('---------------onSearchAtom------------------');
      this.$emit('onSearchAtom', data);
    },
    onChangeName (name) {
      console.log('---------------onChangeName------------------');
      this.$emit('onChangeName', name);
    },
    onSaveTemplate (saveAndCreate) {
      console.log('---------------onSaveTemplate------------------');
      const validateMessage = validatePipeline.isDataValid(this.canvasData);

      if (!validateMessage.result) {
        this.$bkMessage({
          message: validateMessage.message,
          theme: 'error'
        });
        return false;
      }
      this.$emit('onSaveTemplate', saveAndCreate);
    },
    onNewDraft (message) {
      console.log('---------------onNewDraft------------------');
      this.$emit('onNewDraft', message);
    },
    onReplaceLineAndLocation (data) {
      console.log('---------------onReplaceLineAndLocation------------------');
      this.$emit('onReplaceLineAndLocation', data);
    },
    onMenuBarShow (val) {
      console.log('---------------onMenuBarShow------------------');
      this.showNodeList = val;
    },
    onCopyElement (data) {
      console.log('---------------onCopyElement------------------');
      this.nodesOfCopyed = data;
    },

    /**
     * 节点粘贴
     * @param {Number} x 节点 x 坐标偏移量
     * @param {Number} y 节点 y 坐标偏移量
     * @return {Array} 返回新增的节点
     */
    onPasteElement (x, y) {
      const {locations, lines} = this.createCopyOfSelectedNodes();

      locations.forEach(location => {
        location.x += x;
        location.y += y;
        this.dataFlowInstance.createLocation(location);
      });
      lines.forEach(line => {
        this.dataFlowInstance.createLine(line);
      });
      return locations;
    },
    onDeleteElement (data) {
      data.forEach(id => {
        const node = {
          id,
          type: this.locationsObj[id].type
        };

        this.dataFlowInstance.deleteLocation(id);
        this.$emit('onLocationChange', 'delete', node);
      });
    },
    createCopyOfSelectedNodes () {
      const lines = [];
      const locations = [];
      const locationIdReplaceHash = {}; // 节点 id 替换映射表
      const lineIdReplaceHash = {}; // 连线 id 替换映射表

      this.nodesOfCopyed.forEach((id, index) => {
        const location = tools.deepClone(this.locationsObj[id]);
        const activity = tools.deepClone(this.canvasData.activities[id]);

        locationIdReplaceHash[id] = location.id = 'node' + uuid();

            // 复制 location 数据
        if (activity) {
          location.atomId = activity.type === 'ServiceActivity' ? activity.component.code : activity.template_id;
        }

        if (location.type !== 'startpoint' && location.type !== 'endpoint') {
          locations.push(location);
        }
      });

        // 复制 line 数据
      this.canvasData.lines.forEach(line => {
        if (locationIdReplaceHash[line.source.id] && locationIdReplaceHash[line.target.id]) {
          const lineCopy = tools.deepClone(line);

          lineIdReplaceHash[line.id] = lineCopy.id = 'line' + uuid();
          lineCopy.source.id = locationIdReplaceHash[line.source.id];
          lineCopy.target.id = locationIdReplaceHash[line.target.id];
          lines.push(lineCopy);
        }
      });

      return {locations, lines};
    },
    onSelectNode () {
      if (this.isPreviewMode) {
        return;
      }
      this.isSelectAll = !this.isSelectAll;
      this.$emit('onSelectNode', this.isSelectAll);
    }
  }
};
