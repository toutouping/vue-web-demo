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
