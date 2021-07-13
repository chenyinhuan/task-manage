<template>
	<div id="associatedAnchor" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<div>
				<el-input v-model="keyword" placeholder="请输入主播名" @keyup.enter.native="search"><i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
			</div>
			<div class="upload">
				<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
					:on-exceed="handleChange">
					<el-button class="excel" size="small">Excel模版</el-button>
				</el-upload>
				<el-upload ref="upload" class="upload-demo" :action="uploadUrl" :on-change="handleChange"
					:show-file-list="false" :limit="1"
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
					:auto-upload="false">
					<el-button size="small" type="primary">导入主播名单</el-button>
				</el-upload>
				<el-button size="small" type="primary" @click="addAnchor">新增主播</el-button>
			</div>
		</section>
		<el-table ref="table" :data="tableData" style="width: 100%;margin-top: 10px;"
			@selection-change="handleSelectionChange" @row-click="rowSelect" v-if="tableData.length>0">
			<el-table-column type="selection" width="55" :selectable="checkSelectable">
			</el-table-column>
			<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='userInfoVOS'">
						<div v-for="citem in scope.row.userInfoVOS" :key="citem.userName">
							{{citem.userName}}/{{citem.mobile}}</div>
					</div>
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text" @click="editItem(scope.row)">编辑</el-button>
						<el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
					</div>
					<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-button class="associated" type="primary" v-if="tableData.length>0" @click="saveAssociated" v-preventReClick>
			保存关联</el-button>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
			:current-page.sync="currentPage" :page-size="limit" layout="prev, pager, next, jumper" :total="total">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有主播～</p>
		</div>
		<el-dialog class="add-dialog" :title="isEdit?'编辑主播':'新增主播'" :visible.sync="addDialog" width="782px"
			:before-close="handleClose">
			<div class="add">
				<el-input :class="[showValidate && name == ''?'validate-empty':'']" v-model="name" placeholder="输入主播名称">
				</el-input>
				<span v-if="tip" class="error">{{message}}</span>
				<span class="error" style="color: #FF8C00;"
					v-if="showValidate && name == '' && tip == false">{{showValidate}}{{tip == false}}请输入主播名称</span>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="confirm">确 定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {
		importExcel
	} from '@/api/common/index.js'
	import {
		getAnchorList,
		delAnchor,
		addAnchor,
		updateAnchor,
		saveAssociatedAnchor
	} from '@/api/user-manage/account/anchor.js'
	export default {
		data() {
			return {
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '主播名称',
						prop: 'name',
					},
					{
						label: '关联账号',
						prop: 'userInfoVOS',
						slot: true
					},
					{
						label: '创建人',
						prop: 'createUser',
					},
					{
						label: '创建时间',
						prop: 'createTime'
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
				keyword: '',
				addDialog: false,
				name: '',
				tip: false,
				isEdit: false,
				currentRow: '',
				uploadUrl: `${window.$globalConfig.API_BASE_Tabel}/task-admin/sys/streamer/import`,
				message: '主播名称已存在!',
				checkedData: [],
				showValidate: false
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
			// 选中数据
			checkSelectable(row, index) {
				return row.isRelation? row.isRelation:false
			},
			init() {
				let params = {
					"name": this.keyword,
					"page": this.currentPage,
					"limit": this.limit,
					"orderBy": null,
					"sort": true
				}
				getAnchorList(params).then(res => {
					if (res.code == 0) {
						this.tableData = res.page.list;
						this.total = res.page.total;
					} else {
						this.isShow = true;
					}
				}).catch(e => {
					this.isShow = true;
				})
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
				this.currentPage = 1;
				this.init();
			},
			addAnchor() {
				this.isEdit = false;
				this.addDialog = true;
			},
			confirm() {
				this.tip = false;
				if (this.name == '') return this.showValidate = true;
				else this.showValidate = false;
				if (this.isEdit) {
					let params = {
						id: this.currentRow.id,
						name: this.name
					}
					updateAnchor(params).then(res => {
						if (res.code == 0) {
							this.$message.success('修改成功！');
							this.handleClose();
							this.init()
						} else {
							this.message = res.msg;
							this.tip = true;
						}
					})
				} else {
					let params = {
						name: this.name
					}
					addAnchor(params).then(res => {
						this.tip = false;
						if (res.code == 0) {
							this.$message.success('新增成功！');
							this.handleClose();
							this.currentPage = 1;
							this.init();
						} else {
							this.message = res.msg;
							this.tip = true;
						}
					})
				}

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
					let params = {
						id: item.id
					}
					delAnchor(params).then(res => {
						if (res.code == 0) {
							this.$message.success('删除成功！');
							this.currentPage = 1;
							this.init();
						} else this.$message.warning(res.msg)
					})
				})
			},
			handleClose() {
				this.addDialog = false;
				this.isEdit = false;
				this.tip = false;
				this.name = '';
			},
			handleSelectionChange(val) {
				this.checkedData = val;
			},
			rowSelect(row) {
				this.$refs.table.toggleRowSelection(row);
			},
			handleChange(file) {
				let files = file.raw;
				let fileName = file.name;
				if (fileName == "") {
					this.$message.warning('请选择要上传的文件！');
					return false
				}
				let fileFormData = new FormData();
				fileFormData.append('multipartFile', files); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
				importExcel(fileFormData).then((res) => {
					if (res.code == 0) this.$message.success('导入成功！');
					else this.$message.warning(res.msg);
				})
				this.$refs.upload.clearFiles()
			},
			saveAssociated() {
				if (this.checkedData.length == 0) return this.$message.warning('请选择任意一条数据');
				let ids = [];
				if (this.checkedData.length > 0) {
					ids = this.checkedData.map(item => {
						return item.id
					})
				}
				let currentIds = this.tableData.map(item => {
					return item.id;
				})
				let params = {
					page: this.currentPage,
					currentIds: currentIds,
					ids: ids,
					userId: this.$route.query.userId // 选中的主播
				}
				saveAssociatedAnchor(params).then(res => {
					if (res.code == 0) {
						this.$message.success('保存关联成功');
						this.init()
					} else this.$message.warning(res.msg);
				})
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
