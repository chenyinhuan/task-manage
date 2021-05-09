import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout';
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) { // 路由错误信息拦截
  return routerPush.call(this, location).catch(error => error)
}
export const routes = [
  // pc登录
  {
    path: '/login',
    component: () => import( /* webpackChunkName: "login" */ '@/views/login/index'),
    hidden: true,
    meta: {
      title: '登录',
      noCache: true
    }
  },
  {
    path: '/task-center',
    component: Layout,
    redirect: '/task-center/my-task',
    alwaysShow: true, // will always show the root menu
    name: 'TaskCenter',
    meta: {
      title: '任务中心',
      icon: 'lock',
    },
    children: [{
        path: 'my-task',
        component: () => import( /* webpackChunkName: "task-center" */ '@/views/task-center/my-task'),
        hidden: false,
        alwaysShow: true, // will always show the root menu
        name: 'MyTask',
        meta: {
          title: '我的任务',
        },
      },
      {
        path: 'task-list',
        component: () => import( /* webpackChunkName: "task-center" */ '@/views/task-center/task-list'),
        hidden: true,
        name: 'TaskList',
        meta: {
          title: '任务列表',
        },
      },
      {
        path: 'task-target-list',
        component: () => import( /* webpackChunkName: "task-center" */
          '@/views/task-center/task-target-list'),
        hidden: true,
        name: 'TaskTargetList',
        meta: {
          title: '任务指标列表',
        }
      },
      {
        path: 'task-dtl-list',
        component: () => import( /* webpackChunkName: "task-center" */
          '@/views/task-center/task-dtl-list'),
        hidden: true,
        name: 'TaskDtlList',
        meta: {
          title: '任务详情',
        },
      },
      {
        path: 'my-assignment-list',
        component: () => import( /* webpackChunkName: "task-center" */
          '@/views/task-center/my-assignment-list'),
        hidden: true,
        name: 'MyAssignmentList',
        meta: {
          title: '我的派发任务明细',
        }
      },
      {
        path: 'my-assignment',
        component: () => import( /* webpackChunkName: "task-center" */
          '@/views/task-center/my-assignment'),
        hidden: false,
        alwaysShow: true, // will always show the root menu
        name: 'MyAssignment',
        meta: {
          title: '我的派发任务',
        },
      },
      {
        path: 'task-dtl',
        component: () => import( /* webpackChunkName: "task-center" */
          '@/views/task-center/task-dtl'),
        hidden: true,
        name: 'TaskDtl',
        meta: {
          title: '查看',
        }
      },
      {
        path: 'add-record',
        component: () => import( /* webpackChunkName: "task-center" */
          '@/views/task-center/add-record'),
        hidden: true,
        name: 'AddRecord',
        meta: {
          title: '新增记录',
        }
      }
    ]
  },
  {
    path: '/field-manage',
    component: Layout,
    redirect: '/field-manage',
    name: 'FieldManage',
    meta: {
      title: '字段库管理',
      icon: 'lock',
    },
    children: [{
      path: '',
      component: () => import( /* webpackChunkName: "login" */ '@/views/field-manage/index'),
      hidden: false,
      meta: {
        title: '字段库管理',
        noCache: true
      }
    }]
  },
  {
    path: '/task-repository',
    component: Layout,
    redirect: '/task-repository/task-list',
    name: 'FieldManage',
    meta: {
      title: '任务库管理',
      icon: 'lock',
    },
    children: [{
        path: 'task-list',
        component: () => import( /* webpackChunkName: "login" */ '@/views/task-repository/task-list'),
        hidden: false,
        meta: {
          title: '任务列表',
          noCache: true
        }
      },
      {
        path: 'task-template',
        component: () => import( /* webpackChunkName: "login" */ '@/views/task-repository/task-template'),
        hidden: false,
        meta: {
          title: '任务模版',
          noCache: true
        }
      },
      {
        path: 'add-task',
        component: () => import( /* webpackChunkName: "login" */ '@/views/task-repository/add-task'),
        hidden: true,
        meta: {
          title: '新增任务',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/user-manage',
    component: Layout,
    redirect: '/user-manage',
    name: 'UserManage',
    meta: {
      title: '用户管理',
      icon: 'lock',
    },
    children: [
      {
        path: '',
        component: () => import( /* webpackChunkName: "UserManage" */ '@/views/user-manage/index'),
        hidden: false,
        meta: {
          title: '账户配置',
          noCache: true
        }
      },
      {
        path: 'add-account',
        component: () => import( /* webpackChunkName: "UserManage" */ '@/views/task-repository/task-list'),
        hidden: true,
        meta: {
          title: '新增账户',
          noCache: true
        }
      },
      {
        path: 'associated-anchor',
        component: () => import( /* webpackChunkName: "UserManage" */ '@/views/user-manage/associated-anchor'),
        hidden: true,
          title: '关联主播',
          meta: {
          noCache: true
        }
      },
      {
        path: 'organization-setting',
        component: () => import( /* webpackChunkName: "UserManage" */ '@/views/user-manage/organization-setting'),
        hidden: false,
        meta: {
          title: '组织配置',
          noCache: true
        }
      },
      {
        path: 'role-setting',
        component: () => import( /* webpackChunkName: "UserManage" */ '@/views/user-manage/role-setting'),
        hidden: false,
        meta: {
          title: '角色配置',
          noCache: true
        }
      },
      {
        path: 'role-permission-setting',
        component: () => import( /* webpackChunkName: "UserManage" */ '@/views/user-manage/role-permission-setting'),
        hidden: false,
        meta: {
          title: '角色权限配置',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/user-centers',
    component: () => import( /* webpackChunkName: "login" */ '@/views/login/index'),
    hidden: false,
    meta: {
      title: '个人中心',
      noCache: true
    }
  },
  // 匹配所有重定向首页
  {
    path: '*',
    redirect: '/task-center'
  }
]

const router = new Router({
  routes: routes
})
router.afterEach((to, from) => {});
router.beforeEach((to, from, next) => {
  console.log(to)
  next();
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    // router.replace(targetPath);
    location.reload();
  }
});
export default router
