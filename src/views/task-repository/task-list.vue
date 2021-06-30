<template>
	<div id="taskRepositoryList" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<div>
				<el-input v-model="searchParams.taskName" placeholder="任务名称" @keyup.enter.native="search"><i
						slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
				<!--        <el-input v-model="searchParams.taskState" placeholder="任务状态" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>-->
				<!--        <el-input v-model="searchParams.taskType" placeholder="任务来源" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>-->
				<el-select style="width: 160px;" v-model="searchParams.taskState" placeholder="任务状态" @change="search"
					clearable>
					<el-option v-for="item in taskStatus" :key="item.code" :label="item.label" :value="item.code">
					</el-option>
				</el-select>
				<el-select style="margin-left: 20px;width: 160px;" v-model="searchParams.taskType" placeholder="任务来源"
					@change="search" clearable>
					<el-option v-for="item in taskTypeList" :key="item.code" :label="item.label" :value="item.code">
					</el-option>
				</el-select>
			</div>
			<el-button type="primary" @click="addTask">新增任务</el-button>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='weight'" class="percent">
						<div class="dot"
							:class="[scope.$index == 0?'green':'',scope.$index == 1?'grey':'',scope.$index == 2?'blue':'']">
						</div><span>
							{{scope.$index == 0?'进行中':''}}{{scope.$index == 1?'已取消，已结束':''}}{{scope.$index == 2?'待开始':''}}</span>
					</div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text" v-if="scope.$index != 2" @click="goDetail(scope.row)">查看</el-button>
						<el-button type="text" v-if="scope.$index != 2" @click="edit(scope.row)">编辑</el-button>
						<el-button type="text" v-if="scope.$index != 2" @click="cancel(scope.row)">取消</el-button>
						<el-button type="text" v-if="scope.$index == 2" @click="viewDes(scope.row)">查看说明</el-button>
						<el-button type="text" v-if="scope.$index == 2" @click="openDialog(scope.row)">派发任务</el-button>
					</div>
					<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
			:current-page.sync="searchParams.page" :page-size="searchParams.limit" layout="prev, pager, next, jumper"
			:total="total">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有任务～</p>
		</div>
		<el-dialog class="add-dialog" title="任务说明" :visible.sync="visibleDialog" width="498px" :before-close="close">
			<div>
				<p class="">{{description}}</p>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="visibleDialog = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>
		<assigment ref="assigment" :data.sync="userList" @confirm="confirm"></assigment>
	</div>
