<template>
	<div id="deriveField">
		<section>
			<p>字段显示名</p>
			<el-input v-model="form.fieldName" placeholder="请输入字段显示名" maxlength="20" show-word-limit></el-input>
		</section>
		<section>
			<p>字段名</p>
			<el-input v-model="form.name" placeholder="请输入字段名" maxlength="20" show-word-limit>
				<template style=" background: #D9D9D9;" slot="prepend">{{prepend}}</template>
			</el-input>
		</section>
		<section>
			<p>字段描述</p>
			<el-input v-model="form.description" placeholder="请输入描述" maxlength="20" show-word-limit></el-input>
		</section>
		<section>
			<h3>加工规则</h3>
			<p>加工规则</p>
			<el-select v-model="form.ruleType" placeholder="选择加工方式" @change="changeRuleType()">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="warning-info" v-if="form.ruleType == 1">说明：四则运算只针对number型（int、float）数据类型计算</span>
			<div class="item" v-if="form.ruleType ==1">
				<div class="options">
					<label>衍生字段=</label>
					<el-select v-model="form.fieldStartId" placeholder="选择字段">
						<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName" :value="item.id"></el-option>
					</el-select>
					<div v-for="(item, index) in enums" :key="index">
						<el-select v-model="item.logicAction" placeholder="运算方式">
							<el-option v-for="item in calcType" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="item.fieldStartId" placeholder="选择字段">
							<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName" :value="item.id"></el-option>
						</el-select>
						<br/>
					</div>
					<a class="add-btn" v-if="enums.length==1" @click="addEditDomain()">+新增</a>
					<a class="delete-btn" v-if="enums.length>1" @click="deleteEditDomain()">X 删除</a>
				</div>
			</div>
			<div class="item" :class="[nativeList.find(n => n.id == form.fieldStartId) && !(nativeList.find(n => n.id == form.fieldStartId).formType == 2 || nativeList.find(n => n.id == form.fieldStartId).formType == 3)?'cast':'']" v-if="form.ruleType ==2">
				<el-select v-model="form.fieldStartId" placeholder="选择字段">
					<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName" :value="item.id"></el-option>
				</el-select>
				<div v-if="nativeList.find(n => n.id == form.fieldStartId) && (nativeList.find(n => n.id == form.fieldStartId).formType == 2 || nativeList.find(n => n.id == form.fieldStartId).formType == 3)">
					<div class="options" v-for="(citem,index) in form.fieldComplexCastRuleVOs">
						<el-input v-model="form.enumValue" disabled>
							<template style=" background: #D9D9D9;" slot="prepend">选项{{index+1}}</template>
						</el-input>
						<span style="margin: 0 15px">则</span>
						<label style="margin-right: 10px">衍生字段=</label>
						<el-input v-model="citem.complexValue"></el-input>
						<el-select v-model="citem.complexDataType" placeholder="选择数据类型">
							<el-option v-for="item in dataTypeList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div v-else>
					<div v-for="(item, index) in enums1" :key="index" class="options options1">
						<el-select v-model="item.logicAction" placeholder="运算方式" style="margin-left: 15px;">
							<el-option v-for="item in calcType.slice(0,4)" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-input v-model="item.logicTargetValue"></el-input>
						<span style="margin: 0 15px">则</span>
						<label style="margin-right: 10px">衍生字段=</label>
						<el-input v-model="item.complexValue"></el-input>
					</div>
					<a class="add-btn" v-if="enums1.length==1" @click="addEditDomain1()">+ 新增</a>
					<a class="delete-btn" v-if="enums1.length>1" @click="deleteEditDomain1()">X 删除</a>
				</div>
			</div>
		</section>
		<div class="foot">
			<el-button type="primary" @click="save">保存</el-button>
			<el-button class="cancel" @click="back()">取消</el-button>
		</div>
	</div>
</template>

