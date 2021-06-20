<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path + index">
        <span v-if="!item.active" class="no-redirect">{{ item.name.indexOf('新增') != -1  && $route.query.id?item.name.replace('新增','编辑'):item.name}}</span>
        <a v-else @click.prevent="handleLink(item)" style="font-weight: bold;color:#34335B;">{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: [],
      routes: [
        {
          // 任务日历
          path: '/task-center/my-task',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            // {
            //   name: '我的任务中心',
            //   path: '',
            //   active: false
            // },
            {
              name: '我的任务',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务列表
          path: '/task-center/task-list',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            {
              name: '我的任务',
              path: '',
              active: false
            },
            {
              name: '我的列表',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务指标列表
          path: '/task-center/task-target-list',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            {
              name: '我的任务',
              path: '',
              active: false
            },
            {
              name: '任务列表',
              path: '',
              active: false
            },
            {
              name: '任务指标列表',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务详情列表
          path: '/task-center/task-dtl-list',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            {
              name: '我的任务',
              path: '',
              active: false
            },
            {
              name: '任务列表',
              path: '',
              active: false
            },
            {
              name: '任务详情',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务详情-查看
          path: '/task-center/task-dtl',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            {
              name: '我的任务',
              path: '',
              active: false
            },
            {
              name: '任务列表',
              path: '',
              active: false
            },
            {
              name: '任务详情',
              path: '',
              active: false
            },
            {
              name: '查看',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务详情-新增记录
          path: '/task-center/add-record',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            {
              name: '我的任务',
              path: '',
              active: false
            },
            {
              name: '任务列表',
              path: '',
              active: false
            },
            {
              name: '任务详情',
              path: '',
              active: false
            },
            {
              name: '新增记录',
              path: '',
              active: false
            }
          ]
        },
        {
          // 我的派发任务
          path: '/task-center/my-assignment',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            {
              name: '我的派发任务',
              path: '',
              active: false
            }
          ]
        },
        {
          // 派发任务明细
          path: '/task-center/my-assignment-list',
          matched: [
            {
              name: '任务中心',
              path: '/task-center/my-task',
              active: true
            },
            {
              name: '我的派发任务',
              path: '',
              active: false
            },
            {
              name: '派发任务明细',
              path: '',
              active: false
            }
          ]
        },
        {
          // 字段库管理
          path: '/field-manage',
          matched: [
            {
              name: '字段库管理',
              path: '/field-manage',
              active: true
            }
          ]
        },
        {
          // 字段库管理-新增字段
          path: '/field-manage/add-field',
          matched: [
            {
              name: '字段库管理',
              path: '/field-manage',
              active: true
            },
            {
              name: '新增字段',
              path: '/field-manage/add-field',
              active: false
            }
          ]
        },
        {
          // 指标库管理
          path: '/target-manage',
          matched: [
            {
              name: '指标库管理',
              path: '/target-manage',
              active: true
            }
          ]
        },
        {
          // 指标库管理-新增指标
          path: '/target-manage/add-target',
          matched: [
            {
              name: '新增指标',
              path: '/target-manage',
              active: true
            },
            {
              name: '新增指标',
              path: '/target-manage/add-target',
              active: false
            }
          ]
        },
        {
          // 任务库管理
          path: '/task-repository/task-list',
          matched: [
            {
              name: '任务库管理',
              path: '/task-repository/task-list',
              active: true
            },
            {
              name: '任务列表',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务库管理-新增任务
          path: '/task-repository/add-task',
          matched: [
            {
              name: '任务库管理',
              path: '/task-repository/task-list',
              active: true
            },
            {
              name: '任务列表',
              path: '',
              active: false
            },
            {
              name: '新增任务',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务库管理-任务模板
          path: '/task-repository/task-template',
          matched: [
            {
              name: '任务库管理',
              path: '/task-repository/task-list',
              active: true
            },
            {
              name: '任务模板',
              path: '',
              active: false
            }
          ]
        },
        {
          // 任务库管理-新增模板
          path: '/task-repository/add-template',
          matched: [
            {
              name: '任务库管理',
              path: '/task-repository/task-list',
              active: true
            },
            {
              name: '任务模板',
              path: '',
              active: false
            },
            {
              name: '新增模板',
              path: '',
              active: false
            }
          ]
        },
        {
          // 用户管理-账户配置
          path: '/user-manage/account-config',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '账户配置',
              path: '',
              active: false
            },
          ]
        },
        {
          // 用户管理-新增账户
          path: '/user-manage/add-account',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '账户配置',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '新增',
              path: '',
              active: false
            },
          ]
        },
        {
          // 用户管理-关联主播
          path: '/user-manage/associated-anchor',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '账户配置',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '关联主播',
              path: '',
              active: false
            },
          ]
        },
        {
          // 用户管理-组织配置
          path: '/user-manage/organization-setting',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '组织配置',
              path: '',
              active: false
            }
          ]
        },
        {
          // 用户管理-新增组织
          path: '/user-manage/add-organization',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '组织配置',
              path: '/user-manage/organization-setting',
              active: true
            },
            {
              name: '新增',
              path: '',
              active: false
            }
          ]
        },
        {
          // 用户管理-角色配置
          path: '/user-manage/role-setting',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '角色配置',
              path: '',
              active: false
            }
          ]
        },
        {
          // 用户管理-新增角色
          path: '/user-manage/add-role',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '角色配置',
              path: '/user-manage/role-setting',
              active: true
            },
            {
              name: '新增',
              path: '',
              active: false
            }
          ]
        },
        {
          // 用户管理-权限配置
          path: '/user-manage/role-permission-setting',
          matched: [
            {
              name: '用户管理',
              path: '/user-manage/account-config',
              active: true
            },
            {
              name: '角色配置',
              path: '/user-manage/role-setting',
              active: true
            },
            {
              name: '权限配置',
              path: '',
              active: false
            }
          ]
        },
        {
          // 个人中心
          path: '/user-center',
          matched: [
            {
              name: '个人中心',
              path: '/user-center',
              active: true
            }
          ]
        },
      ]
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.routes.find(item => item.path == this.$route.path);
      this.levelList = matched.matched;
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 66px;

  .no-redirect {
    color: #97A8BE;
    cursor: text;
  }
}
</style>
