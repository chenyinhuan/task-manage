<template>
	<div id="login">
		<section class="main">
			<img src="@/images/login/login-bg.png">
			<div class="form">
				<img class="logo" src="@/images/login/logo.png">
				<p>任务管理系统</p>
				<div style="position: relative;"
					:class="[tip?'validate-error1':'',validate && password == ''?'validate-empty1':'']">
					<el-input v-model="phonenumber" placeholder="请输入登录账号" class="phone"
						@keyup.enter.native="enterPhone">
						<template slot="prepend">
							<div class="pre"><span>+86</span>
								<div class="line"></div>
							</div>
						</template>
					</el-input>
					<span v-if="validate && phonenumber == ''" class="error or">请填写登录账号</span>
					<el-input ref="psw" v-model="password" placeholder="请输入6至20位登录密码" maxlength="20" show-password
						class="password" @keyup.enter.native="goLogin">
					</el-input>
					<span v-if="validate && password == ''" class="error or">请填写登录密码</span>
					<span v-if="tip" class="error red">账号或密码错误</span>
				</div>
				<!-- <div class="forget-psd">忘记密码？</div> -->
				<div class="btn" @click="goLogin()">登录</div>
			</div>
		</section>
	</div>
</template>
<script>
	import {
		apiLogin
	} from '@/api/common/index.js'
	import {
		getNav
	} from '@/api/common/index.js'
	import Cookies from 'js-cookie'
	export default {
		data() {
			return {
				phonenumber: '',
				password: '',
				tip: false,
				validate: false
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			enterPhone() {
				this.$refs.psw.focus();
			},
			goLogin() {
				if (this.password == '' || this.phonenumber == '') return this.validate = true;
				let params = {
					password: this.password,
					username: this.phonenumber
				}
				apiLogin(params).then(res => {
					if (res.code == 500) {
						this.$message.warning(res.msg);
						if (res.msg != '账号已被锁定,请联系管理员') this.tip = true;
						return
					} else this.tip = false;
					if (res.code == 0) {
						this.$message.success('登录成功！');
						localStorage.removeItem('menuList');
						localStorage.removeItem('menuBtnList');
						if (this.$route.query.redirect) this.$router.push(this.$route.query.redirect)
						else {
							getNav().then(res => {
								if (res.code == 0) {
									if (res.menuList.length > 0 && res.menuList[0].menuId == 1 && res
										.menuList.length > 2) {
										if (res.menuList[0].list && res.menuList[1].list.length > 0) {
											this.$router.push(res.menuList[1].url);
										} else {
											this.$router.push(res.menuList[1].url);
										}
									} else if (res.menuList.length > 0 && res.menuList[0].menuId != 1) {
										if (res.menuList[0].list && res.menuList[0].list.length > 0) {
											this.$router.push(res.menuList[0].url);
										} else {
											this.$router.push(res.menuList[0].url);
										}
									}
								}
							})
						}
					}
				}).catch(e => {
					this.tip = true;
				})
			}
		}
	}
</script>
<style lang="scss">
	@import '@/styles/variables.scss';

	#login {
		background-color: #EEF1F4;
		width: 100%;
		height: 100%;
		min-width: 1000px;
		min-height: 700px;
		position: relative;

		.main {
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			-moz-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			-o-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			background-color: #FFFFFF;
			border-radius: 40px;
			width: 1000px;
			height: 700px;
			display: flex;

			img {
				width: 380px;
				height: 700px;
			}

			.form {
				margin: 0 auto;
				padding-top: 75px;
				text-align: center;

				.logo {
					width: 60px;
					height: 60px;
				}

				p {
					margin: 32px 0px 60px 0px;
					color: #34335B;
					font-size: 24px;
					line-height: 33px;
					font-weight: bold;
				}

				.el-input {
					margin-bottom: 22px;
					width: 400px;
					height: 58px;
					line-height: 58px;
					font-size: 16px;

					.el-input__clear {
						font-size: 16px;
					}

					.el-input__inner {
						width: 400px;
						height: 58px;
						background-color: #EEF1F4;
						font-size: 16px;
						// border-radius: 8px;
						border: 0px;
					}
				}

				.phone {

					.el-input-group__append,
					.el-input-group__prepend {
						background-color: #EEF1F4;
						border: 0px;
					}

					.el-input-group__prepend {
						padding: 0px 0px 0px 25px;
					}

					&.el-input {
						width: 330px;

						.el-input__inner {
							width: 330px;
							border-radius: 0px 8px 8px 0px;
							padding: 14px;
						}
					}

					.pre {
						display: flex;
						align-items: center;
					}

					.line {
						width: 1px;
						height: 30px;
						background-color: #CDCDD5;
						margin-left: 15px;
					}
				}

				.password {
					.el-input__inner {
						border-radius: 8px;
						padding: 25px;
						font-size: 16px;
					}
				}
			}

			.forget-psd {
				color: #0079FE;
				font-size: 14px;
				line-height: 20px;
				width: 400px;
				margin: 0 auto;
				text-align: right;
			}

			.btn {
				width: 400px;
				height: 58px;
				line-height: 58px;
				text-align: center;
				font-size: 18px;
				border-radius: 8px;
				color: #FAFAFB;
				background-color: #0079FE;
				margin: 22px auto 0px auto;
				cursor: pointer;
			}
		}

		.error {
			position: absolute;
			font-size: 12px;
			left: 110px;
			margin-top: 60px;

			&.red {
				color: $red;
			}

			&.or {
				color: $subMenuActiveText;
			}
		}
	}
</style>
