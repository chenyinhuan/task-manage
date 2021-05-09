<template>
  <div id="sidebar">
    <div class="sidebar-logo-container" :class="{'collapse':isCollapse}">
      <transition name="sidebarLogoFade">
        <router-link v-if="isCollapse" key="collapse" class="sidebar-logo-link" to="/">
          <img v-if="true" class="sidebar-logo" src="@/images/login/logo.png" />
          <h1 v-else class="sidebar-title">任务管理系统</h1>
        </router-link>
        <router-link v-else key="expand" class="sidebar-logo-link" to="/">
          <img class="sidebar-logo" src="@/images/login/logo.png" />
          <h1 class="sidebar-title">任务管理系统</h1>
        </router-link>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" :class="{'collapse':isCollapse}">
      <!-- <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.subMenuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in permissionRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu> -->
      <el-menu :default-active="activeMenu" @select="selectMenu" class="el-menu-vertical-demo" :text-color="variables.menuText" :active-text-color="variables.subMenuActiveText" :collapse="isCollapse" :background-color="variables.menuBg">
        <el-submenu index="task">
          <template slot="title">
            <img v-if="!isCollapse || activeMenu.indexOf('task-') == -1" src="@/images/sider-bar/task.png"/>
            <img src="@/images/sider-bar/task-active.png" v-if="isCollapse && activeMenu.indexOf('task-') != -1"/>
            <span slot="title">任务中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="task-1" @click="go('/task-center/my-task')"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == 'task-1' && !isCollapse">我的任务</el-menu-item>
            <el-menu-item index="task-2" @click="go('/task-center/my-assignment')"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == 'task-2' && !isCollapse">我的派发任务</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="field" @click="go('/field-manage')">
          <img v-if="activeMenu.indexOf('field') == -1" src="@/images/sider-bar/field.png"/>
          <img src="@/images/sider-bar/field-active.png" v-if="activeMenu.indexOf('field') != -1"/>
          <span slot="title">字段库管理</span>
        </el-menu-item>
        <el-menu-item index="targrt">
          <img v-if="activeMenu.indexOf('targrt') == -1" src="@/images/sider-bar/targrt.png"/>
          <img v-if="activeMenu.indexOf('targrt') != -1" src="@/images/sider-bar/targrt-active.png"/>
          <span slot="title">指标库管理</span>
        </el-menu-item>
        <el-submenu index="manage">
          <template slot="title">
            <img v-if="!isCollapse || activeMenu.indexOf('manage-') == -1" src="@/images/sider-bar/manage.png"/>
            <img src="@/images/sider-bar/manage-active.png" v-if="isCollapse && activeMenu.indexOf('manage-') != -1"/>
            <span slot="title">任务库管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="manage-1"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == 'manage-1' && !isCollapse">任务列表</el-menu-item>
            <el-menu-item index="manage-2"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == 'manage-2' && !isCollapse">任务模板</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="report">
          <img v-if="activeMenu.indexOf('report') == -1" src="@/images/sider-bar/report.png"/>
          <img v-if="activeMenu.indexOf('report') != -1" src="@/images/sider-bar/report-active.png"/>
          <span slot="title">统计报表</span>
        </el-menu-item>
        <el-submenu index="user">
          <template slot="title">
            <img v-if="!isCollapse || activeMenu.indexOf('user-') == -1" src="../../images/sider-bar/user.png"/>
            <img v-if="isCollapse && activeMenu.indexOf('user-') != -1" src="@/images/sider-bar/user-active.png"/>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="user-1" @click="go('/user-manage/add-account')"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == 'user-1' && !isCollapse">账户配置</el-menu-item>
            <el-menu-item index="user-2" @click="go('/user-manage/role-setting')"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == 'user-2' && !isCollapse">角色配置</el-menu-item>
            <el-menu-item index="user-3" @click="go('/user-manage/organization-setting')"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == 'user-3' && !isCollapse">组织配置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="user">
          <img v-if="activeMenu.indexOf('user') == -1" src="@/images/sider-bar/user.png"/>
          <img v-if="activeMenu.indexOf('user') != -1" src="@/images/sider-bar/user-active.png"/>
          <span slot="title">个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import variables from '@/styles/variables.scss'
  import SidebarItem from './group/SidebarItem'
  export default {
    name: 'sidebar',
    components: {
      SidebarItem
    },
    data() {
      return {
        activeMenu: '1-1',
        menuList: [
          {
            img: '@/images/sider-bar/task.png',
            title: '任务中心',
            children: [
              {
                title: '我的任务',
              }
            ]
          }
        ]
      };
    },
    computed: {
      ...mapGetters({
        sidebar: 'module/sidebar',
        permissionRoutes: 'module/permissionRoutes',
      }),
      isCollapse() {
        return !this.sidebar.opened
      },
      variables() {
        return variables
      },
    },
    created() {
      this.generateRoutes();
    },
    watch: {
      permissionRoutes: {
        handler: function(route) {
          // console.log(route)
        },
        immediate: true
      }
    },
    methods: {
      ...mapActions('module', ['generateRoutes']),
      go(path) {
        this.$router.push(path)
      },
      selectMenu(index, indexPath) {
        console.log(index, indexPath)
        this.activeMenu = index;
      }
    }
  }
</script>

<style lang="scss">
  @import '@/styles/variables.scss';

  #sidebar {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-submenu__title {
      font-size: 15px;
    }
    .sys-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 66px;

      img {
        width: 24px;
        height: 24px;

      }

      span {
        margin-left: 12px;
        color: #34335B;
        font-size: 15px;
        font-weight: bold;
      }
    }

    .sidebar-logo-container {
      position: relative;
      width: 100%;
      height: 66px;
      line-height: 66px;
      text-align: center;
      overflow: hidden;

      & .sidebar-logo-link {
        height: 100%;
        width: 100%;

        & .sidebar-logo {
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-right: 12px;
        }

        & .sidebar-title {
          display: inline-block;
          margin: 0;
          margin-left: 12px;
          color: #34335B;
          font-size: 15px;
          font-weight: bold;
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
          vertical-align: middle;
        }
      }

      &.collapse {
        .sidebar-logo {
          margin-right: 0px;
        }
      }
    }
  }
  .el-menu {
    img {
      width: 16px;
      height: 16px;
      margin-right: 20px;
    }
    .active-img {
      width: 10px;
      height: 10px;
      margin-right: 14px;
      position: absolute;
      left: 25px;
    }
  }
  .el-menu-item {
    display: flex;
    align-items: center;
    &.is-active, .is-active {
      background-color: #FFF9F4 !important;
    }
    &.is-active.is-opened {
      .active-img {
        display: none;
      }
    }
    &:hover, &:focus {
      background-color: #FFF9F4 !important;
    }
  }

</style>
