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
          type: 'group',
          name: '开始节点',
          ico: 'el-icon-video-play',
          children: [
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
            }
          ]
        },
        {
          id: '2',
          type: 'group',
          name: '结束节点',
          ico: 'el-icon-video-pause',
          children: [
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
          ]
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
      const ths = this;
      var type = evt.item.attributes.type.nodeValue;

      ths.nodeMenu = ths.getMenu(type);
    },
    // 拖拽结束时触发
    addNodeFn (evt, e) {
      const ths = this;

      ths.$emit('add-node', evt, ths.nodeMenu, ths.mousePosition);
    },
    // 根据类型获取左侧菜单对象
    getMenu (type) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children;

        for (let j = 0; j < children.length; j++) {
          if (children[j].type === type) {
            return children[j];
          }
        }
      }
    }
  }
};
