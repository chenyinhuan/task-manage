<template>
	<div id="targetManage" :style="{'height': tableData.length==0?'661px':''}">
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
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
			<p>还没有数据接口～</p>
		</div>
	</div>
</template>
<script>
	import {
		getPageList,
	} from '@/api/database/index.js';
	export default {
		components: {},
		data() {
			return {
				keyword: '',
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '接口名称',
						prop: 'apiName',
					},
					{
						label: '请求参数',
						prop: 'params',
					},
					{
						label: '请求参数说明',
						prop: 'paramsDes',
					},
					{
						label: '返回参数',
						prop: 'responses',
					},
					{
						label: '返回参数说明',
						prop: 'responsesDes',
					},
				],
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
				getPageList(this.searchParams).then(res => {
					if (res.code == 0) {
						let arr = [];
						for (let i = 0; i < res.apis.length; i++) {
							let item = res.apis[i];
							// arr.push({
							//   apiName: item.apiName,
							//   apiId: item.apiId,
							//   params: item.params && item.params.length > 0?item.params[0].apiName:'',
							//   paramsDes: item.params && item.params.length > 0?item.params[0].description:'',
							//   responses: item.responses && item.responses.length > 0?item.responses[0].apiName:'',
							//   responsesDes: item.responses && item.responses.length > 0?item.responses[0].description:'',
							// })
							let tempArr = [];
							if (item.params && item.params.length && item.responses && item.responses.length) {
								if (item.params.length >= item.responses.length) {
									tempArr = item.params.map((citem, cindex) => {
										return {
											apiName: cindex == 0 ? item.apiName : '',
											apiId: item.apiId,
											params: citem.apiName,
											paramsDes: citem.description,
											responses: item.responses[cindex] ? item.responses[cindex]
												.apiName : '',
											responsesDes: item.responses[cindex] ? item.responses[cindex]
												.description : '',
										}
									})
								} else {
									tempArr = item.responses.map((citem, cindex) => {
										return {
											apiName: cindex == 0 ? item.apiName : '',
											apiId: item.apiId,
											params: item.params[cindex] ? item.params[cindex].apiName : '',
											paramsDes: item.params[cindex] ? item.params[cindex]
												.description : '',
											responses: citem.apiName,
											responsesDes: citem.description,
										}
									})
								}
							}
							console.log(tempArr)
							arr = [...arr, ...tempArr]
						}
						this.tableData = JSON.parse(JSON.stringify(arr))
						this.total = res.totalCount || 0;
					}else this.$message.warning(res.msg);
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
			search() {
				this.searchParams.page = 1;
				this.init();
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
