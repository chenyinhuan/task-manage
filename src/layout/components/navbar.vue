<template>
	<div id="navbar" class="navbar">
		<hamburger id="hamburger-container" class="hamburger-container" @toggleClick="toggleClickSideBar" />

		<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

		<div class="right-menu">
			<!-- <template>
				<search id="header-search" class="right-menu-item" />
			</template>
			<div class="right-menu-item">
				<img class="bell" src="@/images/my-task/bell.png">
			</div> -->
			<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
				<div class="avatar-wrapper">
					<img src="@/images/login/logo.png" class="user-avatar">
					<span class="name">吴彦祖</span>
					<img class="triangle" src="@/images/my-task/triangle.png">
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item divided @click.native="logout">
						<span style="display:block;">退出登录</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	import {
		mapGetters,
		mapActions,
	} from 'vuex'
	import Breadcrumb from '@/components/Breadcrumb'
	import Hamburger from '@/components/Hamburger'
	import Search from '@/components/HeaderSearch'
	export default {
		name: 'navbar',
		data() {
			return {}
		},
		components: {
			Breadcrumb,
			Hamburger,
			Search
		},
		computed: {
			...mapGetters([
				'avatar'
			])
		},
		methods: {
			...mapActions('module', ['toggleSideBar']),
			toggleClickSideBar() {
				this.toggleSideBar();
			},
			async logout() {
				await this.$store.dispatch('user/logout')
				this.$router.push(`/login?redirect=${this.$route.fullPath}`)
			}
		}
	}
</script>
<style lang="scss">
	@import '@/styles/variables.scss';

	#navbar {
		position: relative;
		height: 66px;
		overflow: hidden;
		background: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .06);

		.hamburger-container {
			line-height: 46px;
			height: 100%;
			float: left;
			cursor: pointer;
			transition: background .3s;
			-webkit-tap-highlight-color: transparent;

			&:hover {
				// background: rgba(0, 0, 0, .025)
			}
		}

		.breadcrumb-container {
			float: left;
		}

		.errLog-container {
			display: inline-block;
			vertical-align: top;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;

			&:focus {
				outline: none;
			}

			.right-menu-item {
				display: inline-block;
				height: 100%;
				font-size: 18px;
				color: #5a5e66;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background .3s;

					&:hover {
						// background: rgba(0, 0, 0, .025)
					}
				}
			}
			.bell {
				width: 28px;
				height: 30px;
				margin: 20px 18px 0px 23px;
			}
			
			.avatar-container {
				margin-right: 30px;
				height: 100%;
				color: #34335B;
				font-size: 14px;

				.avatar-wrapper {
					position: relative;
					height: 100%;
					display: flex;
					align-items: center;
					.user-avatar {
						cursor: pointer;
						width: 35px;
						height: 35px;
						border-radius: 50%;
					}

					.name {
						margin: 0px 8px 0px 10px;
					}

					.triangle {
						cursor: pointer;
						width: 18px;
						height: 15px;
					}
				}
			}
		}
	}
</style>
