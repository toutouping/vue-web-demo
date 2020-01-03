import Vue from 'vue';
import Router from 'vue-router';
import store from 'src/store/index.js';
import NotFound from 'views/404.vue';
import login from 'views/login/login.vue';
import sysSetting from 'views/sys-setting/sys-setting.vue';
const companyHelp = resolve => require(['views/company-help/company-help.vue'], resolve);
const userCenter = resolve => require(['views/user-center/user-center.vue'], resolve);
// 异步加载：const meetVipRate =  resolve => require(['views/meet-vip-rate/meet-vip-rate.vue'], resolve);
const flowTemplate = resolve => require(['views/flow-template/flow-template.vue'], resolve);
const jsplumbLearn = resolve => require(['views/jsplumb-learn/jsplumb-learn.vue'], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login', /* 登录界面 */
      name: 'login',
      component: login/* ,hidden: true, // 自定义属性，在组件中可以通过 this.$route.hidden 获取值 */
    },
    {
      path: '/jsplumbLearn', /* 登录界面 */
      name: 'jsplumbLearn',
      component: jsplumbLearn, /* this.$route.matched.filter(item => item.name) */
      meta: {
        keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
        auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
        title: '学习jsplumb' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
      }
    },
    {
      path: '/sysSetting', /* 首页 */
      component: sysSetting,
      name: 'sysSetting', /* this.$route.matched.filter(item => item.name) */
      meta: {
        keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
        auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
        title: '系统设置' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
      }
    },
    {
      path: '/companyHelp',
      component: companyHelp,
      name: 'companyHelp',
      meta: {
        keepAlive: false,
        auth: true
      }
    },
    {
      path: '/userCenter', /* 首页 */
      component: userCenter,
      name: 'userCenter',
      meta: {
        keepAlive: false,
        auth: true
      }
    },
    {
      path: '/flowTemplate', /* 404页面 */
      component: flowTemplate,
      name: 'flowTemplate'
    },
    {
      path: '/web404', /* 404页面 */
      component: NotFound,
      name: 'web404'
    },
    {
      path: '*', /* 默认跳转到登录界面 */
      redirect: {path: '/flowTemplate'}
    }
  ]
  // ,scrollBehavior(to, from, savedPosition) {// return 期望滚动到哪个的位置,第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop;
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 };
  //   }
  // }
});

router.beforeEach((to, from, next) => {// 注册一个全局前置守卫
  if (to.matched.some(m => m.meta.auth)) {// 判断是否需要校验
    if (store.state.isLogin) {// 获取
      next();// 校验通过，正常跳转到你设置好的页面
    } else {
      next({// 校验失败，跳转至登录界面
        path: '/login',
        query: {
          redirect: to.fullPath
        }// 将跳转的路由path作为参数，用于在登录成功后获取并跳转到该路径
      });
    }
  } else {
    next();// 不需要校验，直接跳转
  }
});

export default router;

/*
  $route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如 "/home/news" 。
  $route.params 对象，包含路由中的动态片段和全匹配片段的键值对
  $route.query 对象，包含路由中查询参数的键值对。例如，对于 /home/news/detail/01?favorite=yes ，会得到$route.query.favorite == 'yes' 。
  $route.router 路由规则所属的路由器（以及其所属的组件）。
  $route.matched 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。它会将嵌套它的父路由都匹配出来。
  $route.name  当前路径的名字，如果没有使用具名路径，则名字为空。
*/
