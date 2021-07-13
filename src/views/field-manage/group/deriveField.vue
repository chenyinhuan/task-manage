<template>
	<div id="deriveField">
		<section>
			<p>字段显示名</p>
			<el-input :class="[showValidate && form.fieldName == ''?'validate-empty':'',
		  showValidate && form.fieldName != '' && checkFieldName?'validate-error':'']" v-model="form.fieldName"
				@blur="inputFieldName" placeholder="请输入字段显示名" maxlength="20" show-word-limit></el-input>
			<span class="validate-info" style="color: #FF8C00;"
				v-if="showValidate && form.fieldName == ''">请输入字段显示名</span>
			<span class="validate-info" style="color: #C03639;"
				v-if="showValidate && form.fieldName != '' && checkFieldName">请输入正确的字段显示名，支持中文、英文、数字</span>
		</section>
		<section>
			<p>字段名</p>
			<el-input :class="[showValidate && form.name == ''?'validate-empty':'',
		  showValidate && form.name != '' && checkName?'validate-error':'']" v-model="form.name" @blur="inputName"
				placeholder="请输入字段名" maxlength="20" show-word-limit>
				<template style=" background: #D9D9D9;" slot="prepend">{{prepend}}</template>
			</el-input>
			<span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.name == ''">请输入字段名</span>
			<span class="validate-info" style="color: #C03639;"
				v-if="showValidate && form.name != '' && checkName">请输入正确的字段名，支持英文、数字、下划线</span>
		</section>
		<section>
			<p>字段描述</p>
			<div style="width: 440px;">
				<el-input :autosize="true" type="textarea" placeholder="请输入描述" v-model="form.description"
					maxlength="200" show-word-limit>
				</el-input>
			</div>
			<!-- <el-input v-model="form.description" placeholder="请输入描述" maxlength="200" show-word-limit></el-input> -->
		</section>
		<section>
			<h3>加工规则</h3>
			<p>加工规则</p>
			<el-select :class="[showValidate && form.ruleType == ''?'validate-empty':'']" v-model="form.ruleType"
				placeholder="选择加工方式" @change="changeRuleType()">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="validate-info" style="color: #FF8C00;"
				v-if="showValidate && form.ruleType == ''">请选择加工方式</span>
			<span class="warning-info" v-if="form.ruleType == 1">说明：四则运算只针对number型（int、float）数据类型计算</span>
			<div class="item" v-if="form.ruleType ==1">
				<div class="options">
					<label>衍生字段=</label>
					<div style="position: relative;margin-left: 10px;">
						<el-select v-model="form.fieldStartId" filterable placeholder="选择字段" @change="$forceUpdate()">
							<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName"
								:value="item.id"></el-option>
						</el-select>
						<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
							v-if="showValidate && !form.fieldStartId">选择字段</span>
					</div>
					<div v-for="(item, index) in enums" :key="index" v-if="index == 0" style="display: flex">
						<div style="position: relative;margin-left: 10px;">
							<el-select v-model="item.logicAction" placeholder="运算方式">
								<el-option v-for="item in calcType.slice(0,4)" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
								v-if="showValidate && !item.logicAction">运算方式</span>
						</div>
						<div style="position: relative;margin-left: 10px;">
							<el-select v-model="item.fieldStartId" filterable placeholder="选择字段">
								<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName"
									:value="item.id"></el-option>
							</el-select>
							<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
								v-if="showValidate && item.fieldStartId == ''">选择字段</span>
						</div>
						<a class="add-btn" v-if="index == enums.length-1" @click="addEditDomain()">+新增</a>
						<a class="delete-btn" v-if="index != 0" @click="deleteEditDomain(index)">X 删除</a>
					</div>
				</div>
				<div v-for="(item, index) in enums" :key="index" v-if="index > 0" class="add-item"
					style="display: flex">
					<div style="position: relative">
						<el-select v-model="item.logicAction" placeholder="运算方式">
							<el-option v-for="item in calcType.slice(0,4)" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<span class="validate-info" style="color: #FF8C00;bottom: -5px;"
							v-if="showValidate && item.logicAction == ''">运算方式</span>
					</div>
					<div style="position: relative;margin-left: 10px;">
						<el-select v-model="item.fieldStartId" filterable placeholder="选择字段">
							<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName"
								:value="item.id"></el-option>
						</el-select>
						<span class="validate-info" style="color: #FF8C00;bottom: -5px;"
							v-if="showValidate && item.fieldStartId == ''">选择字段</span>
					</div>
					<a class="add-btn" v-if="index == enums.length-1" @click="addEditDomain()">+新增</a>
					<a class="delete-btn" v-if="index != 0" @click="deleteEditDomain(index)">X 删除</a>
				</div>
			</div>
			<div class="item" style="display: flex;"
				:class="[nativeList.find(n => n.id == form.fieldStartId) && !(nativeList.find(n => n.id == form.fieldStartId).formType == 2 || nativeList.find(n => n.id == form.fieldStartId).formType == 3)?'cast':'']"
				v-if="form.ruleType ==2">
				<div style="position: relative;margin-right: 10px">
					<el-select v-model="form.fieldStartId" filterable placeholder="选择字段" @change="$forceUpdate()">
						<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName"
							:value="item.id">
						</el-option>
					</el-select>
					<span class="validate-info" style="color: #FF8C00;"
						v-if="showValidate && !form.fieldStartId">选择字段</span>
				</div>
				<div
					v-if="nativeList.find(n => n.id == form.fieldStartId) && (nativeList.find(n => n.id == form.fieldStartId).formType == 2 || nativeList.find(n => n.id == form.fieldStartId).formType == 3)">
					<div class="options" v-for="(citem,index) in form.fieldComplexCastRuleVOs">
						<div style="position: relative;">
							<el-input v-model="citem.enumValue" disabled>
								<template style=" background: #D9D9D9;" slot="prepend">选项{{index+1}}</template>
							</el-input>
							<!--              <span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"-->
							<!--                    v-if="showValidate && !citem.enumValue">不能为空</span>-->
						</div>
						<span style="margin: 0 15px">则</span>
						<label style="margin-right: 10px">衍生字段=</label>
						<div style="position: relative;">
							<el-input v-model="citem.complexValue"></el-input>
							<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
								v-if="showValidate && !citem.complexValue">不能为空</span>
						</div>
						<div style="position: relative;">
							<el-select v-model="citem.complexDataType" placeholder="选择数据类型">
								<el-option v-for="item in dataTypeList" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
								v-if="showValidate && !citem.complexDataType">请选择数据类型</span>
						</div>
					</div>
				</div>
				<div
					v-if="form.fieldStartId && !(nativeList.find(n => n.id == form.fieldStartId) && (nativeList.find(n => n.id == form.fieldStartId).formType == 2 || nativeList.find(n => n.id == form.fieldStartId).formType == 3))">
					<div v-for="(item, index) in enums1" :key="index" class="options options1">
						<div style="position: relative;">
							<el-select v-model="item.logicAction" placeholder="运算方式" style="margin-left: 15px;">
								<el-option v-for="item in calcType.slice(4,10)" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
								v-if="showValidate && !item.logicAction">运算方式</span>
						</div>
						<div style="position: relative;">
							<el-input v-model="item.logicTargetValue"></el-input>
							<span class="validate-info" style="color: #FF8C00;bottom: -20px;"
								v-if="showValidate && !item.logicTargetValue">不能为空</span>
						</div>
						<span style="margin: 0 15px">则</span>
						<label style="margin-right: 10px">衍生字段=</label>
						<div style="position: relative;">
							<el-input v-model="item.complexValue"></el-input>
							<span class="validate-info" style="color: #FF8C00;bottom: -20px;"
								v-if="showValidate && !item.complexValue">不能为空</span>
						</div>
						<a class="add-btn" v-if="index == enums1.length-1" @click="addEditDomain1()">+ 新增</a>
						<a class="delete-btn" v-if="index != 0" @click="deleteEditDomain1(index)">X 删除</a>
					</div>
				</div>
			</div>
			<div class="item" v-if="form.ruleType ==3">
				<div class="options">
					<div style="position: relative;">
						<h4>选择接口:</h4>
						<el-select v-model="form.apiId" filterable placeholder="选择关联接口" @change="getParamsLength">
							<el-option v-for="(item,index) in fieldApiList" :key="index" :label="item.apiName"
								:value="item.apiId"></el-option>
						</el-select>
						<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
							v-if="showValidate && !form.apiId">选择接口</span>
					</div>
				</div>
				<div class="options" v-for="(sItem,sIndex) in form.fieldAPIRuleVOS" :key="sIndex"
					v-if="sItem.apiType == 1">
					<div style="position: relative;">
						<h4>原生字段{{sIndex+1}}:</h4>
						<el-select v-model="sItem.fieldStartId" filterable placeholder="选择一个原生字段作为请求值"
							@change="$forceUpdate()">
							<el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName"
								:value="item.id"
								:disabled="form.fieldAPIRuleVOS.find(n=> n.fieldStartId == item.id)?true:false">
							</el-option>
						</el-select>
						<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
							v-if="showValidate && sIndex==0 && !sItem.fieldStartId">选择原生字段</span>
					</div>
					<span class="el-icon-connection" style="margin: 30px 10px 0"></span>
					<div style="position: relative;">
						<h4>关联接口请求参数:</h4>
						<el-select v-model="sItem.fieldApiId" filterable placeholder="选择请求参数" @change="$forceUpdate()">
							<el-option
								v-for="(item,index) in fieldApiList.find(n => n.apiId == form.apiId) ? fieldApiList.find(n => n.apiId == form.apiId).params : []"
								:key="index" :label="item.apiName" :value="item.id"
								:disabled="form.fieldAPIRuleVOS.find(n=> n.fieldApiId == item.id)?true:false">
							</el-option>
						</el-select>
						<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
							v-if="showValidate && sIndex==0 &&  !sItem.fieldApiId">选择关联接口请求参数</span>
					</div>
				</div>
				<div class="options" v-if="form.apiId">
					<div style="position: relative;">
						<h4>衍生字段关联返回参数:</h4>
						<el-select v-model="form.responseId" filterable placeholder="选择返回参数" @change="$forceUpdate()">
							<el-option
								v-for="(item,index) in fieldApiList.find(n => n.apiId == form.apiId) ? fieldApiList.find(n => n.apiId == form.apiId).responses : []"
								:key="index" :label="item.apiName" :value="item.id"></el-option>
						</el-select>
						<span class="validate-info" style="color: #FF8C00;bottom: -20px;left: 10px"
							v-if="showValidate && !form.responseId">选择衍生字段关联返回参数</span>
					</div>
				</div>
			</div>
		</section>
		<div class="foot">
			<el-button type="primary" @click="save()" v-preventReClick>保存</el-button>
			<el-button class="cancel" @click="back()">取消</el-button>
		</div>
	</div>
