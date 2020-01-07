import {jsPlumb} from 'jsplumb';
import jQuery from 'jquery';

(function ($) {
  $.fn.extend({
    dataflow: function (options) {
      // jQuery对象
      var _self = this;

      // 默认配置
      var defaults = {
        canvas: null,  // 画布
        template: null,  // 可配置的模版
        selector: {
          el: null,
          x: 0, // 矩形框中心点画布 x 坐标
          y: 0, // 矩形框中心点画布 y 坐标
          nodes: []
        }, // 节点选择框
        locationConfig: {},  // 节点的类型和端点的位置
        lineWidth: 3,  // 线的宽度 默认为2
        fillColor: 'red',  // 高亮颜色
        defaultColor: '#ddd',  // 默认颜色
        lineRadius: 1, // 线拐弯弧度
        pointColor: 'rgba(0,0,0,0.5)',  // 端点的颜色
        pointWidth: 5,  // 连接端点的半径
        pointDistance: 0,  // 端点与线的距离
        data: {
          locations: [],
          lines: []
        },  // 渲染的数据源
        id: 'chart',  // 配置渲染的节点id
        isEdit: true,  // 是否编辑
        dragSelection: false, // 是否支持框选节点
        dropElevent: null,  // 拖拽的数据源

        getDefaultLocation: null,  // 获取某一类型节点的初始化节点数据

        onCreateLocationAfter: null,  // 节点创建后回调
        onRemoveLocationBefore: null,  // 删除节点前回调
        onRemoveLocationAfter: null,  // 删除节点后回调
        onLocationMoveAfter: null,  // 拖动节点时回调
        onLocationMove: null,  // 拖动节点停止后回调

        onCreateLineBefore: null,  // 创建连线前回调
        onCreateLineAfter: null,  // 创建连线后回调
        onRemoveLineBefore: null,  // 删除连线前的回调
        onRemoveLineAfter: null,  // 删除连线后的回调

        ondrawData: null,  // 渲染流程后回调

        onLineDragStop: null, // 节点端点拖拽连线结束回调
        onLabelBlur: null, // 连接线label失焦回调
        onCloseDragSelection: null // 关闭节点框选回调
      };

      // 最终配置，包括组装连线配置
      var opts = $.extend({}, defaults, options);

      opts.sourceEndpoint = {
        endpoint: 'Dot',
        paintStyle: { // 出发点
          stroke: opts.isEdit ? opts.pointColor : 'rgba(0, 0, 0, 0)',
          fill: 'rgba(0, 0, 0, 0)',
          radius: 7
        },
        hoverPaintStyle: {
          stroke: opts.isEdit ? opts.fillColor : 'rgba(0, 0, 0, 0)',
          fill: opts.isEdit ? opts.fillColor : 'rgba(0, 0, 0, 0)',
          radius: 7
        },
        isSource: true,
        isTarget: true,
        connector: [
          'Flowchart',
          {
            stub: [5, 20],
            gap: 8,
            cornerRadius: opts.lineRadius,
            alwaysRespectStubs: true
          }
        ],
        // gap 线离开端点距离
        connectorStyle: { // 描绘线的样式
          strokeWidth: 2, // 线条宽度
          stroke: opts.defaultColor, // 填充颜色
          joinstyle: 'round',
          outlineStroke: 'transparent',
          outlineWidth: 0 // 线条外部宽度
        },
        connectorHoverStyle: {
          strokeWidth: 2,
          stroke: opts.isEdit ? opts.fillColor : opts.defaultColor,
          fill: opts.isEdit ? opts.fillColor : opts.defaultColor
        },
        dragOptions: {
          drag: function (e) { // 拖动端点触发的事件
            $(e.el).find('circle').css('fill', '#fe621d');
          }
        },
        maxConnections: -1 // 是否允许多条线
      };
      opts.targetEndpoint = {
        endpoint: 'Dot',
        paintStyle: {
          stroke: opts.isEdit ? opts.fillColor : 'rgba(0, 0, 0, 0)',
          fill: 'rgba(0, 0, 0, 0)',
          radius: 7
        },
        hoverPaintStyle: {
          stroke: opts.isEdit ? opts.fillColor : 'rgba(0, 0, 0, 0)',
          fill: opts.isEdit ? opts.fillColor : 'rgba(0, 0, 0, 0)',
          radius: 7
        },
        connectorHoverStyle: {
          strokeWidth: 4,
          stroke: opts.isEdit ? opts.fillColor : opts.defaultColor
        },
        dragOptions: {
          drag: function (e) {
            $(e.el).find('circle').css('fill', '#fe621d');
          }
        },
        connectorStyle: { // 描绘线的样式
          strokeWidth: 2, // 线条宽度
          stroke: opts.defaultColor, // 填充颜色
          joinstyle: 'round',
          outlineStroke: 'transparent',
          outlineWidth: 0 // 线条外部宽度
        },
        maxConnections: -1,
        isSource: true,
        isTarget: true,
        connector: [
          'Flowchart',
          {
            stub: [5, 20],
            gap: 3,
            cornerRadius: opts.lineRadius,
            alwaysRespectStubs: true
          }
        ]
      };

      // 区分拖拽和单击事件的状态变量
      var nodeClickStatus = {
        pageX: undefined,
        pageY: undefined,
        isDragEvent: undefined
      };

      // 工具函数集合
      var handlerFactory = {
        /**
         * @description
        */
        generateNodeId: function () {
          var d = new Date().getTime();

          function uuid () {
            function s4 () {
              return Math.floor((1 + Math.random()) * 0x10000)
                              .toString(16)
                              .substring(1);
            }
            return s4() + s4() + s4() + s4() + s4() + s4() + s4();
          }
          let newNodeId = `${opts.id}${uuid()}`;

          if (document.getElementById(newNodeId)) {
            this.generateNodeId();
          }
          return newNodeId;
        },
        getName: function (obj) { // 获取流程的名字
          var name = $(obj).attr('data');

          return name;
        },

        /**
         * 获取默认节点结构，补充必要字段
         */
        getDefaultLocation: function (type) {
          let defaultLocation = {};

          if (opts.getDefaultLocation) {
            defaultLocation = opts.getDefaultLocation(type);
          }

          defaultLocation.id = this.generateNodeId();
          defaultLocation.x = 0;
          defaultLocation.y = 0;
          defaultLocation.type = type;
          return defaultLocation;
        },

        /**
         * 根据节点类型获取节点模板
         * @param {String} dataType 节点类型
         * @param {String} [opType] 节点操作方式，create（新增）、update（更新）
         */
        getLocationTemplate: function (dataType) {
          return $(opts.template).find('#' + dataType + '-template').html();
        }
      };

      // 画布内所有节点的容器，用于控制位移和缩放
      var $nodeContainer = {
        el: null, // 容器Dom
        left: 0, // 容器位移
        top: 0,
        zoom: 1 // 画布容器整体缩放值
      };

      // jsPlumb插件实例
      var instance = jsPlumb.getInstance({
        ConnectionOverlays: [ // 配置链接线的样式
          ['PlainArrow', {
            location: 1, // 0-1
            width: 8,
            id: 'arrow',
            length: 6,
            events: { // 终线箭头的点击事件
              click: function (e) {
                e.stopPropagation();
              }
            }
          }],
          ['Label',
                        {label: '<i class="common-icon-dark-circle-close"></i>', id: 'label'}
          ]
        ],
        Container: 'ktj-canvas' // 容器id
      });

      // 完成初始化
      jsPlumb.fire('jsPlumbDemoLoaded', instance);

      // flow插件初始化
      var init = function () {
        jsPlumb.setContainer(opts.canvas);

        // 将所有节点包裹在内置的DIV
        $nodeContainer.el = $(opts.canvas).find('.bk-flow-container');
        // 加入基础样式class
        $nodeContainer.el.css('position', 'relative');
        _self.addClass('bk-flow-wrap');
        $(opts.canvas).addClass('bk-flow-canvas');

        // _initDragging();
        // _initEvent();
      };

      /**
       * 初始化画布，统一管理画布之上的所有拖拽功能
       */
      var _initDragging = function () {
        var isMove = false;
        var _obj = null;         // 是否按下就放开
        var currentNode = null;  // 当前选中拖动的对象

        var isCvsDragging = false; // 当前操作是否是画布拖拽
        var initialLocation = {
          x: 0,
          y: 0
        };
        var mousePos = { // 鼠标位置相对于画布坐标
          x: 0,
          y: 0
        };

        _self.off('mousedown')
          .off('mousemove')
          .off('mouseup');
        setMouseMoveEvent();
        // 画布拖拽、节点框选事件
        _self.on('mousedown', opts.canvas, canvasDragHanlder);

        // 设置鼠标移动事件，记录鼠标坐标
        function setMouseMoveEvent () {
          _self.on('mousemove', opts.canvas, function (e) {
            const canvasWrapperOffset = $(opts.canvas).offset();

            mousePos = {
              x: e.pageX - canvasWrapperOffset.left - $nodeContainer.left,
              y: e.pageY - canvasWrapperOffset.top - $nodeContainer.top
            };
          });
        }
        // 画布拖拽、节点框选事件
        function canvasDragHanlder (e) {
          const canvasWrapperOffset = $(opts.canvas).offset(); // 画布最外层元素相对于文档的偏移量
          const posLeft = e.pageX - canvasWrapperOffset.left - $nodeContainer.left;
          const posTop = e.pageY - canvasWrapperOffset.top - $nodeContainer.top;

          initialLocation.x = e.pageX;
          initialLocation.y = e.pageY;

          if (opts.dragSelection) {
            const selectWrapper = document.createElement('div');

            selectWrapper.className = 'select-wrapper';
            _self.find('.bk-flow-container').append(selectWrapper);
            opts.selector.el = $(selectWrapper);
            opts.selector.el.css({
              left: posLeft,
              top: posTop
            });
          }
          _self.on('mousemove', opts.canvas, function (event) {
            if (opts.dragSelection) {
              selectionMoveHanlder(event, posLeft, posTop);
            } else {
              canvasMoveHandler(event);
            }
          });
          $(document).one('mouseup', function (event) {
            if (opts.dragSelection) {
              selectionEndHandler(event);
            } else {
              canvasMoveEndHandler(event);
            }
            _self.off('mousemove', opts.canvas);
            setMouseMoveEvent();
          });
        }

        /**
         * 画布移动事件回调
         * @param {Object} e 事件对象
         */
        function canvasMoveHandler (e) {
          var distanceOnX = e.pageX - initialLocation.x + $nodeContainer.left;
          var distanceOnY = e.pageY - initialLocation.y + $nodeContainer.top;

          $nodeContainer.el.css({
            left: distanceOnX,
            top: distanceOnY
          });
        }

        /**
         * 画布移动结束事件回调
         * @param {Object} e 事件对象
         */
        function canvasMoveEndHandler (e) {
                  // 拖拽结束更新画布的位移值
          $nodeContainer.left += e.pageX - initialLocation.x;
          $nodeContainer.top += e.pageY - initialLocation.y;
        }

        /**
         * 节点选择事件回调
         * @param {Object} e 事件对象
         * @param {Number} posLeft 选框相对于画布左偏移量
         * @param {Number} posTop 选框相对于画布顶部偏移量
         */
        function selectionMoveHanlder (e, posLeft, posTop) {
          const distanceX = e.pageX - initialLocation.x;
          const distanceY = e.pageY - initialLocation.y;

          posLeft = distanceX > 0 ? posLeft : posLeft + distanceX;
          posTop = distanceY > 0 ? posTop : posTop + distanceY;
          opts.selector.el.css({
            width: Math.abs(distanceX),
            height: Math.abs(distanceY),
            left: posLeft,
            top: posTop
          });
          opts.selector.x = (posLeft + Math.abs(distanceX)) / 2;
          opts.selector.y = (posTop + Math.abs(distanceY)) / 2;
        }

        /**
         * 节点选择结束回调
         * @param {Object} e 事件对象
         */
        function selectionEndHandler (e) {
          const locations = _self.find('.bk-flow-location');

          locations.each((index, node) => {
            const $node = $(node);

            if (opts.selector.el && isNodeInSelectionArea($node)) { // 暂时兼容鼠标在画布外释放
              opts.selector.nodes.push(node);
              $node.addClass('selected');
            }
          });
          instance.addToDragSelection(opts.selector.nodes); // 多节点拖拽

          $(document).on('keydown', locationLineCopyHandler); // 节点、连线复制事件
          $(document).on('keydown', locationLinePasteHandler); // 节点、连线粘贴事件
          $(document).on('keydown', locationLineDeleteHandler); // 节点、连线删除事件
          $(document).one('mousedown', function (event) { // 画布失焦
            const $this = $(event.target);

            if (!$this.hasClass('bk-flow-location')) {
              clearSelector();
            }
          });
          $('.bk-flow-location').one('mousedown', function (event) {
            if (!$(this).hasClass('selected')) {
              clearSelector();
            }
          });
          opts.dragSelection = false; // 关闭可拖拽状态
          opts.onCloseDragSelection && opts.onCloseDragSelection();
          _self.find('.select-wrapper').remove();
        }

        /**
         * 清除选框及数据
         */
        function clearSelector () {
          _self.find('.bk-flow-location.selected').removeClass('selected');
          $(document).off('keydown', locationLineCopyHandler);
          $(document).off('keydown', locationLinePasteHandler);
          $(document).off('keydown', locationLineDeleteHandler);
          opts.selector.el = null;
          opts.selector.nodes = [];
          instance.clearDragSelection();
        }

        /**
         * 判断节点是否在选择框里
         * @param {Object} node 画布中所有节点集合
         * @return {Boolean} 节点是否在选择框里
         */
        function isNodeInSelectionArea ($node) {
          const $selector = opts.selector.el;
          const selectorPos = $selector.position();
          const nodePos = $node.position();

          return selectorPos.left < nodePos.left &&
                          selectorPos.left + $selector.width() > nodePos.left &&
                          selectorPos.top < nodePos.top &&
                          selectorPos.top + $selector.height() > nodePos.top;
        }

        /**
         * 节点、连线复制回调
         */
        function locationLineCopyHandler (e) {
          if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
            const selectedLocationId = opts.selector.nodes.map(item => item.id);

            opts.onCopyElement && opts.onCopyElement(selectedLocationId, opts.selector);
          }
        }

        /**
         * 节点、连线粘贴回调
         */
        function locationLinePasteHandler (e) {
          if ((e.ctrlKey || e.metaKey) && e.keyCode === 86) {
            const offsetX = mousePos.x - opts.selector.x;
            const offsetY = mousePos.y - opts.selector.y;

            instance.clearDragSelection();
            _self.find('.bk-flow-location.selected').removeClass('selected');
            if (opts.onPasteElement) {
              const locations = opts.onPasteElement(offsetX, offsetY);
              const locationIds = [];

              locations.forEach(location => {
                $('#' + location.id).addClass('selected');
                locationIds.push(location.id);
              });
              instance.addToDragSelection(locationIds);
            }
          }
        }

        /**
         * 节点、连线删除回调
         */
        function locationLineDeleteHandler (e) {
          if (e.keyCode === 46 || e.keyCode === 8) {
            const selectedLocationId = opts.selector.nodes.map(item => item.id);

            opts.onDeleteElement && opts.onDeleteElement(selectedLocationId);
          }
        }

        $(opts.canvas).on('mouseup', '.bk-flow-location', function (e) {
          if (opts.onLocationMoveAfter) {
            const selectedNodes = _self.find('.bk-flow-location.selected');

            if (selectedNodes.length) {
              selectedNodes.each((index, item) => {
                opts.onLocationMoveAfter(_getLocationById($(item).attr('id')));
              });
            } else {
              opts.onLocationMoveAfter(_getLocationById(this.id));
            }
          }
        });
        $(opts.canvas).on('click', '.bk-flow-location', function (e) {
          e.stopPropagation();
          if (nodeClickStatus.isDragEvent) {
            nodeClickStatus.isDragEvent = false;
          } else {
            const id = $(this).attr('id');

            opts.onNodeClick && opts.onNodeClick(id);
          }
        }).on('click', '.branch-condition', function (e) {
          e.stopPropagation();
          if (opts.isEdit) {
            const $this = $(e.target);

            $this.focus();
            $this.one('blur', function (e) {
              const labelData = {
                id: $this.data('lineid'),
                nodeId: $this.data('nodeid'),
                name: $this.text()
              };

              opts.onLabelBlur && opts.onLabelBlur(labelData);
            });
          }
        });
      };

      /**
       *  绑定事件
       */
      var _initEvent = function () {
        instance.unbind('connectionDragStop');
        instance.unbind('connectionDrag');
        instance.unbind('click');

        // 拖动连线结束时触发
        instance.bind('connectionDragStop', function (connection, originalEvent) {
          // 连线不可连接至自身
          if (connection.sourceId === connection.targetId) {
            instance.detach(connection);
            return false;
          }

          let _line = _connection_to_line(connection);

          if ((opts.onLineDragStop && !opts.onLineDragStop(_line, originalEvent, connection)) ||
                      (opts.onCreateLineBefore && !opts.onCreateLineBefore(_line))
                  ) {
            instance.detach(connection);
            return false;
          }

          opts.onCreateLineAfter && opts.onCreateLineAfter(_line);
        });
        instance.bind('connectionDrag', function (conn) { // 拖动线前触发
          if (!opts.isEdit) {
            instance.detach(conn);
            return false;
          }
        });

        instance.bind('click', function (conn, originalEvent) {
          if (!opts.isEdit) {
            return false;
          }
          if ($(originalEvent.target).hasClass('common-icon-dark-circle-close')) {
            _deleteLine(conn.sourceId, conn.targetId);
          }
        });
        instance.bind('mousemove', function (conn, originalEvent) {
          if (!opts.isEdit) {
            return false;
          }
        });
      };

      var _connection_to_line = function (conn) {
        let endPoints = conn.endpoints;

        return {
          source: {
            arrow: endPoints[0].anchor.type,
            id: conn.sourceId
          },
          target: {
            arrow: endPoints[1].anchor.type,
            id: conn.targetId
          }
        };
      };

    /**
     * 初始化流程节点连线, 绑定事件
     */
      var _drawData = function (data) {
        instance.batch(function () {
          if (data && Object.keys(data).length > 0) {
            var template = $(opts.template);

            // 初始化节点列表
            for (let s = 0; s < data.locations.length; s++) {
              _createLocation(data.locations[s]);
            }

            // 初始化连线
            for (let s = 0; s < data.lines.length; s++) {
              _createLine(data.lines[s]);
            }
          }

          opts.ondrawData && opts.ondrawData();
        });
      };

    /**
     * 绑定节点 hover 高亮事件
     */
      var _highLight = function (obj) {
        $(obj).off();
        $(obj).on('mouseenter', function (e) {
          var id = $(this).attr('id');
          var lines = _getConnectionsByNodeId(id);
          var endPoints = instance.getEndpoints(id);
          var hglObj = lines.concat(lines, endPoints);

          hglObj.forEach(function (item) {
            item.setPaintStyle({
              stroke: opts.fillColor,
              fill: opts.fillColor
            });
          });
        }).on('mouseleave', function (e) {
          var id = $(this).attr('id');
          var lines = _getConnectionsByNodeId(id);
          var endPoints = instance.getEndpoints(id);

          lines.forEach(function (item) {
            item.setPaintStyle({
              stroke: opts.defaultColor,
              fill: opts.defaultColor,
              strokeWidth: 2
            });
          });
          endPoints.forEach(function (item) {
            item.setPaintStyle({
              stroke: opts.pointColor,
              fill: 'rgba(0, 0, 0, 0)'
            });
          });
        });
      };

      var _disabledEdit = function () {
        opts.isEdit = false;

        const el = document.querySelectorAll(opts.canvas + ' .bk-flow-location');

        instance.setDraggable(el, false);
      };

      var _enableEdit = function () {
        opts.isEdit = true;

        const el = document.querySelectorAll(opts.canvas + ' .bk-flow-location');

        instance.setDraggable(el, true);
      };

    /**
     * 初始化流程节点，使节点添加端点
     */
      var _addEndpoints = function (instance, toId, sourceAnchors, targetAnchors) {
        var self = this;

        for (var i = 0; i < sourceAnchors.length; i++) {
          var sourceUUID = sourceAnchors[i] + toId;

          instance.addEndpoint(toId, opts.sourceEndpoint, {
            anchor: sourceAnchors[i],
            uuid: sourceUUID
          });
        }

        for (var j = 0; j < targetAnchors.length; j++) {
          var targetUUID = targetAnchors[j] + toId;

          instance.addEndpoint(toId, opts.targetEndpoint, {
            anchor: targetAnchors[j],
            uuid: targetUUID
          });
        }
      };

    /**
     * 移除节点
     */
      var _removeLocation = function (id) {
        let loc = _getLocationById(id);

        if (opts.onRemoveLocationBefore) {
          if (!opts.onRemoveLocationBefore(loc)) {
            return false;
          }
        }
        instance.remove(id);

        opts.onRemoveLocationAfter && opts.onRemoveLocationAfter(loc);
      };

      /**
       * 新增节点，更新画布内容
       */
      var _createLocation = function (location) {
        // 若不存在ID字段，则补充节点ID
        if (!location.id) {
          location.id = handlerFactory.generateNodeId();
        }

        // 绑定数据
        $(`#${location.id}`).data('raw', location);

        // 添加端点
        var endpointsPosition = [];

        if (opts.locationConfig[location.type]) {
          endpointsPosition = opts.locationConfig[location.type];
        }

        _addEndpoints(instance, location.id, endpointsPosition, []);

        if (opts.isEdit) {
            // 使得节点可拖拽
          var locationEl = jsPlumb.getSelector(opts.canvas + ' ' + `#${location.id}`);

          instance.draggable(locationEl, {
            grid: [5, 5],
            start: function (event, id) {
              nodeClickStatus.pageX = event.e.pageX;
              nodeClickStatus.pageY = event.e.pageY;
            },
            stop: function (event, id) {
                    // _getBestArrow(id)
              opts.onLocationMove && opts.onLocationMove(id);
              if (event.e.pageX !== nodeClickStatus.pageX || event.e.pageY !== nodeClickStatus.pageY) {
                nodeClickStatus.isDragEvent = true;
              } else {
                nodeClickStatus.isDragEvent = false;
              }
            }
          });
          _highLight(locationEl);
        }

        opts.onCreateLocationAfter && opts.onCreateLocationAfter(location);

        return location.id;
      };

      /**
       * 新增连线，更新画布
       */
      var _createLine = function (line) {
        // 连线前看是否允许连接
        if (opts.onCreateLineBefore &&
                !opts.onCreateLineBefore(line)) {
          return false;
        }
        var connect = instance.connect({
          source: line.source.id,
          target: line.target.id,
          uuids: [line.source.arrow + line.source.id, line.target.arrow + line.target.id],
          type: 'Flowchart'
        });

        opts.onCreateLineAfter && opts.onCreateLineAfter(line);
      };

    /**
     * 增加 label
     */
      var _addLabel = function (connect, labelData) {
        const label = connect.addOverlay(['Label', {
          label: labelData.name,
          location: -60,
          cssClass: 'branch-condition'
        }]);
        var labelDom = label.getElement();

        opts.isEdit && (labelDom.contentEditable = 'plaintext-only');
        labelDom.dataset.lineid = labelData.id;
        labelDom.dataset.nodeid = labelData.nodeId;
      };

    /**
     * 删除连线
     * @param {String} source
     * @param {String} target
     */
      var _deleteLine = function (source, target) {
        let conns = instance.getConnections({source: source, target: target});

        for (var i = 0; i < conns.length; i++) {
          let line = _connection_to_line(conns[i]);

          if (opts.onRemoveLineBefore &&
                    !opts.onRemoveLineBefore(line)) {
            return false;
          }

          instance.detach(conns[i]);

          opts.onRemoveLineAfter && opts.onRemoveLineAfter(line);
        }
      };

    /**
     * 通过节点ID，更新DOM内容
     */
      var _updateLocationeById = function (id, data) {
        var $location = $('#' + id);

        // id 参数错误时，不执行节点数据更新
        if (!$location.length) {
          return;
        }

        var rawData = $location.data('raw');

        // 与之前赋值对象取共同集合，保证DOM渲染时，数据的完整性
        rawData = $.extend({}, rawData, data);

        var _html = handlerFactory.getLocationTemplate(rawData.type, 'update');
        var locationObj = handlerFactory.initHtml(_html, rawData);

        $location.html(locationObj.str);
        $location.data('raw', rawData);
      };

    /**
     * 获取节点配置，读取节点DOM位置信息，以及绑定的raw数据
     */
      var _getLocationById = function (id) {
        var $location = $('#' + id);
        var rawData = $location.data('raw');
        // 若画布存在拖拽，则获取节点位移时需加上位移距离 // 不需要加了

        rawData.x = parseInt($location.css('left'));
        rawData.y = parseInt($location.css('top'));
        return rawData;
      };

    /**
     * 获取所有节点配置
     */
      var _getLocations = function () {
        var locations = [];

        $(opts.canvas + ' ' + '.bk-flow-location').each(function (index, el) {
          var loc = _getLocationById($(el).attr('id'));

          locations.push(loc);
        });
        return locations;
      };

    /**
     * 获取所有连线
     */
      var _getLines = function () {
        return instance.getAllConnections().map(function (val, index) {
          return {
            source: {
              id: val.endpoints[0].anchor.elementId,
              arrow: val.endpoints[0].anchor.type
            },
            target: {
              id: val.endpoints[1].anchor.elementId,
              arrow: val.endpoints[1].anchor.type
            }
          };
        });
      };

    /**
     * 通过节点ID获取所有连线，jsPlumb配置信息
     * @params {Int} id 节点ID
     * @params {String} type 连线的类型，可选 source，target，默认为 all
     */
      var _getConnectionsByNodeId = function (id, type = 'all') {
        if (!(arguments.length > 0)) {
          throw new Error('_getConnectionsByNodeId(id, type)必须传递节点id参数');
        }

        var connections = instance.getAllConnections();

        return connections.filter(function (val, index) {
          switch (type) {
            case 'all':
              if (id === val.sourceId || id === val.targetId) {
                return val;
              }
              break;
            case 'source':
              if (id === val.sourceId) {
                return val;
              }
              break;
            case 'target':
              if (id === val.targetId) {
                return val;
              }
              break;
            default:
              throw new Error('_getConnectionsByNodeId(id, type)必须传递节点id参数');
          }
        });
      };

    /**
     * 节点框选开关
     * @param {Boolean} dragSelection
     */
      function _setDragSelection (dragSelection) {
        opts.dragSelection = dragSelection;
      }

    /**
     * 获取最优连线点
     * @todo: 代码&使用逻辑待优化
     */
      var _getBestArrow = function (id) {
        var dataflow = _self.data('dataflow');
        var ids = id;
        var nodeIds = -1;
        var locations = dataflow.getAllData().locations;
        var lines = instance.getAllConnections();

        locations.forEach(d => {
          if (d.id === ids) {
            nodeIds = d.node_id;
          }
        });

        var _getNodeById = function (id) {
          var dataflow = _self.data('dataflow');
          var lines = dataflow.getLines();
          var locations = dataflow.getAllData().locations;
          var nodes = {
            parent: [],
            children: []
          };

          lines.forEach(element => {
            if (element.target.id === id) {
              nodes.parent.push(element.source.id);
            } else if (element.source.id === id) {
              nodes.children.push(element.target.id);
            }
          });
          return nodes;
        };

        var nodes = _getNodeById(ids);
        // 父子节点
        var parentNode = nodes.parent;
        var children = nodes.children;
        // 父子节点和当前节点的endpoints
        var parentNodeEndpoints = {};
        var childNodeEndpoints = {};
        var currentNodeEndpoints = dataflow.getEndpoints(ids);

        parentNode.forEach(p => {
          parentNodeEndpoints[p] = dataflow.getEndpoints(p);
        });
        children.forEach(p => {
          childNodeEndpoints[p] = dataflow.getEndpoints(p);
        });
        // 获取父节点的最优连接点

        let tempArr = [];

        parentNode.forEach(pN => {
          tempArr = [];
          currentNodeEndpoints.forEach(c => {
            parentNodeEndpoints[pN].forEach(p => {
              tempArr.push({
                cArrow: c.anchor.type,
                pArrow: p.anchor.type,
                distance: Math.pow(c.canvas.offsetLeft - p.canvas.offsetLeft, 2) + Math.pow(c.canvas.offsetTop - p.canvas.offsetTop, 2)
              });
            });
            tempArr = tempArr.sort(compare('distance'));
            function compare (property) {
              return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];

                return value1 - value2;     // 升序
              };
            }
          });
          let theBestArrowGroup = tempArr[0];

          lines.forEach((line, index) => {
            if (line.sourceId === pN && line.targetId === ids) {
              instance.detach(line);
              var options = {
                source: {
                  id: pN,
                  arrow: theBestArrowGroup.pArrow
                },
                target: {
                  id: ids,
                  arrow: theBestArrowGroup.cArrow
                }
              };

              dataflow.createLine(options);
            }
          });
        });

        // 获取子节点的最优连接点
        let tempArr2 = [];

        children.forEach(cN => {
          tempArr2 = [];
          currentNodeEndpoints.forEach(c => {
            childNodeEndpoints[cN].forEach(p => {
              tempArr2.push({
                cArrow: c.anchor.type,
                pArrow: p.anchor.type,
                distance: Math.pow(c.canvas.offsetLeft - p.canvas.offsetLeft, 2) + Math.pow(c.canvas.offsetTop - p.canvas.offsetTop, 2)
              });
            });
            tempArr2 = tempArr2.sort(compare('distance'));
            function compare (property) {
              return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];

                return value1 - value2;     // 升序
              };
            }
          });
          let theBestArrowGroup = tempArr2[0];

          lines.forEach((line, index) => {
            if (line.sourceId === ids && line.targetId === cN) {
              instance.detach(line);
              var options = {
                source: {
                  id: ids,
                  arrow: theBestArrowGroup.cArrow
                },
                target: {
                  id: cN,
                  arrow: theBestArrowGroup.pArrow
                }
              };

              dataflow.createLine(options);
            }
          });
        });
      };

      var _strToNum = function (str, tpl) {
        var reg = new RegExp(tpl, 'g');

        return Number(str.replace(reg, ''));
      };

      var _isInArray = function (el, arr) {
        let result = {
          result: false
        };

        arr.map(function (item, index) {
          if (el === item) {
            result = {
              result: true,
              index: index
            };
          }
        });

        return result;
      };

    // +++++++++++++++++++++ 封装 DataFlow 对外暴露的对象 ++++++++++++++++

      /**
       *   dataflow初始化
       */
      var dataflow = function (obj) {
        var self = this;

        init.call(this);
      };

      /**
       * 获取所有节点、连线数据
       */
      dataflow.prototype.generateNodeId = function () {
        return handlerFactory.generateNodeId();
      };

      /**
       * 新增节点
       * @param {Object} location 节点配置，包括位置、类型信息和额外信息（id字段自动生成），数据格式：
       *  {
       *     x: 111,
       *     y: 222,
       *     type: 'xxxx'
       *     ...
       *  }
       */
      dataflow.prototype.createLocation = function (location) {
        return _createLocation(location);
      };

      // 绑定DataFlow实例
      return $.each(this, function () {
        var $this = $(this);

        if (!$this.data('dataflow')) {
          $this.data('dataflow', new dataflow($this));
        }
      });
    }
  });
})(jQuery);
