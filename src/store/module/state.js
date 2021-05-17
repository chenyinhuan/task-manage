import Cookies from 'js-cookie'
export default {
    sidebar: {
		opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
		withoutAnimation: false
	},
	permissionRoutes: [
          {
            img: require('../../images/sider-bar/task.png'),
            activeImg: require('../../images/sider-bar/task-active.png'),
            index: 'task',
            title: '任务中心',
            path: '/task-center/my-task',
            children: [
              {
                index: 'task-1',
                title: '我的任务',
                path: '/task-center/my-task',
              },
              {
                index: 'task-2',
                title: '我的派发任务',
                path: '/task-center/my-assignment',
              }
            ]
          },
          {
            img: require('../../images/sider-bar/field.png'),
            activeImg: require('../../images/sider-bar/field-active.png'),
            index: 'field',
            title: '字段库管理',
            path: '/field-manage',
          },
          {
            img: require('../../images/sider-bar/targrt.png'),
            activeImg: require('../../images/sider-bar/targrt-active.png'),
            index: 'targrt',
            title: '指标库管理',
            path: '/targrt-manage',
          },
          {
            img: require('../../images/sider-bar/manage.png'),
            activeImg: require('../../images/sider-bar/manage-active.png'),
            index: 'manage',
            title: '任务库管理',
            path: '/task-repository/task-list',
            children: [
              {
                index: 'manage-1',
                title: '任务列表',
                path: '/task-repository/task-list',
              },
              {
                index: 'manage-2',
                title: '任务模板',
                path: '/task-repository/task-template',
              }
            ]
          },
          {
            img: require('../../images/sider-bar/user.png'),
            activeImg: require('../../images/sider-bar/user-active.png'),
            index: 'user',
            title: '用户管理',
            path: '/user-manage/account-config',
            children: [
              {
                index: 'user-1',
                title: '账户配置',
                path: '/user-manage/account-config',
              },
              {
                index: 'user-2',
                title: '角色配置',
                path: '/user-manage/role-setting',
              },
              {
                index: 'user-3',
                title: '组织配置',
                path: '/user-manage/organization-setting',
              }
            ]
          },
          {
            img: require('../../images/sider-bar/center.png'),
            activeImg: require('../../images/sider-bar/center-active.png'),
            index: 'center',
            title: '个人中心',
            path: '/user-center',
          }
        ],
};
    