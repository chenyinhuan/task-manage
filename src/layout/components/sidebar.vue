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
        <template v-for="(item, index) in menuList">
          <el-submenu :index="item.index" :key="index" v-if="item.children && item.children.length>0">
            <template slot="title">
              <img v-if="!isCollapse || activeMenu.indexOf(`${item.index}-`) == -1" :src="item.img"/>
              <img :src="item.activeImg" v-if="isCollapse && activeMenu.indexOf(`${item.index}-`) != -1"/>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="`${item.index}-${cindex+1}`" @click="go(citem.path)" v-for="(citem, cindex) in item.children" :key="cindex">
                <img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == citem.index && !isCollapse">
                <span>{{citem.title}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="item.index" @click="go(item.path)" :key="index" v-else>
            <img v-if="activeMenu.indexOf(item.index) == -1" :src="item.img"/>
            <img :src="item.activeImg" v-if="activeMenu.indexOf(item.index) != -1"/>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import variables from '@/styles/variables.scss';
  import SidebarItem from './group/SidebarItem';
  import Cookies from 'js-cookie'
  export default {
    name: 'sidebar',
    components: {
      SidebarItem
    },
    data() {
      return {
        activeMenu: Cookies.get('activeMenu')?Cookies.get('activeMenu'):'task-1',
        menuList: []
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
      // this.generateRoutes();
    },
    watch: {
      permissionRoutes: {
        handler: function(route) {
          this.menuList = JSON.parse(JSON.stringify(route));
        },
        immediate: true
      }
    },
    methods: {
      ...mapActions('module', ['generateRoutes']),
      go(path) {
        Cookies.set('activePath',path)
        this.$router.push(path)
      },
      selectMenu(index, indexPath) {
        Cookies.set('activeMenu',index);
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
