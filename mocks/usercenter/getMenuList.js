/**
 * 用户中心模块 > 菜单列表信息
 * @url /usercenter/getMenuList
 * Here you can write a detailed description
 * of the parameters of the information.
 */
module.exports = {
 "code|1": [0, 0, 0, 0, 1], // simulation error code, 1/5 probability of error code 1.
 "message|1": ["success","success","success","success","fail"],
 "data": [{
      "menuId": "id-1",
      "menuNameCn":"VUE基础",
      "menuNameEn":"VUE基础",
      "iconCls": "el-icon-location",
      "children":[{
        "menuId": "id-2",
        "menuNameCn":"内置指令",
        "menuNameEn":"内置指令",
        "iconCls": "el-icon-location",
        "children":[],
        "comp":"directiveInlay",
        "url":"/directiveInlay"
      },{
        "menuId": "id-3",
        "menuNameCn":"自定义指令",
        "menuNameEn":"自定义指令",
        "iconCls": "el-icon-location",
        "children":[],
        "comp":"directiveDefine",
        "url":"/directiveDefine"
      },{
        "menuId": "id-5",
        "menuNameCn":"过滤器",
        "menuNameEn":"过滤器",
        "iconCls": "el-icon-location",
        "children":[],
        "comp":"defineFilter",
        "url":"/defineFilter"
      },{
        "menuId": "id-6",
        "menuNameCn":"组件",
        "menuNameEn":"组件",
        "iconCls": "el-icon-location",
        "children":[],
        "comp":"defineComponent",
        "url":"/defineComponent"
      }],
      "comp":"",
      "url":""
    },{
      "menuId": "id-7",
      "menuNameCn":"菜单二",
      "menuNameEn":"Scholl",
      "iconCls": "el-icon-location",
      "children":[],
      "comp":"",
      "url":""
    },{
      "menuId": "id-8",
      "menuNameCn":"菜单三",
      "menuNameEn":"Runners",
      "iconCls": "el-icon-location",
      "children":[],
      "comp":"",
      "url":"/"
    }
    ]
}