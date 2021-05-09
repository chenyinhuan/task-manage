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
        <el-submenu index="1">
          <template slot="title">
            <img src="@/images/sider-bar/task.png"/>
            <span slot="title">任务中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == '1-1' && !isCollapse">我的任务</el-menu-item>
            <el-menu-item index="1-2"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == '1-2' && !isCollapse">我的派发任务</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <img src="@/images/sider-bar/field.png"/>
          <span slot="title">字段库管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <img src="@/images/sider-bar/targrt.png"/>
          <span slot="title">指标库管理</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <img src="@/images/my-task/m.png"/>
            <span slot="title">任务库管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == '4-1' && !isCollapse">任务列表</el-menu-item>
            <el-menu-item index="4-2"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == '4-2' && !isCollapse">任务模板</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5">
          <img src="@/images/sider-bar/report.png"/>
          <span slot="title">统计报表</span>
        </el-menu-item>
        <el-submenu index="6">
          <template slot="title">
            <img src="../../images/sider-bar/user.png"/>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == '6-1' && !isCollapse">账户配置</el-menu-item>
            <el-menu-item index="6-2"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == '6-2' && !isCollapse">角色配置</el-menu-item>
            <el-menu-item index="6-3"><img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == '6-3' && !isCollapse">组织配置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = {
            ...parent,
            path: '',
            noShowingChildren: true
          }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      },
      selectMenu(index, indexPath) {
        console.log(index, indexPath)
        this.activeMenu = index;
      }
    }
  }
</script>

<style lang="scss">
  @import '@/styles/var.scss';

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
