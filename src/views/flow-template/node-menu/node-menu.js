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
          id: '11',
          type: 'timer',
          name: '定时器',
          ico: 'el-icon-time'
        }, {
          id: '12',
          type: 'task',
          name: '定时任务',
          ico: 'el-icon-odometer'
        },
        {
          id: '21',
          type: 'end',
          name: '结束',
          ico: 'el-icon-caret-right'
        }, {
          id: '22',
          type: 'over',
          name: '清理',
          ico: 'el-icon-shopping-cart-full'
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
