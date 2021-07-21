<template>
	<div id="taskList" :style="{'height': tableData.length==0?'661px':''}">
		<section>
			<p class="tit">我的任务</p>
			<ul class="tab-list" v-if="tableData.length>0">
				<li class="tab-item" v-for="(item,index) in tabList" :key="index">
					<span class="tit">{{item.title}}</span><span class="num">{{item.number}}</span>
				</li>
			</ul>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
          <div v-if="item.slot && item.prop=='taskState'" class="percent">
            <div class="dot"
                 :class="[scope.row.taskState == 2?'green':'',scope.row.taskState == 3 || scope.row.taskState == 4?'grey':'',scope.row.taskState == 1?'blue':'']">
            </div><span>
							{{scope.row.taskState == 1?'待开始':''}}{{scope.row.taskState == 2?'进行中':''}}{{scope.row.taskState == 3?'已结束':''}}{{scope.row.taskState == 4?'已取消':''}}</span>
          </div>
					<div v-if="item.slot && item.prop=='description'" @click="viewDes(scope.row)"
						style="color: #0079FE;"><a>查看说明</a></div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="primary" @click.stop="go(scope.row)">进入任务</el-button>
					</div>
					<div v-if="item.slot && item.prop=='result'">
						<el-button type="primary" @click.stop="goTarget(scope.row)">查看</el-button>
					</div>
					<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
			:current-page.sync="currentPage" :page-size="limit" layout="prev, pager, next, jumper" :total="total">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有任务～</p>
		</div>
		<el-dialog class="add-dialog" title="任务说明" :visible.sync="visibleDialog" width="498px"
			:before-close="close">
			<div>
				<p class="">{{description}}</p>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="visibleDialog = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {
		getMyTaskList
	} from '@/api/task-center/my-task/index.js'
	export default {
		data() {
			return {
				tabList: [{
						title: '今日任务数：',
						number: 0
					},
					{
						title: '今日任务指标完成率：',
						number: '0%'
					},
					{
						title: '今日任务指标待考核数：',
						number: 0
					},
					{
						title: '今日任务指标完成数：',
						number: 0
					}
				],

				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '任务ID',
						prop: 'id',
						width: '222'
					},
					{
						label: '任务名称',
						prop: 'taskName',
						width: '153'
					},
					{
						label: '任务说明',
						prop: 'description',
						width: '136',
						slot: true,
					},
					{
						label: '任务开始时间',
						prop: 'startTime',
						width: '179'
					},
					{
						label: '任务结束时间',
						prop: 'endTime',
						width: '179'
					},
					{
						label: '任务状态',
            prop: 'taskState', // 任务状态 1：待开始, 2:进行中,3已结束,4已取消'
						width: '151',
						slot: true
					},
					{
						label: '任务指标完成率',
						prop: 'weight',
						width: '176'
					},
					{
						label: '任务指标考核结果',
						prop: 'result',
						slot: true,
						width: '176',
					},
					{
						label: '操作',
						prop: 'opt',
						slot: true,
					},
				],
				currentPage: 0,
				limit: 10,
				isShow: false,
				total: 0,
				description: '',
				visibleDialog: false,
				date: ''
			}
		},
		created() {
			if(this.$route.query.date) this.date = this.$route.query.date;
			this.init();
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			init() {
				let params = {
				limit: this.limit,
				page: this.currentPage
			}
			getMyTaskList(params).then(res => {
				if (res.code == 0) {
					this.tabList[0].number = res.task.todayTaskCount;
					this.tabList[1].number = res.task.completeRate;
					this.tabList[2].number = res.task.todayTargetCount;
					this.tabList[3].number = res.task.todayCompleteTargetCount;
					this.tableData = res.task.pageUtils.list;
					this.total = res.task.pageUtils.totalCount;
				}
			})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.limit = val;
				this.currentPage = 1;
				this.init();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.init()
			},
			go(row) {
				localStorage.setItem('recordUserId',row.userId)
				this.$router.push({
					path: `/task-center/task-dtl-list`,
					query: {
						id: row.id,
						date: this.date
					}
				})
			},
			goTarget(row) {
				localStorage.setItem('targetUserId', row.userId)
				this.$router.push({
					path: `/task-center/task-target-list`,
					query: {
						id: row.id,
						date: this.date
					}
				})
			},
			viewDes(row) {
				this.visibleDialog = true;
				this.description = row.description?row.description:``;
			},
			close() {
				this.description = '';
				this.visibleDialog = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#taskList {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		.tit {
			font-weight: bold;
			color: #292933;
			font-size: 20px;
			line-height: 28px;
		}

		.tab-list {
			display: flex;
			align-items: center;
			margin-top: 20px;
			position: relative;

			.tab-item {
				border: 1px solid #E2E2EA;
				border-radius: 8px;
				font-size: 15px;
				line-height: 21px;
				padding: 6px 14px;
				margin-right: 20px;

				.tit {
					color: #666777;
				}

				.num {
					font-weight: bold;
					color: #34335B;
				}
			}

			.date {
				position: absolute;
				right: 0px;
				display: flex;
				align-items: center;

				.img {
					border: 1px solid #E2E2EA;
					border-radius: 8px;
					width: 32px;
					height: 32px;
					box-sizing: border-box;
					text-align: center;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;

					img {
						width: 12px;
						height: 7px;
					}
				}

				.des {
					font-size: 16px;
					color: #666777;
					line-height: 22px;
					margin: 0px 14px;
				}
			}
		}

		.el-table {
			a {
				color: #0079FE;
				font-size: 14px;
				cursor: pointer;
			}

			.el-button {
				background-color: #0079FE;
				padding: 5px;
				// font-size: 12px;
			}
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
		  >>> .el-button--primary {
		    width: 124px;
		    height: 40px;
		    font-size: 18px;
		    background: #0079fe;
		    border-radius: 6px;
		  }
		}
	}
</style>
