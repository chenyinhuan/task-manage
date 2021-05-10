<template>
	<div id="tasktemplate" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
      <div>
        <el-input v-model="keyword" placeholder="模版名称" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        <el-input v-model="keyword" placeholder="模版状态" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
      </div>
			<el-button type="primary" @click="go()">新增模板</el-button>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='weight'" class="percent">
						<div class="dot" :class="[scope.$index == 0?'green':'',scope.$index == 1?'grey':'']"></div><span> {{scope.$index == 1?'未上架':'正常'}}</span>
					</div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text">复制</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">下架</el-button>
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
						label: '模版ID',
						prop: 'strengthName',
					},
					{
						label: '模版名称',
						prop: 'specName',
					},
					{
						label: '模版说明',
						prop: 'explain',
					},
					{
						label: '模版状态',
						prop: 'weight',
						slot: true,
					},
					{
						label: '创建人/创建时间',
						prop: 'weight'
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
      go() {
        this.$router.push('/task-repository/add-template')
      }
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#tasktemplate {
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
      .el-table__header-wrapper tr th:nth-last-child(1) {
        text-align: center !important;
      }
      .el-table__row {
        td:nth-last-child(1) {
          text-align: center !important;
        }
      }
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
</style>
