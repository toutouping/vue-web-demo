<template>
    <div class="scholl-info">
      <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
        <el-form-item label="学校名称：">
          <el-input size="small" v-model="formInline.schoolName" placeholder="学校名称"></el-input>
        </el-form-item>
        <el-form-item label="省份：">
          <el-input size="small" v-model="formInline.province" placeholder="省份"></el-input>
        </el-form-item>
        <el-form-item label="管理员：">
          <el-input size="small" v-model="formInline.manager" placeholder="管理员"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="schoolShowList" size="small" style="width: 100%;">
        <el-table-column label="ID"  width="80" prop="id"></el-table-column>
        <el-table-column label="名称" width="180" prop="name"></el-table-column>
        <el-table-column label="管理员"  width="120" prop="manager"></el-table-column>
        <el-table-column label="联系方式"  width="180" prop="contact"></el-table-column>
        <el-table-column label="佣金"  width="100" prop="commission"></el-table-column>
        <el-table-column label="省份"  width="100" prop="province"></el-table-column>
        <el-table-column label="详细地址"  width="300" prop="address"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280">
          <template slot-scope="scope">
            <el-button @click.native.prevent="toAddRow()" size="small">增加</el-button>
            <el-button @click.native.prevent="toEditRow(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click.native.prevent="toDeleteRow(scope.row.id)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount">
        </el-pagination>
      </div>

      <div class="dialog">
        <el-dialog title="学校信息" :inline="true" :visible.sync="modalVisible" width="30%" :before-close="closeAddModal">
         <el-form ref="form" :model="form" label-width="100px" size="mini" class="demo-dynamic">
            <el-form-item label="学校名称：" prop="name"
              :rules="[{ required: true, message: '请输入学校名称', trigger: 'blur' }]">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="管理员：">
             <el-input v-model="form.manager"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
             <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="佣金：">
             <el-input v-model="form.commission"></el-input>
            </el-form-item>
            <el-form-item label="省份：" prop="province"
              :rules="[{ required: true, message: '请输入所在省份', trigger: 'blur' }]">
             <el-input v-model="form.province"></el-input>
            </el-form-item>
            <el-form-item label="详细地址：" prop="address"
              :rules="[{ required: true, message: '请输入学校地址', trigger: 'blur' }]">
             <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeAddModal">取 消</el-button>
            <el-button type="primary" @click="addRow">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import api from 'api/index';

export default {
  data () {
    return {
      formInline: {
        schoolName: '',
        province: '',
        manager: ''
      },
      schoolList: [],
      currentPage: 1,
      pageSize: 10,
      modalVisible: false,
      form: {}
    };
  },
  created () {
    this.$Progress.start();
    api.getSysSchoolList().then((res) => {
      this.schoolList = res.data;
      this.$Progress.finish();
    });
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    toAddRow () {
      this.form = {
        'id': '',
        'name': '',
        'manager': '',
        'contact': '',
        'commission': '',
        'province': '',
        'address': ''
      };
      this.form.id = this.schoolList.length;
      this.modalVisible = true;
    },
    addRow () {
      this.schoolList.push(this.form);
      this.modalVisible = false;
    },
    toEditRow (row) {
      this.form = row;
      this.modalVisible = true;
    },
    toDeleteRow (rowId) {
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteRow(rowId);
      });
    },
    closeAddModal () {
      this.modalVisible = false;
    },
    onSubmit () {
      console.log('onSubmit');
    },
    _deleteRow (rowId) {
      for (let i = 0; i < this.schoolList.length; i++) {
        let item = this.schoolList[i];

        if (item.id === rowId) {
          this.schoolList.splice(i, 1);
        }
      }
    }
  },
  computed: {
    pageCount () {
      return this.schoolList.length;
    },
    schoolShowList () {
      let ths = this;
      let returnList = ths.schoolList.filter(function (item) {
        return (ths.formInline.schoolName === '' || item.name.indexOf(ths.formInline.schoolName) !== -1) &&
          (ths.formInline.province === '' || item.province.indexOf(ths.formInline.province) !== -1) &&
          (ths.formInline.manager === '' || item.manager.indexOf(ths.formInline.manager) !== -1);
      });

      return returnList && returnList.slice((ths.currentPage - 1) * ths.pageSize, ths.currentPage * ths.pageSize);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .scholl-info {
    padding: 0 20px;
    font-size: 20px;
    color: rgb(192, 204, 218);

    .pagination {
      padding: 10px 0;
    }
  }
</style>
