import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data () {
    return {
      draggableOptions: {
        preventOnFilter: false
      },
      // 默认打开的左侧菜单的id
      defaultOpeneds: ['1'],
      // 菜单列表
      menuList: [
        {
          id: '1',
          type: 'start',
          name: '开始',
          ico: 'el-icon-video-play'
        },
        {
          id: '2',
          type: 'end',
          name: '结束',
          ico: 'el-icon-cpu'
        },
        {
          id: '3',
          type: 'task',
          name: '任务',
          ico: 'el-icon-folder'
        },
        {
          id: '4',
          type: 'task-branch',
          name: '分支网关',
          ico: 'el-icon-circle-plus-outline'
        },
        {
          id: '5',
          type: 'task-parallel',
          name: '并行网关',
          ico: 'el-icon-video-pause'
        }
      ],
      mousePosition: {
        left: -1,
        top: -1
      }
    };
  },
  methods: {
    // 拖拽开始时触发
    beginMoveFn (evt) {
      console.log('-------------node-menu.js beginMoveFn begin---------');
      console.log(evt);
      const ths = this;
      var type = evt.item.attributes.type.nodeValue;

      ths.nodeMenu = ths.getMenu(type);

      // 计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
      this.mousePosition = {
        left: evt.originalEvent.layerX, // evt.originalEvent.clientX - evt.item.offsetLeft,
        top: evt.originalEvent.layerY // evt.originalEvent.clientY - evt.item.offsetTop
      };
      console.log('-------------node-menu.js beginMoveFn end---------');
    },
    // 拖拽结束时触发
    addNodeFn (evt, e) {
      console.log('-------------node-menu.js addNodeFn begin---------');
      console.log(evt, e);
      const ths = this;

      ths.$emit('add-node', evt, ths.nodeMenu, ths.mousePosition);
      console.log('-------------node-menu.js addNodeFn end---------');
    },
    // 根据类型获取左侧菜单对象
    getMenu (type) {
      console.log('-------------node-menu.js getMenu begin---------');
      console.log(type);
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].type === type) {
          return this.menuList[i];
        }
      }
      console.log('-------------node-menu.js getMenu end---------');
    }
  }
};
