<template>
    <div class="menubar">
      <ul class="atom-list">
        <li v-for="(atom, index) in nodeDict" :key="index"
          @click.stop="onSelectNode(atom.type)"
          :data-type="atom.type"
          :class="['node-type-item node-source', atom.type,
              { 'active-node-type': activeNodeType === atom.type && showNodeList }]">
          {{atom.name}}
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import {NODE_DICT} from 'src/constants/index.js';

const nodeTypeList = ['startpoint', 'endpoint', 'parallelgateway', 'convergegateway', 'branchgateway', 'tasknode', 'subflow'];
const nodeTypeSubList = ['tasknode', 'subflow'];
const node_list = Object.keys(NODE_DICT).map(key => {
  return {
    type: key,
    name: NODE_DICT[key]
  };
});

export default {
  components: {
  },
  mounted () {
  },
  data () {
    return {
      showNodeList: false,
      nodeDict: node_list,
      activeNodeType: null // 拖动的原子
    };
  },
  methods: {
    // 拖动原子
    onSelectNode (node) {
      this.activeNodeType = node;
    }
  }
};
</script>

<style lang="stylus" scoped>
  .menubar {
    .atom-list {
      list-style: none;
      display: block;
      padding: 20px 10px;
      li {
        list-style: none;
        display: block;
        position: relative;
        padding: 10px 0;
        font-size: 14px;
        color: #52699D;
        border: solid 1px #52699D;
        border-radius: 8px;
        text-align: center;
        cursor: move;
        transition: all 0.5s ease;
        margin-bottom: 15px;
      }
    }
  }
</style>

