<template>
  <div id="sidebar">
    <div class="sidebar-logo-container" :class="{'collapse':isCollapse}">
      <transition name="sidebarLogoFade">
        <span v-if="isCollapse" class="sidebar-logo-link" @click="goLogin">
          <img v-if="true" class="sidebar-logo" src="@/images/login/logo.png" />
          <h1 v-else class="sidebar-title">任务管理系统</h1>
        </span>
        <span v-else class="sidebar-logo-link" @click="goLogin">
          <img class="sidebar-logo" src="@/images/login/logo.png" />
          <h1 class="sidebar-title">任务管理系统</h1>
        </span>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" :class="{'collapse':isCollapse}">
      <!-- <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.subMenuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in permissionRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu> -->
      <el-menu :default-active="activeMenu" @select="selectMenu" class="el-menu-vertical-demo" :text-color="variables.menuText"
        :active-text-color="variables.subMenuActiveText" :collapse="isCollapse" :background-color="variables.menuBg">
        <template v-for="(item, index) in menuList" v-if="item.menuId != 1">
          <el-submenu :index="item.menuId+''" :key="index" v-if="item.list && item.list.length>0">
            <template slot="title">
              <img v-if="!isCollapse || activeMenu.indexOf(`${item.menuId}-`) == -1" :src="imgList[item.icon]" />
              <img :src="imgList[item.icon+'Active']" v-if="isCollapse && activeMenu.indexOf(`${item.menuId}-`) != -1" />
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="`${item.menuId}-${citem.menuId}`" @click="go(citem.url)" v-for="(citem, cindex) in item.list"
                :key="cindex">
                <img class="active-img" src="@/images/my-task/group.png" v-if="activeMenu == `${item.menuId}-${citem.menuId}` && !isCollapse">
                <span>{{citem.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="item.menuId+''" @click="go(item.url)" :key="index" v-else>
            <img v-if="activeMenu.indexOf(item.menuId) == -1" :src="imgList[item.icon]" />
            <img :src="imgList[item.icon+'Active']" v-if="activeMenu.indexOf(item.menuId) != -1" />
            <span slot="title">{{item.name}}</span>
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
  import {
    getNav
  } from '@/api/common/index.js'
  import {getUserInfo} from '@/api/common/index.js'
  export default {
    name: 'sidebar',
    components: {
      SidebarItem
    },
    data() {
      return {
        menuList: [],
        imgList: {
          task: require('../../images/sider-bar/task.png'),
          field: require('../../images/sider-bar/field.png'),
          targrt: require('../../images/sider-bar/targrt.png'),
          manage: require('../../images/sider-bar/manage.png'),
          user: require('../../images/sider-bar/user.png'),
          center: require('../../images/sider-bar/center.png'),
          database: require('../../images/sider-bar/database.png'),
          taskActive: require('../../images/sider-bar/task-active.png'),
          fieldActive: require('../../images/sider-bar/field-active.png'),
          targrtActive: require('../../images/sider-bar/targrt-active.png'),
          manageActive: require('../../images/sider-bar/manage-active.png'),
          userActive: require('../../images/sider-bar/user-active.png'),
          centerActive: require('../../images/sider-bar/center-active.png'),
          databaseActive: require('../../images/sider-bar/database-active.png'),
		  anchor: require('../../images/sider-bar/anchor.png'),
		  anchorActive: require('../../images/sider-bar/anchor-active.png')
        },
        userInfo: ''
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
      activeMenu() {
        return this.sidebar.activeMenu;
      },
      variables() {
        return variables
      },
    },
    created() {
      // this.generateRoutes();
      this.getMenu();
    },
    watch: {
      permissionRoutes: {
        handler: function(route) {
          // this.menuList = JSON.parse(JSON.stringify(route));
        },
        immediate: true
      },
    },
    methods: {
      ...mapActions('module', ['generateRoutes','setActiveMenu']),
      getMenu() {
		let menuList = localStorage.getItem('menuList');
		if(menuList) {
			this.menuList = JSON.parse(menuList);
		}else {
			getNav().then(res => {
			  if (res.code == 0) {
			    this.menuList = res.menuList;
				localStorage.setItem('menuList', JSON.stringify(this.menuList))
			  }
			})
		}
      },
      go(path) {
        Cookies.set('activePath', path)
        if(path && path.indexOf('/field-manage') != -1) localStorage.setItem('fieldtype', 1)
        this.$router.push(path)
      },
      selectMenu(index, indexPath) {
        console.log(index)
        this.setActiveMenu(index);
      },
      getUserInfo() {
      	getUserInfo().then(res => {
      		this.userInfo = res.user;
      		if(this.userInfo == null) this.$router.push('/login')
          else localStorage.setItem('userInfo',JSON.stringify(this.userInfo));
      	})
      },
      async goLogin() {
        let responseObj = await getUserInfo();
        if (responseObj.user == null) this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
        cursor: pointer;
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

    &.is-active,
    .is-active {
      background-color: #FFF9F4 !important;
    }

    &.is-active.is-opened {
      .active-img {
        display: none;
      }
    }

    &:hover,
    &:focus {
      background-color: #FFF9F4 !important;
    }
  }
</style>
