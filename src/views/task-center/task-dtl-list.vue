<template>
	<div id="taskDtlList" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<p>任务详情</p>
			<el-button type="primary" @click="add()" v-if="isShowBtn">新增记录</el-button>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="''+item.fieldId" :label="item.fieldName" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<!-- {{item.slot}}
					{{scope.row.fieldValue}} -->
					<div v-if="item.slot && item.fieldId=='opt'">
						<el-button type="text" @click="go('scan', scope.row, scope.$index)">查看</el-button>
						<el-button type="text" @click="go('edit', scope.row, scope.$index)" v-if="isShowBtn">编辑
						</el-button>
						<el-button type="text" @click="deleteItem(scope.row)" v-if="isShowBtn">删除</el-button>
					</div>
					<div v-if="item.slot && item.fieldId=='createTime'">{{ scope.row.createTime }}</div>
					<div v-if="!item.slot">
						<span
							v-if="scope.row.imgId && scope.row.imgId.findIndex(n => n == item.fieldId) == -1">{{ scope.row[item.fieldId] }}</span>
						<div v-else>
							<el-image :ref="'img' + item.fieldId + scope.$index"
								style="max-height: 20px;max-width: 20px;display: none;"
								:src="scope.row[item.fieldId] || ''"
								:preview-src-list="scope.row[item.fieldId]?[scope.row[item.fieldId]]:[]">
							</el-image>
							<el-button @click="scan('img' + item.fieldId + scope.$index)" type="text">
								{{scope.row[item.fieldId]?'查看':'-'}}</el-button>
						</div>
					</div>
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
				// taskTplFieldStructureDTOS: [],
				date: '',
				userId: localStorage.getItem('recordUserId'),
				isShowBtn: false,
				startTime: localStorage.getItem('taskStartTime') || '',
				endTime: localStorage.getItem('taskEndTime') || ''
			}
		},
		created() {

			if (this.$route.query.id) this.taskId = this.$route.query.id;
			if (this.$route.query.date) this.date = this.$route.query.date;
			this.init();
			let currentUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
			let taskState = localStorage.getItem('taskState') || ''
			// 登录账户与查询用户是不是同一个人
			// if (currentUserInfo && currentUserInfo.userId == this.userId) this.isShowBtn = true;
			// else this.isShowBtn = false;
      // 从我的任务进入的页面
			if (this.$route.path.indexOf('/my-assignment/') == -1) {
				if(taskState == 2) this.isShowBtn = true;
				else this.isShowBtn = false
			}else this.isShowBtn = false;
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
						userId: this.userId,
						startTime: this.startTime,
						endTime: this.endTime
					}
					/*
					, ...[{
						fieldName: '创建时间',
						slot: true,
						width: 165,
						fieldId: 'createTime'
					}, {
						fieldName: '操作',
						fieldId: 'opt',
						width: 140,
						slot: true
					}]
					 */
					getRecordList(params).then(res => {
						if (res.code == 0) {
							this.list = JSON.parse(JSON.stringify(res.record.page.list));
							this.taskTplFieldStructureDTOS = JSON.parse(JSON.stringify(res.record.taskTplFieldStructureDTOS));
							let taskTplFieldStructureDTOS = res.record.taskTplFieldStructureDTOS;
							let base = []; // 原生字段
							let complex = []; // 衍生字段
							let tempComplex = []; // 临时衍生字段
							// 展示前五个原生字段与允许展示的前五个衍生字段   注：从我派发的任务查看，是可以看到自己所有创建的衍生字段的，衍生字段的不可见只针对于被派发任务对象生效）
							let temp = [];
							// 从我派发的任务不需要判断是否显示字段
							taskTplFieldStructureDTOS.forEach(item => {
								if(item.fieldType == 1) base.push(item);
								else if(item.fieldType == 2) complex.push(item);
							})
							//
							temp = [...temp, ...base.slice(0,5)]
							if (this.$route.path.indexOf('/my-assignment/') == -1) {
								let tempIndex = 0;
								complex.forEach((item, index) => {
									if (item.fieldShowType == 1 && tempIndex<6) {
										tempComplex.push(item);
										tempIndex++
									}
								})
								temp = [...temp, ...tempComplex]
							}else temp = [...temp, ...complex]
							this.tableColumn = JSON.parse(JSON.stringify([...temp, ...[{
									fieldName: '创建时间',
									slot: true,
									width: 165,
									fieldId: 'createTime'
								}, {
									fieldName: '操作',
									fieldId: 'opt',
									width: 140,
									slot: true
								}]]))
							this.total = res.record.page.totalCount;
							let tableData = []
							for (let i = 0; i < res.record.page.list.length; i++) {
								let item = res.record.page.list[i];
								let json = {};
								let imgId = [];
								for (let j in this.tableColumn) {
									if (item.taskRecordEntities.find(n => n.fieldId == this.tableColumn[j]
											.fieldId)) {
										if (item.taskRecordEntities.find(n =>
												n.fieldId == this.tableColumn[j].fieldId).formType == 4) imgId
											.push(this.tableColumn[j].fieldId);
										json[`${this.tableColumn[j].fieldId}`] = item.taskRecordEntities.find(n =>
												n.fieldId == this.tableColumn[j].fieldId)
											.fieldValue;
									}
								}
								json.createTime = item.createTime;
								json.id = item.id;
								json.imgId = imgId;
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
				if (this.$route.path.indexOf('/my-assignment/') != -1) {
					this.$router.push({
						path: '/task-center/my-assignment/add-record',
						query: {
							taskId: this.taskId,
							date: this.date
						}
					})
				} else {
					this.$router.push({
						path: '/task-center/add-record',
						query: {
							taskId: this.taskId,
							date: this.date
						}
					})
				}

			},
			go(type, row, index) {
				if (type == 'scan') {
					// 详情页，查看全部的原生字段，被派发的只能查看显示状态的衍生字段
					let taskTplFieldStructureDTOS = [];
					let tempComplex = [];
					if(this.$route.path.indexOf('/my-assignment/') == -1) {
						this.taskTplFieldStructureDTOS.forEach(item => {
							if(item.fieldType == 1 || (item.fieldType == 2 && item.fieldShowType ==1)){
								taskTplFieldStructureDTOS.push(item);
							}
						})
					}else taskTplFieldStructureDTOS = JSON.parse(JSON.stringify(this.taskTplFieldStructureDTOS));
					localStorage.setItem('taskDtl', JSON.stringify({
						list: this.list[index],
						tableColumn: taskTplFieldStructureDTOS
					}))
				}
				if (type == 'scan') {
					if (this.$route.path.indexOf('/my-assignment/') != -1) {
						this.$router.push({
							path: '/task-center/my-assignment/task-dtl',
							query: {
								id: this.list[index].id,
								taskId: this.taskId,
							}
						})
					} else {
						this.$router.push({
							path: '/task-center/task-dtl',
							query: {
								id: this.list[index].id,
								taskId: this.taskId,
							}
						})
					}

				} else {
					if (this.$route.path.indexOf('/my-assignment/') != -1) {
						this.$router.push({
							path: '/task-center/my-assignment/add-record',
							query: {
								taskId: this.taskId,
								id: this.list[index].id,
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
			},
			scan(key) {
				console.log(this.$refs[key])
				this.$refs[key][0].showViewer = true
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
