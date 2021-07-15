<template>
	<div id="myAssignment">
		<ul class="container">
			<li class="container-item" v-for="(item,index) in countList" :key="index"
				:style="{'background-color': item.bgColor}">
				<div class="item-tit"><img :src="item.imageUrl"><span class="tit">{{item.title}}</span></div>
				<div class="count">{{item.number}}</div>
			</li>
		</ul>
		<section class="content">
			<section class="hd">
				<p>我的派发任务</p>
				<el-input v-model="taskName" placeholder="任务名称" @keyup.enter.native="search"><i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
				<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
					v-for="(item,index) in tableColumn" :key="index">
					<template slot-scope="scope">
						<div v-if="item.slot && item.prop=='opt'">
							<el-button type="primary" @click.stop="go(scope.row)">查看明细</el-button>
						</div>
						<div v-if="item.slot && item.prop=='taskType'">
							{{scope.row.taskType == 1?'直接派发':''}}{{scope.row.taskType == 2?'由下级派发':''}}
						</div>
						<div v-if="item.slot && item.prop == 'taskTarget'">
							<span @click="editRow(scope.row)" style="color: #0079FE;cursor: pointer">管理</span>
						</div>
						<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				v-if="tableData.length>0" :current-page.sync="searchParams.page" :page-size="searchParams.limit"
				layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
			<div class="tempty" v-if="tableData.length==0 && isShow">
				<img src="@/images/my-task/illustration.png">
				<p>还没有任务～</p>
			</div>
		</section>
		<el-dialog title="任务指标管理" :visible.sync="dialogVisible" width="782px" :before-close="handleClose">
			<div class="dialog-content">
				<el-table ref="table" :data="tableData1" style="width: 100%; margin-top: 10px">
					<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
						v-for="(item, index) in tableColumn1" :key="index">
						<template slot-scope="scope">
							<div v-if="item.slot && item.prop == 'taskTargetState'">
								<span>{{$taskTargetState.find((n) => n.value == scope.row.taskTargetState).label}}</span>
							</div>
							<template v-if="item.slot && item.prop == 'delayTime'">
								<a v-if="scope.row.taskTargetState==3">{{scope.row.delayTime}}</a>
								<a style="color: #0079FE;" v-if="scope.row.taskTargetState==2"
									@click="editTime(scope.row)">{{scope.row.delayTime || '延迟时间'}}</a>
							</template>
							<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
						</template>

					</el-table-column>
				</el-table>
			</div>
			<span slot="footer" class="dialog-footer" style="border-top: 0px;">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmSelected">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="信息提示" :visible.sync="warningDialog" width="498px" :before-close="handleClose2">
			<div class="dialog-content">
				<div style="padding: 10px 0">修改任务考核指标结束时间会导致周期性考核任务的后续考核批次同步顺延，请确认修改后的时间处于任务的整体覆盖时间范围之内。</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="agree">我已知晓，确定修改</el-button>
			</span>
		</el-dialog>
		<el-dialog title="任务指标管理" :visible.sync="timeDialog" width="498px" :before-close="handleClose1">
			<div class="dialog-content" style="position: relative;">
				<el-date-picker v-model="newEndTime" :picker-options="endTimeRule" type="datetime" :clearable="false"
					value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
				</el-date-picker>
				<span style="color: #FF8C00;font-size: 12px;left: 0px;position: absolute;bottom: -22px;"
					v-if="showValidate && newEndTime == ''">请选择考核结束时间</span>
			</div>
			<span slot="footer" class="dialog-footer" style="border-top: 0px;">
				<el-button @click="timeDialog = false">取 消</el-button>
				<el-button type="primary" @click="confirmEdit">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import waite from '@/images/my-assignment/green-wait.png';
	import task from '@/images/my-task/task.png';
	import taskcomplete from '@/images/my-task/task-complete.png';
	import sending from '@/images/my-task/sending.png';
	import {
		getTaskList
	} from '@/api/task-repository/index'
	import {
		getTaskTargetListDialog,
		countRepo,
		updateDelayTime
	} from '@/api/task-center/my-task/index'
	export default {
		data() {
			return {
				warningDialog: false,
				newEndTime: '',
				timeDialog: false,
				dialogVisible: false,
				countList: [{
						imageUrl: waite,
						title: '进行中任务数',
						number: 0,
						bgColor: '#00B043'
					},
					{
						imageUrl: sending,
						title: '累计派发任务数',
						number: 0,
						bgColor: '#FF9300'
					},
					{
						imageUrl: taskcomplete,
						title: '任务指标完成率',
						number: '0%',
						bgColor: '#0089FE'
					},
					{
						imageUrl: task,
						title: '累计派发任务人数',
						number: 0,
						bgColor: '#FE642B'
					}
				],
				total: 0,
				tableData: [],
				tableData1: [],
				tableColumn1: [ // 表格列数据
					{
						label: '任务指标名称',
						prop: 'taskTplTargeName',
						width: 160
					},
					{
						label: '周期考核',
						prop: 'id',
					},
					{
						label: '批次',
						prop: 'taskTplTargeBatch',
					},
					{
						label: '考核状态',
						prop: 'taskTargetState',
						slot: true
					},
					{
						label: '考核结束时间',
						prop: 'endTime',
						width: 180
					},
					{
						label: '延期后考核结束时间',
						prop: 'delayTime',
						slot: true,
						width: 180
					},
				],
				tableColumn: [ // 表格列数据
					{
						label: '任务ID',
						prop: 'id',
					},
					{
						label: '任务名称',
						prop: 'taskName',
						width: '230',
					},
					{
						label: '派发类型',
						prop: 'taskType',
						slot: true
					},
					{
						label: '任务开始时间',
						prop: 'startTime',
						width: '210'
					},
					{
						label: '任务结束时间',
						prop: 'endTime',
						width: '210',
					},
					{
						label: '派发人数',
						prop: 'userCount',
						width: '150',
					},
					{
						label: '任务指标',
						prop: 'taskTarget',
						width: '150',
						slot: true,
					},
					{
						label: '操作',
						prop: 'opt',
						slot: true,
					},
				],
				currentPage: 0,
				isShow: false,
				taskName: '',
				searchParams: {
					page: 1,
					limit: 10
				},
				currentRow: '',
				endTimeRule: {
					disabledDate: time => {
						console.log(this.currentRow.endTime)
						if (this.currentRow.endTime) {
							return (
								time.getTime() < new Date(this.currentRow.endTime).getTime()
							);
						} else {
							return time.getTime() + 86400000 < Date.now();
						}
					},
				},
				showValidate: false
			}
		},
		created() {
			this.init()
			this.getCount()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			getCount() {
				countRepo().then(res => {
					if (res.code == 0) {
						this.countList[0].number = res.senderCount.taskInProcessCount;
						this.countList[1].number = res.senderCount.taskSendCount;
						this.countList[2].number = res.senderCount.taskCompletePercent;
						this.countList[3].number = res.senderCount.taskUserCount;
					}
				})
			},
			agree() {
				this.warningDialog = false
				this.timeDialog = true
			},
			editTime(item) {
				this.currentRow = item;
				this.newEndTime = item.delayTime || ''
				this.warningDialog = true
			},
			editRow(item) {
				getTaskTargetListDialog({
					taskId: item.id
				}).then(res => {
					if (res.code == 0) {
						this.tableData1 = [];
						if (res.taskTarget.page && res.taskTarget.page.list.length > 0) {
							res.taskTarget.page.list.forEach(item => { // 只显示进行中和已结束数据，已结束状态数据不能延期
								if (item.taskTargetState == 2 || item.taskTargetState == 3) this.tableData1
									.push(item);
							})
						}
					}
				})
				this.dialogVisible = true
			},
			handleClose2() {
				this.warningDialog = false
			},
			handleClose1() {
				this.timeDialog = false
			},
			handleClose() {
				this.dialogVisible = false;
			},
			confirmSelected() {
				// 修改时间接口
				this.dialogVisible = false;
			},
			confirmEdit() {
				// 调用修改时间接口
				if (this.newEndTime == '') return this.showValidate = true
				else this.showValidate = false;
				let params = {
					taskTargetId: this.currentRow.id,
					delayTime: this.newEndTime
				}
				updateDelayTime(params).then(res => {
					if (res.code == 0) {
						this.$message.success('修改成功');
						this.dialogVisible = false;
						this.timeDialog = false;
					} else this.$message.warning(res.msg);
				})
			},
			init() {
				getTaskList({...{taskName: this.taskName},...this.searchParams}).then(res => {
					if(res.code == 0) {
						this.tableData = res.page.list
						this.total = res.page.totalCount
					}
					this.isShow = true;
				})
			},
			handleSizeChange(val) {
				this.searchParams.limit = val
				this.searchParams.page = 1;
				this.init()
			},
			handleCurrentChange(val) {
				this.searchParams.page = val
				this.init()
			},
			search() {
				console.log(this.taskName);
				this.searchParams.page = 1;
				this.init()
			},
			go(row) {
				this.$router.push({
					path: '/task-center/my-assignment-list',
					query: {
						id: row.id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#myAssignment {
		padding: 30px;

		.container {
			display: flex;
			align-items: center;

			&-item {
				width: 256px;
				height: 114px;
				color: #FFFFFF;
				font-size: 15px;
				border-radius: 14px;
				padding: 14px 20px 16px 20px;
				margin-left: 20px;

				&:first-child {
					margin-left: 0px;
				}

				.item-tit {
					display: inline-flex;
					align-items: center;

					img {
						width: 36px;
						height: 36px;
						margin-right: 10px;
					}

					.tit {}
				}

				.count {
					font-size: 30px;
					line-height: 42px;
					font-weight: bold;
					text-align: center;
				}
			}
		}

		.content {
			width: 1390px;
			height: 897px;
			margin-top: 20px;
			background-color: #FFFFFF;
			border-radius: 12px;
			box-sizing: border-box;
			box-shadow: 0px 2px 3px 2px rgba(0, 0, 0, 0.03);
			padding: 36px 49px 80px 46px;

			.hd {
				display: flex;
				align-items: center;
				justify-content: space-between;

				p {
					font-weight: bold;
					color: #292933;
					font-size: 20px;
					line-height: 28px;
				}

				.el-input {
					width: 160px;
					background-color: #F8FAFB;

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

				.el-button {
					background-color: #0079FE;
					padding: 5px;
					font-size: 14px;
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
	}
</style>
