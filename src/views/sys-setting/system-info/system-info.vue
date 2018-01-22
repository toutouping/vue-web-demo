<template>
    <p class="system-info">
       <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期"  width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="detail" label="地址">
          </el-table-column>
        </el-table>
    </p>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '系统1',
        detail: '系统详细信息XXXXXXXXXXXXXXX'
      }, {
        date: '2016-05-04',
        name: '系统2',
        detail: '系统详细信息XXXXXXXXXXXXXXX'
      }, {
        date: '2016-05-01',
        name: '系统3',
        detail: '系统详细信息XXXXXXXXXXXXXXX'
      }, {
        date: '2016-05-03',
        name: '系统4',
        detail: '系统详细信息XXXXXXXXXXXXXXX'
      }]
    };
  }
};
</script>

<style scoped>
  .system-info {
    padding: 20px;
    font-size: 20px;
    text-align: center;
    color: rgb(192, 204, 218);
  }
</style>
