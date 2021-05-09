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
				<el-input v-model="keyword" placeholder="考核批次" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
				<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
					v-for="(item,index) in tableColumn" :key="index">
					<template slot-scope="scope">
						<div v-if="item.slot && item.prop=='opt'">
							<el-button type="primary" @click.stop="go(scope.row)">查看明细</el-button>
						</div>
						<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				v-if="tableData.length>0" :current-page.sync="currentPage" :page-size="100"
				layout="prev, pager, next, jumper" :total="1000">
			</el-pagination>
			<div class="tempty" v-if="tableData.length==0 && isShow">
				<img src="@/images/my-task/illustration.png">
				<p>还没有任务明细～</p>
			</div>
		</section>
	</div>
</template>
<script>
	import waite from '@/images/my-assignment/green-wait.png';
	import task from '@/images/my-task/task.png';
	import taskcomplete from '@/images/my-task/task-complete.png';
	import sending from '@/images/my-task/sending.png';
	export default {
		data() {
			return {
				countList: [{
						imageUrl: waite,
						title: '进行中任务数',
						number: 6,
						bgColor: '#00B043'
					},
					{
						imageUrl: sending,
						title: '累计派发任务数',
						number: 78,
						bgColor: '#FF9300'
					},
					{
						imageUrl: taskcomplete,
						title: '任务指标完成率',
						number: '50%',
						bgColor: '#0089FE'
					},
					{
						imageUrl: task,
						title: '累计派发任务人数',
						number: 45,
						bgColor: '#FE642B'
					},
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
						label: '任务ID',
						prop: 'strengthName',
					},
					{
						label: '任务名称',
						prop: 'specName',
					},
					{
						label: '派发类型',
						prop: 'explain',
					},
					{
						label: '考核/应考核批次数',
            width: 210,
						prop: 'toothTypeName',
					},
					{
						label: '任务开始时间',
						prop: 'surfaceTreatmentName',
						width: '230'
					},
					{
						label: '任务结束时间',
						prop: 'materialName',
						width: '205',
						slot: true,
					},
					{
						label: '派发人数',
						prop: 'weight',
						width: '215',
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
				keyword: ''
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
			search() {
				console.log(this.keyword)
			},
      go(row) {
        this.$router.push({
          path: '/task-center/my-assignment-list',
          query: {
            
          }
        })
      }
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/var.scss';

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
					font-size: 12px;
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
