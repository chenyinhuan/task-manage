<template>
	<div id="targetManage" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<div>
				<el-input v-model="keyword" placeholder="指标名称" @keyup.enter.native="search"><i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
			</div>
			<el-button type="primary" @click="addTask">新增</el-button>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='type'">
						<span>{{scope.row.type==1?'字段指标':'指标类指标'}}</span>
					</div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text" @click="edit(scope.row)">编辑</el-button>
						<el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
					</div>
					<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
			:current-page.sync="searchParams.page" :page-size="searchParams.limit" layout="prev, pager, next, jumper"
			:total="total">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有任务明细～</p>
		</div>
	</div>
</template>
<script>
	import {
		getTargeList,
		deleteTarget
	} from '@/api/target-manage/index';
	export default {
		components: {},
		data() {
			return {
				keyword: '',
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '指标名称',
						prop: 'targetName',
					},
					{
						label: '指标说明',
						prop: 'description',
					},
					{
						label: '数据类型',
						prop: 'type',
						slot: true,
					},
					{
						label: '创建人/创建时间',
						prop: 'createUserName',
					},
					{
						label: '修改人/修改后时间',
						prop: 'updateUserName',
					},
					{
						label: '操作',
						prop: 'opt',
						align: 'center',
						slot: true,
					},
				],
				currentPage: 1,
				isShow: false,
				searchParams: {
					page: 1,
					limit: 10
				},
				total: 0
			}
		},
		created() {
			this.init()
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			init() {
				getTargeList(this.searchParams).then(res => {
					this.tableData = res.page.list
					this.total = res.page.totalCount
				})
			},
			handleSizeChange(val) {
				this.searchParams.page = 1;
				this.searchParams.limit = val
				this.init()
			},
			handleCurrentChange(val) {
				this.searchParams.page = val
				this.init()
			},
			addTask() {
				this.$router.push({
					path: '/target-manage/add-target'
				})
			},
			search() {
				this.searchParams.page = 1;
				this.init();
				console.log(this.keyword)
			},
			deleteItem(item) {
				let _this = this;
				_this.$confirm(`删除后将无法恢复此指标的相关记录，如果已经被调用将无法删除，希望删除请删除关联指标和任务模版`, '是否确认删除指标？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteTarget({id: item.id}).then(res => {
						if(res.code == 0) {
							_this.$message.success('删除成功');
							this.searchParams.page = 1;
							_this.init();
						}
						else _this.$message.warning(res.msg);
					})
				})
			},
			edit(item) {
				this.$router.push(`/target-manage/add-target?id=${item.id}&type=${item.type}`)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#targetManage {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		.hd {
			font-size: 20px;
			line-height: 28px;
			color: #34335B;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.el-input {
				width: 160px;
				height: 40px;
				line-height: 40px;
				border-radius: 6px;

				>>>.el-input__inner {
					background: #F8FAFB;
					height: 40px;
					line-height: 40px;
				}

				>>>.el-input__prefix {
					color: #9596AB;
				}
			}

			.left {
				display: inline-flex;
				position: relative;

				div {
					cursor: pointer;
					position: relative;
				}

			}

			.right {
				.el-button {
					background-color: #0079FE;
					padding: 13px 29px;
					font-size: 14px;
					margin-right: 14px;
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

			.item-add {
				margin-left: 20px;
			}

			.active {
				color: #FF8C00;

				&::after {
					content: "";
					height: 3px;
					width: 12px;
					background-color: #FF8C00;
					position: absolute;
					bottom: -4px;
					left: 34px;
				}
			}
		}

	}
</style>