</template>

<script>
	import {
		getNativeList,
		getNativeEnums,
		saveComplex,
		getComplexcDetail,
		updateComplex,
		getFieldApiList
	} from '@/api/filed-manage/index.js'
	export default {
		name: "deriveField",
		props: {
			id: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				calcType: this.$calcType,
				apiList: [{
						value: 1,
						label: '快递查询'
					},
					{
						value: 2,
						label: '工作进度查询'
					},
					{
						value: 3,
						label: '订单状态查询'
					},
					{
						value: 4,
						label: '退款率查询'
					},
				],
				nativeList: [],
				nativeList1: [],
				fieldApiList: [],
				options: [{
						value: 1,
						label: '四则运算'
					},
					{
						value: 2,
						label: '关系映射'
					},
					{
						value: 3,
						label: '关联接口'
					}
				],
				dataTypeList: this.$dataTypeList,
				enums: [{
					logicAction: '',
					fieldStartId: ''
				}, ],
				enums1: [{
					logicTargetValue: '', //等于后面的input, 用于比较
					complexValue: '', //最后一个input, 衍生字段值
					logicAction: '',
				}],
				form: {
					apiId: '',
					params1: '',
					params2: '',
					responseId: '',
					nativeField1: '',
					nativeField2: '',
					fieldName: '',
					name: '',
					description: '',
					ruleType: '',
					type: 2, //衍生
					fieldStartId: '',
					"fieldComplexCastRuleVOs": [],
					complexMahtRuleVOs: [],
					fieldAPIRuleVOS: [],
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
				checkField: {},
				showValidate: false,
				checkFieldName: false,
				checkName: false,
				checkRule: false
			}
		},
		watch: {
			'form.fieldStartId': { //深度监听，可监听到对象、数组的变化
				handler(val, oldVal) {
					console.log(val, oldVal)
					if (val && this.form.ruleType == 2 && ((this.nativeList.find(n => n.id == val) && this.nativeList.find(
							n => n.id == val).formType == 2) || (this
							.nativeList.find(n => n.id == val) && this
							.nativeList.find(n => n.id == val).formType == 3))) {
						getNativeEnums({
							id: this.form.fieldStartId
						}).then(res => {
							if (res.code == 0) {
								this.form.fieldComplexCastRuleVOs = [];
								for (let i = 0; i < res.field.fieldEnumEntityList.length; i++) {
									this.form.fieldComplexCastRuleVOs.push({
										complexValue: '',
										enumValue: res.field.fieldEnumEntityList[i].enumValue, //枚举值
										fieldStartId: this.form.fieldStartId, //第一个原生字段id
										complexDataType: '', //数据类型 1：字符串型string，2：整数int，3小数数值float，4日期date，5 时间time
										fieldEnumId: res.field.fieldEnumEntityList[i].id, //枚举id
									})
								}
							}
						})
					}
				},
				immediate: true,
				deep: true //true 深度监听
			}
		},
		created() {
			if (this.id && this.$route.query.type == 2) {
				this.init()
			}

		},
		methods: {
			getParamsLength() {
				this.form.fieldAPIRuleVOS = [];
				this.form.responseId = '';
				let length = this.fieldApiList.find(n => n.apiId == this.form.apiId).params.length
				for (var i = 0; i < length; i++) {
					this.form.fieldAPIRuleVOS.push({
						apiType: 1, //1表示参数，2表示reponse
						fieldApiId: '', //接口id
						fieldId: null, //不填
						fieldStartId: '' //原生类型field id
					})
				}
			},
			init() {
				getComplexcDetail({
					id: this.id
				}).then(res => {
					this.form = res.field
					this.form.name = this.form.name.replace("complex_", "");
					console.log(this.form.ruleType)
					if (this.form.complexMahtRuleVOs && this.form.complexMahtRuleVOs.length) {
						this.form.fieldStartId = this.form.complexMahtRuleVOs[0].fieldStartId;
						this.enums = this.form.complexMahtRuleVOs
					} else if (this.form.fieldAPIRuleVOS && this.form.fieldAPIRuleVOS.length) {
						// this.form.fieldAPIRuleVOS = this.form.fieldAPIRuleVOS.substr(0,this.form.fieldAPIRuleVOS.length-1);
						this.form.responseId = this.form.fieldAPIRuleVOS.find(n => n.apiType == 2) ? this.form
							.fieldAPIRuleVOS.find(n => n.apiType == 2).fieldApiId : '';
						let temp = [];
						this.form.fieldAPIRuleVOS.forEach(item => {
							if (item.apiType == 1) temp.push(item);
						})
						this.form.fieldAPIRuleVOS = JSON.parse(JSON.stringify(temp));
					} else {
						this.enums = [{
							logicAction: '',
							fieldStartId: ''
						}]
					}
					if (this.form.fieldComplexCastRuleVOs && this.form.fieldComplexCastRuleVOs.length) {
						console.log(this.form.fieldComplexCastRuleVOs)
						this.form.fieldStartId = this.form.fieldComplexCastRuleVOs[0].fieldStartId;
					}

					if (this.form.ruleType == 1) {
						let params = {
							"dataTypes": [3], //数据类型，为空时取全部
							"formTypes": [1], //表单类型，为空时取全部
							"type": '1' //字段类型1：原生2衍生，为空时取全部
						}
						getNativeList(params).then(res => {
							if (res.code == 0) {
								this.nativeList = res.fields;
							}
						})
					} else if (this.form.ruleType == 2) {
						let params = {
							"dataTypes": [], //数据类型，为空时取全部
							"formTypes": [1, 2, 3], //表单类型，为空时取全部
							"type": '1' //字段类型1：原生2衍生，为空时取全部
						}
						getNativeList(params).then(res => {
							if (res.code == 0) {
								this.nativeList = res.fields;
							}
						})
					} else {
						let params = {
							"dataTypes": [], //数据类型，为空时取全部
							"formTypes": [1, 2, 3], //表单类型，为空时取全部1, 2, 3
							"type": '1' //字段类型1：原生2衍生，为空时取全部
						}
						getNativeList(params).then(res => {
							if (res.code == 0) {
								this.nativeList = res.fields;
							}
						})
						getFieldApiList().then(res => {
							this.fieldApiList = res.apis
						})
					}
				})
			},
			addEditDomain() {
				if (this.enums.length >= 6) return this.$message.warning('最多只能新增5个！')
				this.enums.push({
					logicAction: '',
					fieldStartId: ''
				})
			},
			addEditDomain1() {
				if (this.enums1.length >= 6) return this.$message.warning('最多只能新增5个！')
				this.enums1.push({
					logicTargetValue: '', //等于后面的input, 用于比较
					complexValue: '', //最后一个input, 衍生字段值
					logicAction: '',
					fieldStartId: ''
				})
			},
			deleteEditDomain(index) {
				this.enums.splice(index, 1)
			},
			deleteEditDomain1(index) {
				this.enums1.splice(index, 1)
			},
			changeRuleType() {
				this.form.fieldStartId = '';
				if (this.form.ruleType == 1) {
					let params = {
						"dataTypes": [3], //数据类型，为空时取全部
						"formTypes": [1], //表单类型，为空时取全部
						"type": '1' //字段类型1：原生2衍生，为空时取全部
					}
					getNativeList(params).then(res => {
						if (res.code == 0) {
							this.nativeList = res.fields;
						}
					})
				} else if (this.form.ruleType == 2) {
					let params = {
						"dataTypes": [], //数据类型，为空时取全部
						"formTypes": [1, 2, 3], //表单类型，为空时取全部
						"type": '1' //字段类型1：原生2衍生，为空时取全部
					}
					getNativeList(params).then(res => {
						if (res.code == 0) {
							this.nativeList = res.fields;
						}
					})
				} else {
					let params = {
						"dataTypes": [], //数据类型，为空时取全部
						"formTypes": [1, 2, 3], //表单类型，为空时取全部 1, 2, 3
						"type": '1' //字段类型1：原生2衍生，为空时取全部
					}
					getNativeList(params).then(res => {
						if (res.code == 0) {
							this.nativeList = res.fields;
						}
					})
					getFieldApiList().then(res => {
						console.log(res.apis)
						this.fieldApiList = res.apis
					})
				}
			},
			save() {
				if (this.form.fieldName == '' || this.form.name == '' || this.form.ruleType == '' || this.checkFieldName ||
					this.checkName) return this.showValidate = true;
				let params = {};
				if (this.form.ruleType == 1) {
					for (let i in this.enums) {
						if (!this.enums[i].fieldStartId || !this.enums[i].logicAction) return this.showValidate = true;
					}
					let complexMahtRuleVOs = [];
					if (this.enums.length == 1) {
						complexMahtRuleVOs = [{
							"logicAction": this.enums[0]
								.logicAction, //运算方式 1：加法，2：减法，3除，4乘， 5等于，6不等于，7包含， 8不包含， 9空判断，10非空判断
							"fieldStartId": this.form.fieldStartId, //第一个字段id
							"fieldEndId": this.enums[0].fieldStartId //第二个字段id
						}]
					} else if (this.enums.length == 2) {
						complexMahtRuleVOs = [{
							"logicAction": this.enums[0].cc,
							"fieldStartId": this.form.fieldStartId, //第一个字段id
							"fieldEndId": this.enums[0].fieldStartId //第二个字段id
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
				} else if (this.form.ruleType == 2) {
					if (!this.form.fieldStartId) return this.showValidate = true
					let fieldComplexCastRuleVOs = [];
					// if (this.checkField.formType == 2 || this.checkField.formType == 3) { // 选择类
					if (this.nativeList.find(n => n.id == this.form.fieldStartId) && (this.nativeList.find(n => n.id ==
							this.form.fieldStartId).formType == 2 || this.nativeList.find(n => n.id == this.form
							.fieldStartId).formType == 3)) {
						console.log('0', this.form.fieldComplexCastRuleVOs)
						for (let i in this.form.fieldComplexCastRuleVOs) {
							if (!this.form.fieldComplexCastRuleVOs[i].complexDataType || !this.form
								.fieldComplexCastRuleVOs[i].complexValue) return this.showValidate = true;
						}
						fieldComplexCastRuleVOs = this.form.fieldComplexCastRuleVOs;
					} else if (this.form.fieldStartId && !(this.nativeList.find(n => n.id == this.form.fieldStartId) && (
							this.nativeList.find(n => n.id == this.form.fieldStartId).formType == 2 || this.nativeList
							.find(n => n.id == this.form.fieldStartId).formType == 3))) { // 非选择类
						console.log('1', this.enums1)
						for (let i in this.enums1) {
							if (!this.enums1[i].complexValue || !this.enums1[i].logicAction || !this.enums1[i]
								.logicTargetValue) return this.showValidate = true;
						}
						for (let i = 0; i < this.enums1.length; i++) {
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
				} else {
					if (!this.form.apiId || !this.form.responseId) return this.showValidate = true
					for (let i in this.form.fieldAPIRuleVOS) {
						if (!this.form.fieldAPIRuleVOS[0].fieldApiId || !this.form.fieldAPIRuleVOS[0].fieldStartId)
						return this.showValidate = true;
					}
					let fieldAPIRuleVOS = JSON.parse(JSON.stringify(this.form.fieldAPIRuleVOS))
          fieldAPIRuleVOS = fieldAPIRuleVOS.filter(item => item.fieldApiId && item.fieldStartId)
					fieldAPIRuleVOS.push({
						apiType: 2,
						fieldId: null,
						fieldApiId: this.form.responseId, //接口id
					})
					params = {
						"fieldAPIRuleVOS": fieldAPIRuleVOS,
						"fieldName": this.form.fieldName,
						"dataType": '', // 暂时不传，如果有限制就随便传一个
						"ruleType": this.form.ruleType,
						"name": `${this.prepend}${this.form.name}`,
						"description": this.form.description,
						"type": this.form.type,
						apiId: this.form.apiId
					}
				}
				console.log(params)
				if (this.id) { //编辑
					params.id = this.id
					//修改方法
					updateComplex(params).then(res => {
						if (res.code == 0) {
							this.$message.success('编辑成功！');
							this.$router.push('/field-manage')
						} else {
							this.$message.warning(res.msg);
						}
					})
				} else { //新增
					saveComplex(params).then(res => {
						if (res.code == 0) {
							this.$message.success('新增成功！');
							this.$router.push('/field-manage')
						} else {
							this.$message.warning(res.msg ? res.msg : '新增失败！');
						}
					})
				}
			},
			back() {
				this.$router.go(-1)
			},
			// 校验字段显示名
			inputFieldName() {
				let regex = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$"); // 中文、英文、数字
				//判断输入框中有内容
				if (!regex.test(this.form.fieldName.trim())) {
					this.checkFieldName = true;
				} else this.checkFieldName = false;
			},
			inputName() {
				let regex = new RegExp("^[a-zA-Z0-9_]+$"); // 英文、数字、下划线
				//判断输入框中有内容
				if (!regex.test(this.form.name.trim())) {
					this.checkName = true;
				} else this.checkName = false;
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
			margin-bottom: 24px;

			&.options1 {
				.el-select {
					margin-left: 0;
					margin-right: 10px;
				}
			}

			&.options {
				h4 {
					font-size: 14px;
					margin-bottom: 10px;
				}

				.el-select {
					margin-left: 0;
				}
			}

			.el-input {
				width: 160px;
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
			line-height: 32px;
			cursor: pointer;
		}

		.delete-btn {
			font-size: 14px;
			margin-left: 15px;
			color: #f44336;
			line-height: 32px;
			cursor: pointer;
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
			position: relative;

			.validate-info {
				position: absolute;
				left: 0px;
				bottom: 9px;
				font-size: 12px;
			}

			.el-textarea {
				margin-bottom: 32px;
			}

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
				width: 160px;
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

		.add-item {
			margin-left: 84px;
			margin-bottom: 10px;

			.el-select,
			.el-input {
				margin-bottom: 15px;
			}
		}

		.cast {
			display: flex;
		}
	}
</style>