<script>
	import {getNativeList, getNativeEnums, saveComplex} from '@/api/filed-manage/index.js'
	export default {
		name: "deriveField",
		data() {
			return {
				calcType: this.$logicAction,
				nativeList: [],
				nativeList1: [{
						value: 1,
						label: '合同进度'
					},
					{
						value: 2,
						label: '是否付费'
					},
					{
						value: 3,
						label: '已收佣金'
					},
				],
				options: [{
						value: 1,
						label: '四则运算'
					},
					{
						value: 2,
						label: '关系映射'
					},
				],
				dataTypeList: this.$dataTypeList,
				enums: [{
					logicAction: '',
					fieldStartId: ''
				}, ],
				enums1: [{
					logicTargetValue: '',  //等于后面的input, 用于比较
					complexValue: '', //最后一个input, 衍生字段值
					logicAction: '',
				}],
				form: {
					showName: '',
					name: '',
					description: '',
					ruleType: '',
					type: 2, //衍生
					fieldStartId: '',
					"fieldComplexCastRuleVOs": [],
					// "fieldComplexCastRuleVOs": [{
					//   "logicAction": 5,               //逻辑算法5-10
					//   "complexValue": "100",          //最后一个input, 衍生字段值
					//   "fieldStartId": 3,              //已收佣金字段id
					//   "logicTargetValue": "success"  //等于后面的input, 用于比较
					// }, {
					//   "logicAction": 5,
					//   "complexValue": "200",
					//   "fieldStartId": 3,
					//   "logicTargetValue": "success2"
					// }]
				},
				prepend: 'complex_',
				checkField: {}
			}
		},
		watch: {
			'form.fieldStartId':{//深度监听，可监听到对象、数组的变化
				 handler(val, oldVal){
					console.log(val, oldVal)
					if(val && this.form.ruleType == 2 && (this.nativeList.find(n => n.id == val).formType == 2 || this.nativeList.find(n => n.id == val).formType == 3)) {
						getNativeEnums({id: this.form.fieldStartId}).then(res => {
							if(res.code == 0) {
								this.form.fieldComplexCastRuleVOs = [];
								for(let i=0;i<res.field.fieldEnumEntityList.length;i++) {
									this.form.fieldComplexCastRuleVOs.push({										
										complexValue: '',
										enumValue: res.field.fieldEnumEntityList[i].enumValue,  //枚举值
										fieldStartId: this.form.fieldStartId,      //第一个原生字段id
										complexDataType: '', //数据类型 1：字符串型string，2：整数int，3小数数值float，4日期date，5 时间time
										fieldEnumId:  res.field.fieldEnumEntityList[i].id,  //枚举id
									})
								}
							}
						})
					}
				 },
				 immediate: true,
				 deep:true //true 深度监听
			 }
		},
		methods: {
			addEditDomain() {
				this.enums.push({
					logicAction: '',
					fieldStartId: ''
				})
			},
			addEditDomain1() {
				this.enums1.push({
					logicTargetValue: '',  //等于后面的input, 用于比较
					complexValue: '', //最后一个input, 衍生字段值
					logicAction: '',
					fieldStartId: ''
				})
			},
			deleteEditDomain() {
				this.enums.splice(0, this.enums.length - 1)
			},
			deleteEditDomain1() {
				this.enums1.splice(0, this.enums1.length - 1)
			},
			changeRuleType() {
				this.form.fieldStartId = '';
				getNativeList().then(res => {
					if (res.code == 0) {
						this.nativeList = res.fields;
					}
				})
			},
			save() {
				let params = {};
				if(this.form.ruleType == 1) {
					let complexMahtRuleVOs = [];
					if(this.enums.length == 1) {
						complexMahtRuleVOs = [{
					    "logicAction": this.enums[0].logicAction,   //运算方式 1：加法，2：减法，3除，4乘， 5等于，6不等于，7包含， 8不包含， 9空判断，10非空判断
					    "fieldStartId": this.form.fieldStartId,   //第一个字段id
					    "fieldEndId": this.enums[0].fieldStartId   //第二个字段id
					  }]
					}else if(this.enums.length == 2){
						complexMahtRuleVOs = [{
						  "logicAction": this.enums[0].logicAction,
						  "fieldStartId": this.form.fieldStartId,   //第一个字段id
						  "fieldEndId": this.enums[0].fieldStartId   //第二个字段id
						}, {
					    "logicAction": this.enums[1].logicAction,
					    "fieldStartId": this.enums[1].fieldStartId
					  }]
					}
					params = {
					  "complexMahtRuleVOs": complexMahtRuleVOs,
					  "fieldName": this.form.fieldName,
					  "dataType": '', // 暂时不传，如果有限制就随便传一个
					  "ruleType": this.form.ruleType,
					  "name": `${this.prepend}${this.form.name}`,
					  "description": this.form.description,
					  "type": this.form.type
					}
				}else {
					let fieldComplexCastRuleVOs = [];
					if(this.checkField.formType == 2 || this.checkField.formType == 3) { // 选择类
						fieldComplexCastRuleVOs = this.form.fieldComplexCastRuleVOs;
					}else { // 非选择类
						for(let i=0;i<this.enums1.length;i++) {
							fieldComplexCastRuleVOs.push({
								logicAction: this.enums1[i].logicAction,
								complexValue: this.enums1[i].complexValue,
								fieldStartId: this.form.fieldStartId,
								logicTargetValue: this.enums1[i].logicTargetValue,
							});
						}
					}
					params = {
					  "fieldComplexCastRuleVOs": fieldComplexCastRuleVOs,
					  "fieldName": this.form.fieldName,
					  "dataType": '', // 暂时不传，如果有限制就随便传一个
					  "ruleType": this.form.ruleType,
					  "name": `${this.prepend}${this.form.name}`,
					  "description": this.form.description,
					  "type": this.form.type
					}
				}
				saveComplex(params).then(res => {
					if(res.code == 0) {
						this.$message.success('新增成功！');
					}else {
						this.$message.warning(res.msg);
					}
				})
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#deriveField {
		.warning-info {
			font-size: 14px;
			margin-left: 10px;
		}

		.options {
			display: flex;
			/*align-content: center;*/
			align-items: center;
			margin-bottom: 15px;

			&.options1 {
				.el-select {
					margin-left: 0;
					margin-right: 10px;
				}
			}

			.el-input {
				width: 181px;
				height: 32px;
				border-radius: 4px;
				margin-bottom: 0;
				margin-right: 10px;
			}

			.el-select {
				margin-bottom: 0;
				margin-left: 10px;
			}

		}

		.add-btn {
			font-size: 14px;
			margin-left: 15px;
			color: #0079FE;
		}

		.delete-btn {
			font-size: 14px;
			margin-left: 15px;
			color: #f44336;
		}

		>>>.el-checkbox__input.is-checked {
			.el-checkbox__inner {
				background-color: #108EE9;
				border-color: #108EE9;
			}
		}

		.el-checkbox__input.is-checked+.el-checkbox__label {
			color: #108EE9;
		}

		>>>.el-input-group__append,
		>>>.el-input-group__prepend {
			background-color: #D9D9D9;
			color: #FFFFFF;
			border-color: #D9D9D9;
			padding: 0px 14px;
		}

		h3 {
			font-size: 32px;
			color: #34335B;
			margin-bottom: 32px;
		}

		.el-checkbox__input.is-checked+.el-checkbox__label {
			color: #666777;
		}

		.foot {
			margin-top: 60px;

			.el-button {
				width: 124px;
				height: 40px;
				background: #0079FE;
				border-radius: 6px;
				font-size: 18px;

				&.cancel {
					width: 160px;
					height: 40px;
					background: #F8FAFB;
					border-color: #F8FAFB;
					border-radius: 6px;
					color: #9596AB;
				}
			}
		}

		section {
			.label {
				font-size: 12px;
				color: #FF8C00;
				display: block;
				margin-bottom: 32px;
				margin-top: 8px;
			}

			.add {
				font-size: 14px;
				font-weight: 500;
				color: #0079FE;
				line-height: 20px;
			}

			p {
				font-size: 20px;
				font-weight: 600;
				color: #34335B;
				line-height: 28px;
				margin-bottom: 20px;
			}

			.el-select {
				width: 181px;
				height: 32px;
				border-radius: 4px;
				margin-bottom: 32px;

				>>>.el-input__inner {
					font-size: 14px;
					padding-left: 8px;
					height: 32px;
					line-height: 32px;
				}

				>>>.el-input__icon {
					line-height: 30px;
				}
			}

			.el-input {
				width: 440px;
				height: 32px;
				border-radius: 4px;
				margin-bottom: 32px;

				.el-input-group__prepend {
					background: #D9D9D9;
				}

				>>>.el-input__inner {
					font-size: 14px;
					padding-left: 8px;
					height: 32px;
					line-height: 32px;
				}
			}
		}
		.cast {
			display: flex;
		}
	}
</style>
