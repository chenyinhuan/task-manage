<template>
	<div id="add">
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text">编辑</el-button>
						<el-button type="text">删除</el-button>
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
			<p>还没有衍生字段～</p>
		</div>
	</div>
</template>
<script>
	import {
		getPageList
	} from '@/api/filed-manage/index.js'
	export default {
		data() {
			return {
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '字段显示名',
						prop: 'name',
					},
					{
						label: '字段名称',
						prop: 'address',
					},
					{
						label: '数据类型',
						prop: ''
					},
					{
						label: '来源字段',
						prop: 'weight',
						slot: true,
					},
					{
						label: '创建人/创建时间',
						prop: 'date',
						slot: true,
					},
					{
						label: '修改人/修改后时间',
						prop: 'date',
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
				isShow: false
			}
		},
		created() {
			this.init();
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			init() {
				let params = {
					start: this.currentPage,
					limit: this.limit,
					type: 2
				}
				getPageList(params).then( res => {
					this.isShow = true;
					if(res.code == 0) {
						this.tableData = res.page.list;
						this.total = res.page.totalCount;
					}
					
				})
			},
			handleSizeChange(val) {
				this.limit = val;
				this.currentPage = 1;
				this.init();
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.init();
				console.log(`当前页: ${val}`);
			},
		}
	}
</script>
<style lang="scss">
	@import '@/styles/variables.scss';

	#add {
		.el-table {
			.el-table__header-wrapper tr th:nth-last-child(2) {
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
