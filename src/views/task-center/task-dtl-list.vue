<template>
	<div id="taskDtlList" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<p>任务详情</p>
			<el-button type="primary" @click="add()">新增记录</el-button>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="''+item.fieldId" :label="item.fieldName" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<!-- {{item.slot}}
					{{scope.row.fieldValue}} -->
					<div v-if="item.slot && item.fieldId=='opt'">
						<el-button type="text" @click="go('scan', scope.row, scope.$index)">查看</el-button>
						<el-button type="text" @click="go('edit', scope.row, scope.$index)">编辑</el-button>
						<el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
					</div>
					<div v-if="item.slot && item.fieldId=='createTime'">{{ scope.row.createTime }}</div>
					<div v-if="!item.slot">{{ scope.row[item.fieldId] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
			:current-page.sync="currentPage" :page-size="limit" layout="prev, pager, next, jumper" :total="total">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有任务详情～</p>
		</div>
	</div>
</template>
<script>
	import {
		getRecordList
	} from '@/api/task-center/my-task/index.js'
	import {
		removeTaskRecord
	} from '@/api/task-center/my-task/record.js'
	export default {
		data() {
			return {
				tableData: [],
				tableColumn: [],
				currentPage: 1,
				limit: 10,
				total: 0,
				isShow: false,
				taskId: '',
				list: [],
				taskTplFieldStructureDTOS: []
			}
		},
		created() {
			if (this.$route.query.id) this.taskId = this.$route.query.id;
			this.init()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			init() {
				if (this.taskId) {
					let params = {
						taskId: this.taskId,
						limit: this.limit,
						page: this.currentPage,
					}
					getRecordList(params).then(res => {
						if (res.code == 0) {
							this.list = JSON.parse(JSON.stringify(res.record.page.list));
							this.taskTplFieldStructureDTOS = JSON.parse(JSON.stringify(res.record
								.taskTplFieldStructureDTOS));
							res.record.taskTplFieldStructureDTOS = [...res.record.taskTplFieldStructureDTOS, ...[{
								fieldName: '创建时间',
								slot: true,
								fieldId: 'createTime'
							}, {
								fieldName: '操作',
								fieldId: 'opt',
								width: 140,
								slot: true
							}]]
							// this.tableData = res.record.page.list[0] ? res.record.page.list[0].taskRecordEntities : [];
							this.tableColumn = res.record.taskTplFieldStructureDTOS;
							this.total = res.record.page.totalCount;
							let tableData = []
							for (let i = 0; i < res.record.page.list.length; i++) {
								let item = res.record.page.list[i];
								let json = {};
								for (let j in this.tableColumn) {
									if (item.taskRecordEntities.find(n => n.fieldId == this.tableColumn[j]
											.fieldId)) {
				
										json[`${this.tableColumn[j].fieldId}`] = item.taskRecordEntities.find(n =>
												n.fieldId == this.tableColumn[j].fieldId)
											.fieldValue;
									}
								}
								json.createTime = item.createTime;
								json.id = item.id;
								tableData.push(json)
							}
							this.tableData = tableData;
							if (this.tableData.length == 0) this.isShow = true;
						} else this.isShow = true;
					})
				}
			},
			handleSizeChange(val) {
				this.currentPage = 1;
				this.limit = val;
				this.init();
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.init();
				console.log(`当前页: ${val}`);
			},
			add() {
				this.$router.push({
					path: '/task-center/add-record',
					query: {
						taskId: this.taskId
					}
				})
			},
			go(type, row, index) {
				if (type == 'scan') {
					localStorage.setItem('taskDtl', JSON.stringify({
						list: this.list[index],
						tableColumn: this.tableColumn
					}))
				}
				if (type == 'scan') {
					this.$router.push({
						path: '/task-center/task-dtl',
						query: {
							id: this.list[index].id
						}
					})
				} else {
					this.$router.push({
						path: '/task-center/add-record',
						query: {
							taskId: this.taskId,
							id: this.list[index].id,
						}
					})
				}

			},
			deleteItem(item) {
				console.log(item)
				this.$confirm(`确定删除该记录吗？`, {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: item.id
					}
					removeTaskRecord(params).then(res => {
						if (res.code == 0) {
							this.$message.success('删除成功！');
							this.currentPage = 1;
							this.init();
						} else this.$message.warning(res.mag);
					})
				})
			}
		}
	}
</script>
<style lang="scss">
	#taskDtlList {
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

	#taskDtlList {
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

			p {
				font-weight: bold;
				color: #292933;
				font-size: 20px;
				line-height: 28px;
			}

			.el-button {
				background-color: #0079FE;
				padding: 8px 21px;
				font-size: 14px;
			}
		}

		.el-table {
			.el-button {
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
</style>
