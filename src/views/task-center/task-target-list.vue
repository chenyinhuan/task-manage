<template>
	<div id="taskTargetList" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<p>{{taskName}}</p>
			<span>累计考核批次：{{total}}</span>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='materialName'" class="percent">
						<div class="dot"
							:class="[scope.$index == 1?'green':'',scope.$index == 0?'red':'',scope.$index == 2?'blue':'']">
						</div><span> 完成（100%）</span>
					</div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="primary" @click="go(scope.row)">查看关联记录</el-button>
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
			<p>还没有任务指标～</p>
		</div>
	</div>
</template>
<script>
  import {getTaskTargetList} from '@/api/task-center/my-task/index.js'
	export default {
		data() {
			return {
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '任务指标名称',
						prop: 'taskTplTargeName',
						width: '174'
					},
					{
						label: '考核批次',
						prop: 'taskTplTargeBatch',
						width: '140'
					},
					{
						label: '关联记录数',
						prop: 'recordCount',
						width: '140',
					},
					{
						label: '考核开始时间',
						prop: 'startTime',
						width: '234'
					},
					{
						label: '考核结束时间',
						prop: 'endTime',
						width: '230'
					},
					{
						label: '任务指标完成情况',
						prop: 'materialName',
						width: '205',
						slot: true,
					},
					{
						label: '操作',
						prop: 'opt',
						slot: true,
					},
				],
				currentPage: 1,
        limit: 10,
        total: 0,
				isShow: false,
        taskId: '',
        taskTplId: '',
        taskName: ''
			}
		},
		created() {
      if(this.$route.query.id) this.taskId = this.$route.query.id;
      this.init();
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			handleSizeChange(val) {
				this.limit = val;
        this.currentPage = 1;
        this.init();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
        this.init();
			},
			go(row) {
				this.$router.push({
					path: `/task-center/task-dtl-list`,
					query: {
						id: row.id
					}
				})
			},
      init() {
        let params = {
          taskId: this.taskId,
          limit: this.limit,
          page: this.currentPage
        }
        getTaskTargetList(params).then(res => {
          if(res.code == 0) {
            this.tableData = res.taskTarget.page.list;
            this.total = res.taskTarget.page.totalCount;
            this.taskName = res.taskTarget.taskName
          }
        })
      }
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#taskTargetList {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		.hd {
			display: flex;
			align-items: center;

			p {
				font-weight: bold;
				color: #292933;
				font-size: 20px;
				line-height: 28px;
			}

			span {
				color: #666777;
				font-size: 15px;
				line-height: 21px;
				margin-left: 20px;
			}
		}

		.el-table {

			.el-button {
				background-color: #0079FE;
				padding: 5px;
				// font-size: 12px;
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

					&.red {
						background-color: #FC5555;
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
</style>
