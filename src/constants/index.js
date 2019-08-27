const TASK_STATE_DICT = {
  'CREATED': window.gettext('未执行'),
  'RUNNING': window.gettext('执行中'),
  'SUSPENDED': window.gettext('暂停'),
  'NODE_SUSPENDED': window.gettext('节点暂停'),
  'FAILED': window.gettext('失败'),
  'FINISHED': window.gettext('完成'),
  'REVOKED': window.gettext('撤销')
};

const NODE_DICT = {
  'startpoint': window.gettext('开始节点'),
  'endpoint': window.gettext('结束节点'),
    // 'startPoint': window.gettext('开始节点'),
    // 'endPoint': window.gettext('结束节点'),
  'parallelgateway': window.gettext('并行网关'),
  'branchgateway': window.gettext('分支网关'),
  'convergegateway': window.gettext('汇聚网关'),
  'tasknode': window.gettext('标准插件节点'),
  'subflow': window.gettext('子流程节点')
};

// 最大长度常量
const TEMPLATE_NAME_MAX_LENGTH = 50;
const TEMPLATE_NODE_NAME_MAX_LENGTH = 50;
const TASK_NAME_MAX_LENGTH = 100;
const STAGE_NAME_MAX_LENGTH = 50;
const DRAFT_NAME_MAX_LENGTH = 20;
const SCHEME_NAME_MAX_LENGTH = 30;
const APP_NAME_MAX_LENGTH = 20;
const APP_DESCRIPTION_MAX_LENGTH = 30;
const VARIABLE_NAME_MAX_LENGTH = 20;
const VARIABLE_KEY_MAX_LENGTH = 20;

const STRING_LENGTH = {
  TEMPLATE_NAME_MAX_LENGTH,
  TEMPLATE_NODE_NAME_MAX_LENGTH,
  TASK_NAME_MAX_LENGTH,
  STAGE_NAME_MAX_LENGTH,
  DRAFT_NAME_MAX_LENGTH,
  SCHEME_NAME_MAX_LENGTH,
  APP_NAME_MAX_LENGTH,
  APP_DESCRIPTION_MAX_LENGTH,
  VARIABLE_NAME_MAX_LENGTH,
  VARIABLE_KEY_MAX_LENGTH
};

// const NAME_REG = /^[^'"‘’“”\$<>]+$/;
const NAME_REG = /^[^'"‘’“”$<>]+$/;

// celery的crontab时间表达式正则表达式（分钟 小时 星期 日 月）（以空格分割）
// 例子请见图片assets/images/task-zh.png
const PERIODIC_REG = /^((\*\/)?(([0-5]?\d[,-/])*([0-5]?\d))|\*)[ ]((\*\/)?(([0]?[0-9]|1\d|2[0-3])[,-/])*(([0]?[0-9]|1\d|2[0-3]))|\*)[ ]((\*\/)?((([0-6][,-/])*[0-6])|((mon|tue|wed|thu|fri|sat|sun)[,-/])*(mon|tue|wed|thu|fri|sat|sun))|\*)[ ]((\*\/)?((0?[1-9]|[12]\d|3[01])[,-/])*((0?[1-9]|[12]\d|3[01]))|\*)[ ]((\*\/)?((0?[1-9]|1[0-2])[,-/])*(0?[1-9]|1[0-2])|\*)$/;

/* eslint-disable */
const URL_REG= new RegExp('^(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$')
/* eslint-enable */

export {TASK_STATE_DICT, NODE_DICT, NAME_REG, URL_REG, PERIODIC_REG, STRING_LENGTH};
