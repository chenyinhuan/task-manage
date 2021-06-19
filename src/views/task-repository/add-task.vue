<template>
	<div id="addTask">
		<p class="title">任务信息</p>
		<section>
			<p>任务名称</p>
			<el-input v-model="form.taskName" placeholder="请输入任务名称" maxlength="20" show-word-limit></el-input>
		</section>
		<section>
			<p>任务说明</p>
			<el-input v-model="form.description" placeholder="请输入任务说明" maxlength="20" show-word-limit></el-input>
		</section>
		<section>
			<p>任务模版</p>
			<el-select v-model="form.taskTplId" placeholder="选择任务模版">
				<el-option v-for="(item,index) in taskTplList" :value="item.id" :key="index" :label="item.taskName">
				</el-option>
			</el-select>
		</section>
		<section>
			<p>覆盖时间</p>
			<div class="date-des">
				<span>任务开始时间</span>
				<span>任务开始时间</span>
			</div>
			<div>
				<el-date-picker v-model="form.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
					:clearable="false" placeholder="选择日期">
				</el-date-picker>
				<span style="margin: 0px 3px;">-</span>
				<el-date-picker v-model="form.endTime" type="datetime" :clearable="false"
					value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
				</el-date-picker>
			</div>
		</section>
		<section>
			<p>派发名单</p>
			<div class="assigment">
				<span v-for="(item,index) in form.users" :key="index"
					style="margin-right: 10px">{{item.username}}</span>
				<span class="add" @click="openDialog">+ 新增</span>
			</div>
		</section>
		<section>
			<p>任务类型</p>
			<el-radio-group v-model="form.recordType">
				<el-radio :label="1">单记录任务</el-radio>
				<el-radio :label="2">多记录任务</el-radio>
			</el-radio-group>
		</section>
		<div class="foot">
			<el-button type="primary" @click="submit">提交任务</el-button>
			<el-button class="cancel">取消</el-button>
		</div>
		<assigment ref="assigment" :data.sync="userList" @confirm="confirm"></assigment>
	</div>
</template>
<script>
	import assigment from '@/views/task-repository/group/assigment.vue'
	import {
		saveTask,
		getTasktpl
	} from '@/api/task-repository/index'
	import {
		getAccountList
	} from '@/api/user-manage/account'
	export default {
		components: {
			assigment
		},
		data() {
			return {
				visibleDialog: false,
				taskName: '',
				form: {
					taskName: '',
					taskTplId: '',
					recordType: '',
					startTime: '',
					endTime: '',
					users: []
				},
				taskTplList: [],
				userList: []
			}
		},
		created() {
			this.init()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			submit() {
				console.log(this.form)
				if (!this.form.taskName) return this.$message.warning('请输入任务名称');
				if (!this.form.recordType) return this.$message.warning('请输入任务类型');
				saveTask(this.form).then(res => {
					if (res.code == 0) {
						this.$message.success('保存成功')
						this.$router.go(-1)
					} else {
						this.$message.warning(res.msg)
					}
				})
			},
			confirm(val) {
				console.log(val)
				this.form.users = val
			},
			init() {
				getTasktpl().then(res => {
          if (res.code == 0) this.taskTplList = res.taskTplList
				})
				let params = {
					page: 1,
					limit: 1000,
					username: '',
					deptId: 1
				}
				getAccountList(params).then(res => {
          if (res.code == 0) this.userList = res.page.list;
          else return this.$message.warning(res.msg)
				})
			},
			openDialog() {
				this.$refs.assigment.open();
			},
			handleClose() {

			}
		}
	}
</script>
<style lang="scss">
	#addTask {
		// .el-table__header-wrapper tr th:nth-last-child(2) {
		//   text-align: center !important;
		// }
		// .el-table__row {
		//   td:nth-last-child(1) {
		//     text-align: center !important;
		//   }
		// }
	}
</style>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#addTask {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
		min-height: 768px;

		.title {
			font-size: 32px;
			line-height: 45px;
			color: #34335B;
			font-weight: bold;
			margin-bottom: 32px;
		}

		.foot {
			margin-top: 60px;

			.el-button {
				width: 124px;
				height: 40px;
				font-size: 18px;
				background: #0079FE;
				border-radius: 6px;

				&.cancel {
					background-color: #F8FAFB;
					color: #9596AB;
				}
			}
		}

		section {
			p {
				font-size: 20px;
				font-weight: 600;
				color: #34335B;
				line-height: 28px;
				margin-bottom: 20px;
			}

			.assigment {
				font-size: 14px;
				color: #34335B;
				padding: 20px 14px;
				background-color: #F8FAFB;
				margin-bottom: 32px;

				.add {
					background-color: #FFFFFF;
					line-height: 20px;
					padding: 0px 12px;
					margin-left: 20px;
					cursor: pointer;
				}
			}

			.date-des {
				display: flex;
				align-items: center;
				color: #E89003;
				font-size: 12px;
				margin-bottom: 8px;

				span:last-child {
					margin-left: 81px;
				}
			}

			.el-select {
				width: 160px;
				height: 32px;
				border-radius: 4px;
				margin-right: 15px;
				margin-bottom: 32px;

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

			.el-date-editor {
				position: relative;

				&.el-input {
					width: 175px;

					>>>.el-input__inner {
						padding-left: 10px;
					}

					>>>.el-input__prefix {
						left: unset;
						right: 0px;
						color: #333333;
					}
				}
			}
		}

		>>>.el-input__icon {
			line-height: 32px;
		}
	}
</style>
