<template>
	<div id="layout" :class="classObj">
		<sidebar class="sidebar-container"/>
		<div class="main-container">
		  <div class="fixed-header">
		    <navbar />
		  </div>
		  <view-main class="app-main"/>
		</div>
	</div>
</template>
<script>
	import {
		Navbar,
		Sidebar,
		ViewMain
	} from './components';
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		name: 'Layout',
		components: {
			Navbar,
			Sidebar,
			ViewMain
		},
		data() {
			return {
			}
		},
		computed: {
		  ...mapGetters({sidebar: 'module/sidebar'}),
		  classObj() {
		    return {
		      hideSidebar: !this.sidebar.opened,
		      openSidebar: this.sidebar.opened,
		      withoutAnimation: this.sidebar.withoutAnimation
		    }
		  }
		},
		watch: {
			
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
	#layout {
		height: 100%;
		display: flex;
		.fixed-header {
		  position: fixed;
		  top: 0;
		  right: 0;
		  z-index: 100;
		  width: calc(100% - 250px);
		  transition: width 0.28s;
		}
		&.hideSidebar .fixed-header {
		  width: calc(100% - 56px)
		}
		.app-main {
			background-color: #F8FAFB;
			width: 1620px;
		}
	}
</style>
