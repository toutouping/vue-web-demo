### 项目组织架构
>├─ .eslintrc.js  
>├─ index.html  
>├─ package.json // 配置文件  
>├─ README.md // 说明文件  
>├─ build // webpack打包执行文件  
>├─ config // webpack打包配置文件  
>├─ code-standards //编码规范  
>├─ src   
>│　　├─ main.js // webpack入口/项目启动入口  
>│　　├─ api // 存放api接口文件，服务层   
>│　　├─ common // 存放私有系统的公共样式、脚本、图片  
>│　　│　　├─ css  
>│　　│　　│　　└─ common.css // 公共样式  
>│　　│　　├─ img // 公共图片  
>│　　│　　├─ js  
>│　　│　　│　　├─ common.js // 公共脚本  
>│　　│　　│　　└─ utils.js // 工具类  
>│　　├─ config  
>│　　│　　├─ index.js // 共有配置文件  
>│　　├─ router  
>│　　│　　├─ index.js // 存放路由  
>│　　├─ views // 视图 （路由跳转的页面）  
>│　　├─ pages //子视图（嵌套）  
>│　　│　　├─ pages.md  
>│　　├─ vuex // 这一块将存放于common项目  
>│　　│　　├─ index.js  
>│　　│　　├─ actions  
>│　　│　　├─ getters  
>│　　│　　└─ modules  
