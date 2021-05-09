<template>
	<div id="taskList" :style="{'height': tableData.length==0?'661px':''}">
		<section>
			<p>我的任务</p>
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
					<div v-if="item.slot && item.prop=='explain'"><a>查看说明</a></div>
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
			:current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有任务明细～</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tabList: [{
						title: '今日任务数：',
						number: 6
					},
					{
						title: '今日任务指标完成率：',
						number: '75%'
					},
					{
						title: '今日任务指标待考核数：',
						number: 6
					},
					{
						title: '今日任务指标完成数：',
						number: 6
					}
				],

				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				tableColumn: [ // 表格列数据
					{
						label: '任务ID/子任务ID',
						prop: 'strengthName',
						width: '222'
					},
					{
						label: '任务名称',
						prop: 'specName',
						width: '153'
					},
					{
						label: '任务说明',
						prop: 'explain',
						width: '136',
						slot: true,
					},
					{
						label: '任务开始时间',
						prop: 'toothTypeName',
						width: '179'
					},
					{
						label: '任务结束时间',
						prop: 'surfaceTreatmentName',
						width: '179'
					},
					{
						label: '考核批次数',
						prop: 'materialName',
						width: '151'
					},
					{
						label: '{任务指标名称0}-完成率',
						prop: 'weight',
						width: '176'
					},
					{
						label: '{任务指标名称0}-完成率',
						prop: 'weight',
						width: '176',

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
				isShow: false
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
      go(row) {
        this.$router.push({
          path: `/task-center/task-dtl-list`,
          query: {
            id: row.id
          }
        })
      },
      goTarget(row) {
        this.$router.push({
          path: `/task-center/task-target-list`,
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

	#taskList {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		p {
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
