<template>
	<div id="associatedAnchor" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<div>
				<el-input v-model="keyword" placeholder="请输入主播名" @keyup.enter.native="search"><i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
			</div>
			<div class="upload">
				<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
					:on-exceed="handleExceed">
					<el-button class="excel" size="small">Excel模版</el-button>
				</el-upload>
				<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
					:on-exceed="handleExceed">
					<el-button size="small" type="primary">导入主播名单</el-button>
				</el-upload>
				<el-button size="small" type="primary" @click="addAnchor">新增主播</el-button>
			</div>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='weight'" class="percent">
						<div class="dot" :class="[scope.$index == 0?'green':'',scope.$index == 1?'grey':'']"></div>
						<span> {{scope.$index == 1?'未上架':'正常'}}</span>
					</div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text" @click="editItem(scope.row)">编辑</el-button>
						<el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
					</div>
					<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-button class="associated" type="primary"  v-preventReClick>保存关联</el-button>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
			:current-page.sync="currentPage" :page-size="limit" layout="prev, pager, next, jumper" :total="total">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有任务明细～</p>
		</div>
		<el-dialog class="add-dialog" :title="isEdit?'编辑主播':'新增主播'" :visible.sync="addDialog" width="782px" :before-close="handleClose">
			<div class="add">
				<el-input v-model="name"></el-input>
				<span v-if="tip" class="error">主播名称已存在!</span>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="confirm">确 定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					userName: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					userName: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					userName: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					userName: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				tableColumn: [ // 表格列数据
					{
						label: '主播名称',
						prop: 'userName',
					},
					{
						label: '关联账号',
						prop: 'specName',
					},
					{
						label: '创建人',
						prop: 'explain',
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
        limit: 10,
        total: 0,
				isShow: false,
				keyword: '',
				addDialog: false,
				name: '',
				tip: false,
        isEdit: false,
        currentRow: ''
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			handleExceed() {

			},
      init() {

      },
			handleSizeChange(val) {
        this.limit = val;
        this.currentPage = 1;
        this.init();
			},
			handleCurrentChange(val) {
        this.currentPage = val;
        this.init();
			},
			search() {
				console.log(this.keyword)
        this.currentPage = 1;
        this.init();
			},
			addAnchor() {
				this.addDialog = true;
			},
			confirm() {
				this.tip = true;
				this.handleClose();
			},
      editItem(item) {
        this.isEdit = true;
        this.currentRow = item;
        this.name = this.currentRow.name;
        this.addDialog = true;
      },
      deleteItem(item) {
        this.$confirm(`确定删除该主播吗？`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        })
      },
			handleClose() {
				this.addDialog = false;
        this.isEdit = false;
				this.tip = false;
				this.name = '';
			}
		}
	}
</script>
<style lang="scss">
	.dialog-footer {
		border-top: 1px solid #D9D9D9;
		padding: 12px 24px;
		margin: 32px 0px 0px;
		text-align: right;

		>>>.el-button--primary {
			width: 124px;
			height: 40px;
			font-size: 18px;
			background: #0079fe;
			border-radius: 6px;
		}
	}
</style>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#associatedAnchor {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
		min-height: 768px;

		.associated {
			position: absolute;
			margin-top: 32px;
		}

		.hd {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.upload {
				display: flex;
				align-items: center;
			}

			.el-button {
				width: 124px;
				background-color: #0079FE;
				color: #FFFFFF;
				font-size: 14px;
				margin-right: 20px;

				&.excel {
					color: #666777;
					background: #F8FAFB;
					border-color: #F8FAFB;
				}
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
			// .el-table__header-wrapper tr th:nth-last-child(2) {
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

		.add-dialog {
			>>>.el-dialog__body {
				padding: 0px;
			}

			.add {
				position: relative;

				.error {
					position: absolute;
					left: 0px;
					margin-top: 43px;
					left: 24px;
					color: $red;
				}

				.el-input {
					width: 240px;
					margin-left: 24px;

				}
			}
		}

	}
</style>
