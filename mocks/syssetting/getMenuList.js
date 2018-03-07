/**
 * 配置管理模块 > 菜单列表信息
 * @url /syssetting/getMenuList
 * Here you can write a detailed description
 * of the parameters of the information.
 */
module.exports = {
 "code|1": [0, 0, 0, 0, 1], // simulation error code, 1/5 probability of error code 1.
 "message|1": ["success","success","success","success","fail"],
 "data": [{
      "menuId": "id-1",
      "menuNameCn":"基础管理",
      "menuNameEn":"Base Manage",
      "iconCls": "el-icon-location",
      "children":[],
      "comp":"baseManage",
      "url":"/baseManage"
    },{
      "menuId": "id-2",
      "menuNameCn":"学校管理",
      "menuNameEn":"Scholl",
      "iconCls": "el-icon-location",
      "children":[{
        "menuId": "id-3",
        "menuNameCn":"学校信息",
        "menuNameEn":"scholl Info",
        "children":[],
        "comp":"schollInfo",
        "url":"/schollInfo"
      },{
        "menuId": "id-4",
        "menuNameCn":"提现管理",
        "menuNameEn":"withdraw",
        "children":[],
        "comp":"withdraw",
        "url":"/withdraw"
      }],
      "comp":"",
      "url":""
    },{
      "menuId": "id-5",
      "menuNameCn":"跑腿人",
      "menuNameEn":"Runners",
      "iconCls": "el-icon-location",
      "children":[],
      "comp":"runners",
      "url":"/runners"
    }
    ]
}