<template>
	<div id="add">
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='dataType'">
						{{formatDataType(scope.row)}}
					</div>
					<div v-if="item.slot && item.prop=='source'">
						{{formatSource(scope.row)}}
					</div>
					<div v-if="item.slot && item.prop=='createUserName'">
						<p>{{scope.row.createUserName}}</p>
            <p>{{scope.row.createTime}}</p>
					</div>
					<div v-if="item.slot && item.prop=='updateUserName'">
						<p>{{scope.row.updateUserName}}</p>
            <p>{{scope.row.updateTime}}</p>
					</div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text" @click="editInfo(scope.row)">编辑</el-button>
						<el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
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
	import {deleteField} from '@/api/filed-manage/index.js'
	export default {
		props: {
		  keyword: {
		    type: String,
		    default: ''
		  }
		},
		data() {
			return {
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '字段显示名',
						prop: 'fieldName',
					},
					{
						label: '字段名称',
						prop: 'name',
					},
					{
						label: '数据类型',
						prop: 'dataType',
						slot: true,
					},
					{
						label: '来源字段',
						prop: 'source',
						slot: true,
					},
					{
						label: '创建人/创建时间',
						prop: 'createUserName',
						slot: true,
					},
					{
						label: '修改人/修改后时间',
						prop: 'updateUserName',
            slot: true
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
				dataType: this.$dataTypeList
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
			formatSource(item) {
        if(item.fieldTypeDTO) {
          let arr = [];
          arr = item.fieldTypeDTO.map(item => {
          	return item.name;
          })
          return arr.join('、')
        }
			},
			formatDataType(item) {
				let arr = [];
				if(item.fieldTypeDTO && item.fieldTypeDTO[0].type == 1) {
					arr.push('number')
				}else if(item.fieldTypeDTO && item.fieldTypeDTO[0].type == 2) {
					arr = item.fieldTypeDTO.map(item => {
						if(item.type == 1) {
							if(item.dataType == 1) return 'number'
						}else if(item.type == 2) {
							if(item.dataType == 1) return '字符串string'
							else if(item.dataType == 2) return '整数数值init'
							else if(item.dataType == 3) return '小数数值float'
							else if(item.dataType == 4) return '日期date'
							else if(item.dataType == 5) return '时间time'
						}else {
							if(item.dataType == 1) return 'Json数据'
						}
					})
				}else if(item.fieldTypeDTO && item.fieldTypeDTO[0].type == 3){
					arr.push('Json数据')
				}else arr.push('')
				// let newArr = [...new Set(arr)];
				return arr.join('、')
			},
			editInfo(item) {
				this.$router.push('/field-manage/add-field?type=' + item.type + '&id=' + item.id)
			},
			deleteInfo(item) {
				let _this = this;
				_this.$confirm(`删除后将无法恢复此字段的相关记录如果已经被调用将无法删除，希望删除请删除关联字段、指标和任务模版`, '是否确认删除字段？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.deleteItem(item);
				})
			},
			deleteItem(item) {
				console.log(item)
				let params = {
					id: item.id
				}
				deleteField(params).then(res => {
					if (res.code == 0) {
						this.$message.success('删除成功！');
						this.init();
					} else this.$message.warning(res.msg)
				})
			},
			init() {
				let params = {
					page: this.currentPage,
					limit: this.limit,
					type: 2,
					fieldName: this.keyword
				}
				getPageList(params).then(res => {
					this.isShow = true;
					if (res.code == 0) {
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
			search() {
				this.currentPage = 1;
				this.init();
			}
		}
	}
</script>
<style lang="scss">
	@import '@/styles/variables.scss';

	#add {
		.el-table {
			// .el-table__header-wrapper tr th:nth-last-child(1) {
			// 	text-align: center !important;
			// }

			// .el-table__row {
			// 	td:nth-last-child(1) {
			// 		text-align: center !important;
			// 	}
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