</template>
<script>
	import assigment from '@/views/task-repository/group/assigment.vue'
	import {
		getTaskList,
		saveTask,
		cancelTask
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
				taskTypeList: [{
						code: 1,
						label: '自建'
					},
					{
						code: 2,
						label: '上级'
					}
				],
				taskStatus: [{
						code: 1,
						label: '待开始'
					},
					{
						code: 2,
						label: '进行中'
					},
					{
						code: 3,
						label: '已结束'
					},
					{
						code: 4,
						label: '已取消'
					}
				],
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '任务ID',
						prop: 'id',
					},
					{
						label: '任务名称',
						prop: 'taskName',
					},
					{
						label: '任务开始时间',
						prop: 'startTime',
					},
					{
						label: '任务结束时间',
						prop: 'endTime',
					},
					{
						label: '任务指标数',
						prop: 'targeCount',
						width: 90
					},
					{
						label: '派发人数',
						prop: 'userCount',
						width: 80
					},
					{
						label: '任务状态',
						prop: 'taskStatus', // 任务状态 1：待开始, 2:进行中,3已结束,4已取消'
						slot: true,
					},
					{
						label: '任务来源',
						prop: 'taskType',
						width: 113,
						slot: true,
					},
					{
						label: '创建人/创建时间',
						prop: 'createTime',
						width: 176
					},
					{
						label: '操作',
						prop: 'opt',
						slot: true,
					},
				],
				isShow: false,
				searchParams: {
					page: 1,
					limit: 10
				},
				total: 0,
				description: '',
				visibleDialog: false,
				userList: [],
				users: [],
				formData: {}
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
			confirm(val) {
				this.formData.users = val
				saveTask(this.formData).then(res => {
					if (res.code == 0) {
						this.$message.success('保存成功')
						this.init()
					} else {
						this.$message.warning(res.msg)
					}
				})
			},
			openDialog(item) {
				this.formData = item
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
				this.$refs.assigment.open();
			},
			init() {
				getTaskList(this.searchParams).then(res => {
					this.tableData = res.page.list
					this.total = res.page.totalCount
					this.isShow = true;
				}).catch(e => {
					this.isShow = true;
				})
			},
			handleSizeChange(val) {
				this.searchParams.limit = val
				this.init()
			},
			handleCurrentChange(val) {
				this.searchParams.page = val
				this.init()
			},
			search() {
				this.searchParams.page = 1;
				this.init()
			},
			addTask() {
				this.$router.push({
					path: '/task-repository/add-task'
				})
			},
			viewDes(row) {
				this.visibleDialog = true;
				this.description = row.description ? row.description : ``;
			},
			close() {
				this.description = '';
				this.visibleDialog = false;
			},
			cancel(item) {
				this.$confirm(`删除后将无法恢复此任务`, '是否确认取消任务？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					cancelTask({id: item.id}).then(res => {
						if(res.code == 0) return this.$message.success('取消成功！');
						else this.$message.warning(res.msg);
					})
				})
				
			},
			goDetail(item) {
				this.$router.push(`/task-repository/add-task?id=${item.id}&type=1`);
			},
			edit(item) {
				this.$router.push(`/task-repository/add-task?id=${item.id}&type=2`);
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#taskRepositoryList {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		.hd {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.el-button {
				background-color: #0079FE;
				color: #FFFFFF;
				font-size: 14px;
				margin-right: 20px;
			}

			.el-input {
				width: 160px;
				background-color: #F8FAFB;
				margin-right: 20px;

				>>>.el-input__inner {
					height: 40px;
					line-height: 40px;
					width: 160px;
					border-radius: 5px;
					background-color: #F8FAFB;
					border: 0px;
					font-size: 14px;
					padding-left: 43px;
				}

				>>>.el-input__prefix {
					left: 11px;
				}

				>>>.el-input__icon {
					font-size: 20px;
					line-height: 40px;
					color: #9596AB;
				}
			}
		}

		.el-table {
			// >>>.el-table__header-wrapper tr th:nth-last-child(1) {
			//   text-align: center !important;
			// }

			// >>>.el-table__row {
			//   td:nth-last-child(1) {
			//     text-align: center !important;
			//   }
			// }

			.el-button {
				// background-color: #0079FE;
				padding: 0px;
				color: #0079FE;
				font-size: 14px;
			}

			.percent {
				display: flex;
				align-items: center;

				span {
					margin-left: 6px;
				}

				.dot {
					width: 8px;
					height: 8px;
					border-radius: 50%;

					&.green {
						background-color: #21D487;
					}

					&.blue {
						background-color: #4AB1E1;
					}

					&.grey {
						background-color: #CDCDD5;
					}
				}
			}
		}

		.tempty {
			text-align: center;
			padding-top: 145px;

			img {
				width: 84px;
				height: 109px;
			}

			p {
				color: #9596AB;
				font-size: 20px;
				line-height: 28px;
				margin-top: 39px;
				font-weight: 400;
			}
		}

	}

	.add-dialog {
		>>>.el-dialog__body {
			padding: 0px;
		}

		p {
			font-size: 14px;
			padding: 16px 24px;
		}

		.dialog-footer {
			border-top: 1px solid #D9D9D9;
			padding: 12px 24px;
			margin: 32px 0px 0px;
			text-align: right;

			>>>.el-button--primary {
				width: 124px;
				height: 40px;
				font-size: 18px;
				background: #0079fe;
				border-radius: 6px;
			}
		}
	}
</style>
