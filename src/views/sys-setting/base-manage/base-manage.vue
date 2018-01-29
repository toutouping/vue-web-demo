<template>
  <div class="system-info">
    <section class="info-section advert">
      <div class="title">
        <p>广告图</p>
      </div>
      <div class="info-wrapper">
       <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview" :on-remove="handleRemove" :file-list="imageList" list-type="picture">
        <el-button size="small" type="primary" :disabled="uploadDisabled">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </div>
    </section>
    <section class="info-section commission">
      <div class="title">
        <p>佣金</p>
      </div>
      <div class="info-wrapper">
        <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
          <el-form-item label="学校名称">
            <el-input size="small" v-model="formInline.schoolName" placeholder="学校名称"></el-input>
          </el-form-item>
          <el-form-item label="佣金">
            <el-input size="small" v-model="formInline.commission" placeholder="佣金"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="schoolShowList" size="small" style="width: 100%">
          <el-table-column label="ID"  width="180" prop="id"></el-table-column>
          <el-table-column label="名称" width="180">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column sortable label="佣金（元）" prop="commission">
            <template slot-scope="scope"><el-input size="small" v-model="scope.row.commission" placeholder="请输入xxx"></el-input></template>
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
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api/index';

  export default {
    data () {
      return {
        imageList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        formInline: {
          schoolName: '',
          commission: ''
        },
        schoolList: [],
        currentPage: 1,
        pageSize: 5
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
      handleRemove (file, fileList) { // 移除图片
        this.imageList = fileList;
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      handleSizeChange (val) {
        this.pageSize = val;
      },
      handleCurrentChange (val) {
        this.currentPage = val;
      },
      onSubmit () {
        console.log('onSubmit');
      }
    },
    computed: {
      uploadDisabled () {
        console.log(this.imageList.length > 0);
        return this.imageList.length > 0;
      },
      pageCount () {
        return this.schoolList.length;
      },
      schoolShowList () {
        let ths = this;
        let returnList = ths.schoolList.filter(function (item) {
          return (ths.formInline.schoolName === '' || item.name.indexOf(ths.formInline.schoolName) !== -1) &&
            (ths.formInline.commission === '' || item.commission.indexOf(ths.formInline.commission) !== -1);
        });

        return returnList && returnList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      }
    }
  };
</script>


<style lang="stylus" scoped>
  .system-info {
    padding: 0 20px;
    .adevert {
      margin-bottom: 10px;
    }
    .commission {
      .pagination {
        padding-top: 10px;
      }
    }
    .info-section {
      font-size: 14px;
      .title {
        background: #f0f1f3;
        height: 36px;
        line-height: 36px;
        p {
          display inline-block;
          height: 16px;
          line-height 16px;
          margin: 0 6px 0px 12px;
          padding-left: 6px;
          border-left: solid 4px #057ab8;
          vertical-align middle;
        }
      }
      .info-wrapper {
        padding: 10px 0 10px 30px;
      }
    }
  }
</style>
