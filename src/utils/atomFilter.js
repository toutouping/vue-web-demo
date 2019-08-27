import tools from './tools.js';

const atomFilter = {
  formFilter (tag_code, config) {
    let formConfig;

    if (tag_code && config) {
      config.some(item => {
        if (item.tag_code === tag_code) {
          formConfig = item;
          return true;
        }

                /**
                 * combine类型的tag勾选为为统一勾选，子tag没有勾选选项，暂时注释
                 */
                // if (item.type === 'combine') {
                //     debugger
                //     formConfig = this.formFilter(tag_code, item.attrs.children)
                //     return true
                // }
      });
    }
    return formConfig;
  },
  getFormItemDefaultValue (config) {
    const value = {};

    config.forEach(item => {
      if (item.type === 'combine') {
        value[item.tag_code] = this.getFormItemDefaultValue(item.attrs.children);
      } else {
        let val;

        if ('value' in item.attrs) {
          val = tools.deepClone(item.attrs.value);
        } else if ('default' in item.attrs) {
          val = tools.deepClone(item.attrs.default);
        } else {
          switch (item.type) {
            case 'input':
            case 'textarea':
            case 'radio':
            case 'text':
            case 'datetime':
            case 'password':
              val = '';
              break;
            case 'checkbox':
            case 'datatable':
            case 'tree':
            case 'upload':
              val = [];
              break;
            case 'select':
              val = item.attrs.multiple ? [] : '';
              break;
            case 'int':
              val = 0;
              break;
            case 'ip_selector':
              val = {
                selectors: [],
                ip: [],
                topo: [],
                filters: [],
                excludes: []
              };
              break;
            default:
              val = '';
          }
        }

        value[item.tag_code] = val;
      }
    });

    return value;
  },

    /**
     * 通过变量配置项获取需要加载标准插件的相关参数
     * @param {Object} variable 变量配置项
     *
     * @return {String} atomType 标准插件code
     * @return {String} atom 标准插件注册名称
     * @return {String} tagCode 标准插件中的某一项表单tagCode
     * @return {String} classify 标准插件分类：变量、组件
     */
  getVariableArgs (variable) {
    const {source_tag, custom_type} = variable;
    let atomType = ''; // 需要加载标准插件文件的code
    let atom = ''; // 标准插件名称，对应绑定在$.atoms上的key
    let tagCode = '';
    let classify = '';

    if (custom_type) {
      atomType = custom_type;
      atom = source_tag ? source_tag.split('.')[0] : custom_type; // 兼容旧数据自定义变量source_tag为空
      tagCode = source_tag ? source_tag.split('.')[1] : custom_type;
      classify = 'variable';
    } else {
      [atomType, tagCode] = source_tag.split('.');
      atom = atomType;
      classify = 'component';
    }
    return {atomType, atom, tagCode, classify};
  }
};

export default atomFilter;
