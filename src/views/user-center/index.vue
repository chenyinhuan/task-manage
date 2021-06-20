<template>
	<div id="userCenter">
		<section>
			<p>个人中心</p>
			<ul class="info">
				<li>
					<h3>账户名</h3>
					<p>{{userInfo.username}}</p>
				</li>
				<li>
					<h3>手机号</h3>
					<p>{{userInfo.mobile}}</p>
				</li>
				<li>
					<h3>密码</h3>
					<p><a @click="editPwd">修改</a></p>
				</li>
			</ul>
		</section>
		<el-dialog title="修改密码" :visible.sync="dialogVisible" width="498px" :close-on-click-modal="false" @close="close">
			<el-form :model="form" inline label-width="146px">
				<el-form-item label="原密码:" :class="[showValidate && form.password == ''?'validate-empty':'']">
					<el-input auto-complete="new-password" v-model="form.password" type="password" placeholder="原密码">
					</el-input>
					<span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.password == ''">请输入原密码{{form.password}}</span>
				</el-form-item>
				<el-form-item label="新密码:" :class="[showValidate && form.newPassword == ''?'validate-empty':'',
				showValidate && form.newPassword != '' && checkNewPassword?'validate-error':'']">
					<el-input auto-complete="new-password" v-model="form.newPassword" type="password"
						placeholder="设置6至20位登录密码"></el-input>
					<span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.newPassword == ''">请输入新密码</span>
					<span class="validate-info" style="color: #C03639;" v-if="showValidate && form.newPassword != '' && checkNewPassword">请输入正确新密码,支持6-20位字符</span>
				</el-form-item>
				<el-form-item label="确认新密码:" :class="[showValidate && form.newPassword != form.newConfirmPassword?'validate-error':'']">
					<el-input auto-complete="new-password" v-model="form.newConfirmPassword" type="password"
						placeholder="请再次输入登录密码"></el-input>
					<span class="validate-info" style="color: #C03639;" v-if="showValidate && form.newPassword != '' && form.newPassword != form.newConfirmPassword">两次密码输入不一致</span>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="close()">取 消</el-button>
				<el-button type="primary" @click="confirm()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import {
		resetPassword
	} from '@/api/user-center/index.js'
	export default {
		data() {
			return {
				dialogVisible: false,
				form: {
					password: '',
					newPassword: '',
					newConfirmPassword: ''
				},
				userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
				showValidate: false,
				checkNewPassword: false
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			editPwd() {
				this.dialogVisible = true
			},
			confirm() {
				if (!this.form.password || !this.form.newPassword) return this.showValidate = true;
				if(this.form.newPassword != this.form.newConfirmPassword) return this.showValidate = true;
				this.inputNewPassword();
				resetPassword(this.form).then(res => {
					if (res.code == 0) {
						this.$message.success('修改成功！');
						this.dialogVisible = false;
						this.showValidate = false;
					} else {
						this.$message.warning(res.msg);
					}
				})
			},
			close() {
				this.dialogVisible = false;
				this.showValidate = false;
				this.checkNewPassword = false;
				this.form = {
					password: '',
					newPassword: '',
					newConfirmPassword: ''
				}
			},
			inputNewPassword() {
				if(this.form.newPassword.length < 6 || this.form.newPassword.length > 20) this.checkNewPassword = true;
				else this.checkNewPassword = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#userCenter {
		padding: 40px 25px 36px 60px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
		min-height: 768px;

		>>>.el-dialog__header {
			text-align: center;
			font-size: 24px;
			color: #333333;
			padding: 40px 0 36px;

			.el-dialog__headerbtn {
				display: none;
			}
		}

		>>>.el-dialog__body {
			.el-form-item__label {
				font-size: 16px;
			}

			.el-form-item__content {
				position: relative;

				.validate-info {
					position: absolute;
					left: 0px;
					bottom: -30px;
				}
			}
		}

		>>>.el-dialog__footer {
			text-align: center;
			padding-bottom: 60px;
		}

		.foot {
			margin-top: 60px;

			.el-button {
				width: 124px;
				height: 40px;
				background: #0079FE;
				border-radius: 6px;
			}
		}

		.info {
			li {
				padding: 15px 0;

				h3 {
					font-size: 12px;
					line-height: 17px;
					color: #CDCDD5;
					margin-bottom: 4px;
				}

				p {
					font-size: 14px;
					line-height: 20px;
					color: #34335B;

					a {
						color: #0079FE;
					}
				}
			}
		}

		section {
			.add {
				font-size: 14px;
				font-weight: 500;
				color: #0079FE;
				line-height: 20px;
			}

			p {
				font-size: 20px;
				font-weight: 600;
				color: #34335B;
				line-height: 28px;
				margin-bottom: 20px;
			}

			.el-select {
				width: 181px;
				height: 32px;
				border-radius: 4px;
				margin-right: 15px;

				>>>.el-input__inner {
					font-size: 14px;
					padding-left: 8px;
					height: 32px;
					line-height: 32px;
				}

				>>>.el-input__icon {
					line-height: 30px;
				}
			}

			.el-input {
				width: 440px;
				height: 32px;
				border-radius: 4px;
				margin-bottom: 32px;

				>>>.el-input__inner {
					font-size: 14px;
					padding-left: 8px;
					height: 32px;
					line-height: 32px;
				}
			}
		}

	}
</style>
