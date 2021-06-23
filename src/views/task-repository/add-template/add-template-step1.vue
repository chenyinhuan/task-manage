<template>
	<div id="step1">
		<p class="title">模版信息</p>
		<section>
			<p>模版名称</p>
			<el-input :class="[showValidate && taskTplVO.taskName == ''?'validate-empty':'',
		  showValidate && taskTplVO.taskName != '' && checkTaskName?'validate-error':'']" @blur="inputTaskName" v-model="taskTplVO.taskName"
				placeholder="请输入模板名称" maxlength="20" show-word-limit></el-input>
				<span class="validate-info" style="color: #FF8C00;"
					v-if="showValidate && taskTplVO.taskName == ''">请输入模板名称</span>
				<span class="validate-info" style="color: #C03639;"
					v-if="showValidate && taskTplVO.taskName != '' && checkTaskName">请输入正确的模板名称，支持中文、英文、数字</span>
		</section>
		<section>
			<p>模版说明</p>
			<el-input v-model="taskTplVO.description" placeholder="请输入模板说明" maxlength="200" show-word-limit></el-input>
		</section>
		<section style="margin-bottom: 32px">
			<p>表单字段（原生字段）</p>
			<div class="field">
				<draggable v-model="taskTplVO.taskTplBasicFieldEntities">
					<div class="field-item" v-for="(item,index) in taskTplVO.taskTplBasicFieldEntities" :key="index">
						<div class="field-sitem">
							<span>{{item.fieldName}}</span>
							<el-input v-model="item.fieldValue" :placeholder="'请输入'+item.fieldName" disabled></el-input>
						</div>
						<div class="field-sitem">
							<span>是否必填</span>
							<el-radio-group v-model="item.fieldInputType">
								<el-radio :label="1">必填</el-radio>
								<el-radio :label="0">非必填</el-radio>
							</el-radio-group>
						</div>
						<div class="field-sitem">
							<div style="height: 20px"></div>
							<div class="delete" @click='deleteItem(taskTplVO.taskTplBasicFieldEntities,index)'><i
									class="el-icon-error"></i>删除</div>
						</div>
						<div class="field-sitem">
							<div style="height: 20px"></div>
							<!-- <div class="drag"><i class="el-icon-caret-top" v-if="index != 0" @click="sort(index, index + 1)"></i><i class="el-icon-caret-bottom" @click="sort(index, index - 1)" v-if="index != originalField.length -1"></i></div> -->
						</div>
					</div>
				</draggable>
				<div class="add-field" @click="addField(1)">+ 新增表单字段</div>
			</div>
			<span class="validate-info1" style="color: #FF8C00;"
				v-if="showValidate && taskTplVO.taskTplBasicFieldEntities.length == 0">请选择表单字段</span>
		</section>
		<section>
			<p>监测字段（衍生字段）</p>
			<div class="field">
				<draggable v-model="taskTplVO.taskTplComplexFieldEntities" group="people">
					<div class="field-item" v-for="(item,index) in taskTplVO.taskTplComplexFieldEntities" :key="index">
						<div class="field-sitem">
							<span>字段显示名</span>
							<div class="name">{{item.fieldName}}</div>
						</div>
						<div class="field-sitem">
							<span>是否表单页显示</span>
							<el-radio-group v-model="item.fieldShowType">
								<el-radio :label="1">显示</el-radio>
								<el-radio :label="0">不显示</el-radio>
							</el-radio-group>
						</div>
						<div class="field-sitem">
							<div style="height: 20px"></div>
							<div class="delete" @click='deleteItem(taskTplVO.taskTplComplexFieldEntities,index)'><i
									class="el-icon-error"></i>删除</div>
						</div>
						<div class="field-sitem">
							<div style="height: 20px"></div>
							<!-- <div class="drag"><i class="el-icon-caret-top" v-if="index != 0" @click="sortExtend(index, index + 1)"></i><i class="el-icon-caret-bottom" @click="sortExtend(index, index - 1)" v-if="index != extendField.length - 1"></i></div> -->
						</div>
					</div>
				</draggable>
				<div class="add-field" @click="addField(2)">+ 新增检测字段</div>
			</div>
			<span class="validate-info1" style="color: #FF8C00;"
				v-if="showValidate && taskTplVO.taskTplComplexFieldEntities.length == 0">请选择监测字段</span>
		</section>
		<div class="foot">
			<el-button type="primary" @click="next()">下一步</el-button>
			<el-button class="cancel" @click="cancel">取消</el-button>
		</div>
		<el-dialog :title="`选择${fieldType == 1 ? '表单' : '检测'}字段（${fieldType == 1 ? '原生字段' : '衍生字段'}）`"
			:visible.sync="dialogVisible" width="782px" :before-close="handleClose">
			<div class="dialog-content">
				<el-input v-model="keyword" placeholder="任务名称" @keyup.enter.native="search"><i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
				<el-table ref="table" :data="tableData" style="width: 100%; margin-top: 10px" @row-click="rowSelect"
					@selection-change="handleSelectionChange" v-if="tableData.length > 0 && fieldType == 1">
					<el-table-column type="selection" width="55" :selectable="checkSelectable"> </el-table-column>
					<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
						v-for="(item, index) in tableColumn" :key="index">
						<template slot-scope="scope">
							<div>{{ scope.row[item.prop] }}</div>
						</template>
					</el-table-column>
				</el-table>
				<el-table ref="table1" :data="tableData" style="width: 100%; margin-top: 10px" @row-click="rowSelect"
					@selection-change="handleSelectionChange" v-if="tableData.length > 0 && fieldType == 2">
					<el-table-column type="selection" width="55"> </el-table-column>
					<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
						v-for="(item, index) in tableColumn1" :key="index">
						<template slot-scope="scope">
							<div>{{ scope.row[item.prop] }}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				v-if="tableData.length > 0" :current-page.sync="currentPage" :page-size="100"
				layout="prev, pager, next, jumper" :total="1000">
			</el-pagination> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmSelected">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import draggable from "vuedraggable";
	import {
		getNativeList
	} from '@/api/filed-manage/index';
	import {
		saveTaskTpl
	} from '@/api/task-repository/index'
	export default {
		components: {
			draggable,
		},
		data() {
			return {
				taskTplVO: {
					description: "", //描述
					status: 2, //0是逻辑删除，2是未上架，1正常
					taskName: "", //task name
					taskTplBasicFieldEntities: [ //表单字段（原生字段）
						// {
						//   fieldId: 0,                              //字段id
						//   fieldInputType: 0,                       //状态，0：非必填 1：必填
						//   fieldShowType: 0,                       //状态  0：不显示 1：显示
						//   fieldType: 0,                           //字段类型，1：原生， 2衍生
						//   fieldValue: "",                   //字段值
						//   sort: 0,                      //排序
						// }
					],
					taskTplComplexFieldEntities: [ //衍生字段（结构和原生类似）
						// {
						//   fieldId: 0,
						//   fieldInputType: 0,
						//   fieldShowType: 0,
						//   fieldType: 0,
						//   fieldValue: "",
						//   sort: 0,
						// }
					]
				},
				originalField: [{
					id: 1
				}, {
					id: 2
				}],
				extendField: [{
					id: 1
				}, {
					id: 2
				}, {
					id: 3
				}],
				addDialog: false,
				type: "",
				dialogVisible: false,
				keyword: "",
				tableData: [],
				tableColumn: [
					// 表格列数据
					{
						label: "字段显示名",
						prop: "fieldName",
					},
					{
						label: "数据类型",
						prop: "dataType",
					},
					{
						label: "表单类型",
						prop: "formType",
					},
					{
						label: "字段描述",
						prop: "description",
					},
				],
				tableColumn1: [
					// 表格列数据
					{
						label: "字段显示名",
						prop: "fieldName",
					},
					{
						label: "数据类型",
						prop: "dataType",
					},
					{
						label: "字段描述",
						prop: "description",
					},
				],
				drag: false,
				currentPage: 1,
				checkedData: [],
				fieldType: '',
				taskTplId: '',
				showValidate: false,
				checkTaskName: false
			};
		},
		created() {},
		mounted() {},
		computed: {},
		methods: {
			checkSelectable(row, index) {
				if (this.fieldType == 1) {
					if (this.taskTplVO.taskTplBasicFieldEntities.length && this.taskTplVO.taskTplBasicFieldEntities.some(
							el => {
								return el.fieldId === row.id
							})) {
						return false;
					} else {
						return true;
					}
				} else {
					if (this.taskTplVO.taskTplComplexFieldEntities.length && this.taskTplVO.taskTplComplexFieldEntities
						.some(el => {
							return el.fieldId === row.id
						})) {
						return false;
					} else {
						return true;
					}
				}
			},
			confirmSelected() {
				let arr = [];
				// console.log(this.checkedData)
				for (let i = 0; i < this.checkedData.length; i++) {
					let item = this.checkedData[i];
					arr.push({
						fieldId: item.id, //字段id
						fieldName: item.fieldName,
						fieldInputType: 0, //状态，0：非必填 1：必填
						fieldShowType: 0, //状态  0：不显示 1：显示
						fieldType: this.fieldType, //字段类型，1：原生， 2衍生
						fieldValue: '', //字段值
						enumValue: '', // 枚举值
						sort: '',
					})
				}
				if (this.fieldType == 1) this.taskTplVO.taskTplBasicFieldEntities = [...this.taskTplVO
					.taskTplBasicFieldEntities, ...arr
				]
				else if (this.fieldType == 2) this.taskTplVO.taskTplComplexFieldEntities = [...this.taskTplVO
					.taskTplComplexFieldEntities, ...arr
				]
				console.log(this.fieldType, this.taskTplVO.taskTplBasicFieldEntities)
				this.handleClose();
			},
			handleSelectionChange(val) {
				this.checkedData = val;
				console.log(val)
			},
			rowSelect(row) {
				if (this.fieldType == 1) {
					if (!(this.taskTplVO.taskTplBasicFieldEntities.length && this.taskTplVO.taskTplBasicFieldEntities.some(
							el => {
								return el.fieldId === row.id
							}))) {
						this.$refs.table.toggleRowSelection(row);
					}
				} else {
					if (!(this.taskTplVO.taskTplComplexFieldEntities.length && this.taskTplVO.taskTplComplexFieldEntities
							.some(el => {
								return el.fieldId === row.id
							}))) {
						this.$refs.table1.toggleRowSelection(row);
					}
				}
			},
			handleClose() {
				this.checkedData = [];
				this.dialogVisible = false;
			},
			addField(val) {
				this.fieldType = val;
				if (val == 1) {
					getNativeList({
						type: 1
					}).then(res => {
						this.tableData = res.fields
					})
				} else {
					getNativeList({
						type: 2
					}).then(res => {
						this.tableData = res.fields
					})
				}
				this.dialogVisible = true;
			},
			next() {
				if (this.taskTplId) {
					this.$emit("next", this.taskTplId);
					return;
				}
				if (this.taskTplVO.taskName == '' || this.taskTplVO.taskTplBasicFieldEntities.length == 0 || this.taskTplVO.taskTplComplexFieldEntities
					.length == 0 || this.checkTaskName) return this.showValidate = true;
				for (let i = 0; i < this.taskTplVO.taskTplBasicFieldEntities.length; i++) {
					let item = this.taskTplVO.taskTplBasicFieldEntities[i];
					item.sort = i + 1;
				}
				for (let i = 0; i < this.taskTplVO.taskTplComplexFieldEntities.length; i++) {
					let item = this.taskTplVO.taskTplComplexFieldEntities[i];
					item.sort = i + 1;
				}
				saveTaskTpl(this.taskTplVO).then(res => {
					if (res.code == 0) {
						this.taskTplId = res.taskTplId;
						this.$emit("next", res.taskTplId);
					} else this.$message.warning(res.msg)
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			search() {},
			sort(index, refIndex) {
				let list = this.originalField;
				[list[index], list[refIndex]] = [list[refIndex], list[index]];
				this.originalField = JSON.parse(JSON.stringify(list));
				console.log(this.originalField);
			},
			sortExtend(index, refIndex) {
				let list = this.extendField;
				[list[index], list[refIndex]] = [list[refIndex], list[index]];
				this.extendField = JSON.parse(JSON.stringify(list));
			},
			// 删除
			deleteItem(data, index) {
				this.$confirm('确定删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					data.splice(index, 1);
				})
			},
			cancel() {
				this.$router.push('/task-repository/task-template');
			},
			// 校验字段显示名
			inputTaskName() {
				let regex = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$"); // 中文、英文、数字
				//判断输入框中有内容
				if (!regex.test(this.taskTplVO.taskName)) {
					this.checkTaskName = true;
				} else this.checkTaskName = false;
			},
		},
	};
</script>
<style lang="scss">
	.dialog-footer {
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
	@import "@/styles/variables.scss";

	#step1 {
		height: 100%;
		width: 100%;

		.title {
			font-size: 32px;
			line-height: 45px;
			color: #34335b;
			font-weight: bold;
			margin-bottom: 32px;
		}

		.foot {
			margin-top: 60px;

			.el-button {
				width: 124px;
				height: 40px;
				border-radius: 6px;
				font-size: 18px;

				&.el-button--primary {
					background: #0079fe;
				}

				&.cancel {
					background-color: #f8fafb;
					color: #9596ab;
				}
			}
		}

		section {
			position: relative;
			.validate-info1 {
			  position: absolute;
			  left: 0px;
			  bottom: -20px;
			  font-size: 12px;
			}
			.validate-info {
				position: absolute;
				left: 0px;
				bottom: 9px;
				font-size: 12px;
			}
			p {
				font-size: 20px;
				font-weight: 600;
				color: #34335b;
				line-height: 28px;
				margin-bottom: 20px;
			}

			.el-input {
				width: 440px;
				height: 32px;
				border-radius: 4px;
				margin-bottom: 32px;

				>>>.el-input__inner {
					font-size: 14px;
					padding-left: 8px;
					height: 32px;
					line-height: 32px;
				}
			}

			.field {
				background-color: #f5f5f5;
				width: 860px;
				padding: 5px 0px 40px 30px;

				.add-field {
					margin-top: 15px;
					color: #0079fe;
					font-size: 16px;
					cursor: pointer;
				}

				&-item {
					display: flex;
					align-items: center;
					color: #9596ab;
					font-size: 14px;
					border-bottom: 1px solid #ffffff;
					padding-top: 15px;
					cursor: move;

					.field-sitem {
						display: flex;
						flex-direction: column;

						&:nth-child(2) {
							margin-left: 40px;
						}

						&:nth-child(3) {
							margin-left: 256px;
						}

						&:nth-child(4) {
							margin-left: 32px;
						}

						.name {
							color: #34335b;
							height: 32px;
							line-height: 32px;
							width: 240px;
							margin-top: 8px;
							line-height: 32px;
							margin-bottom: 14px;
						}

						span {
							line-height: 20px;
							margin-top: 0px;
						}

						.el-input {
							width: 240px;
							height: 32px;
							border-radius: 4px;
							margin-top: 8px;
							margin-bottom: 14px;

							>>>.el-input__inner {
								font-size: 14px;
								padding-left: 8px;
								height: 32px;
								line-height: 32px;
							}
						}

						.el-radio-group {
							height: 32px;
							margin-bottom: 14px;
							margin-top: 8px;
							display: inline-flex;
							align-items: center;
						}

						.delete {
							height: 32px;
							margin-bottom: 14px;
							margin-top: 8px;
							display: inline-flex;
							align-items: center;
							color: #fd6b6d;
							cursor: pointer;

							i {
								font-size: 14px;
								margin-right: 8px;
							}
						}

						.drag {
							display: flex;
							flex-direction: column;
							text-align: center;

							i {
								color: #9596ab;
								font-size: 18px;
								cursor: pointer;
							}

							.line {
								background-color: #9596ab;
								width: 20px;
								height: 2px;
							}
						}
					}
				}
			}
		}

		.el-pagination {
			margin-top: 20px;
		}

		.dialog-content {
			>>>.el-input__inner {
				height: 40px;
				line-height: 40px;
				width: 160px;
				border-radius: 5px;
				background-color: #f8fafb;
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
				color: #9596ab;
			}
		}
	}
</style>
