<template>
  <div id="deriveField">
    <section>
      <p>字段显示名</p>
      <el-input v-model="form.fieldName" placeholder="请输入字段显示名" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>字段名</p>
      <el-input v-model="form.name" placeholder="请输入字段名" maxlength="20" show-word-limit>
        <template style=" background: #D9D9D9;" slot="prepend">complex_</template>
      </el-input>
    </section>
    <section>
      <p>字段描述</p>
      <el-input v-model="form.description" placeholder="请输入描述" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <h3>加工规则</h3>
      <p>加工规则</p>
      <el-select v-model="form.ruleType" placeholder="选择加工方式">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="warning-info" v-if="form.ruleType == 1">说明：四则运算只针对number型（int、float）数据类型计算</span>
      <div class="item" v-if="form.ruleType ==1">
        <div class="options">
          <label>衍生字段=</label>
          <el-select v-model="form.fieldStartId" placeholder="选择字段">
            <el-option
              v-for="item in fieldType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div v-for="(item, index) in enums" :key="index">
            <el-select v-model="item.logicAction" placeholder="运算方式">
              <el-option
                v-for="item in calcType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="item.fieldStartId" placeholder="选择字段">
              <el-option
                v-for="item in fieldType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <a class="add-btn" v-if="enums.length==1" @click="addEditDomain()">+新增</a>
          <a  class="delete-btn" v-if="enums.length>1" @click="deleteEditDomain()">X删除</a>
        </div>
      </div>
      <div class="item" v-if="form.ruleType ==2">
        <el-select v-model="form.fieldEnumId" placeholder="选择字段">
          <el-option
            v-for="item in fieldType1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div v-if="form.fieldEnumId==1 || form.fieldEnumId==2">
          <div class="options" v-for="(citem,index) in form.fieldComplexCastRuleVOs">
            <el-input v-model="form.name" :placeholder="index==0?'法务审核':'邮寄中'">
              <template style=" background: #D9D9D9;" slot="prepend">{{index==0?'选项1':'选项2'}}</template>
            </el-input>
            <span style="margin: 0 15px">则</span>
            <label style="margin-right: 10px">衍生字段=</label>
            <el-input v-model="citem.enumValue"></el-input>
            <el-select v-model="citem.logicAction" placeholder="选择数据类型">
              <el-option
                v-for="item in dataTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div v-if="form.fieldEnumId==3">
          <div v-for="(item, index) in enums1" :key="index" class="options options1">
            <el-select v-model="item.complexDataType" placeholder="运算方式">
              <el-option
                v-for="item in calcType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="item.enumValue"></el-input>
            <span style="margin: 0 15px">则</span>
            <label style="margin-right: 10px">衍生字段=</label>
            <el-input v-model="item.complexValue"></el-input>
          </div>
          <a class="add-btn" v-if="enums1.length==1" @click="addEditDomain1()">+新增</a>
          <a  class="delete-btn" v-if="enums1.length>1" @click="deleteEditDomain1()">X删除</a>
        </div>
      </div>
    </section>
    <div class="foot">
      <el-button type="primary">保存</el-button>
      <el-button class="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "deriveField",
  data() {
    return {
      calcType: [
        {
          value: 1,
          label: '增加'
        },
        {
          value: 2,
          label: '减去'
        },
        {
          value: 3,
          label: '除以'
        },
        {
          value: 4,
          label: '乘以'
        },
        {
          value: 5,
          label: '等于'
        },
        {
          value: 6,
          label: '不等于'
        },
        {
          value: 7,
          label: '包含'
        },
        {
          value: 8,
          label: '不包含'
        },
        {
          value: 9,
          label: '空判断'
        },
        {
          value: 10,
          label: '非空判断'
        },

      ],
      fieldType: [
        {
          value: 1,
          label: 'V任务费用'
        },
        {
          value: 2,
          label: '已收佣金'
        },
        {
          value: 3,
          label: '虚补佣金'
        },
      ],
      fieldType1: [
        {
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
      dataTypeList: [{
        value: 1,
        label: '字符串string'
      },
        {
          value: 2,
          label: '整数数值init'
        },
        {
          value: 3,
          label: '小数数值float'
        },
        {
          value: 4,
          label: '日期date'
        },
        {
          value: 5,
          label: '时间time'
        }],
      enums: [
        {
          logicAction: '',
          fieldStartId: ''
        },
      ],
      enums1:[
        {
          logicAction: '',
          fieldStartId: ''
        },
      ],
      form: {
        showName: '',
        name: '',
        description: '',
        ruleType: '',
        type: 2, //衍生
        fieldStartId: '',
        fieldComplexCastRuleVOs:[
          {
            complexValue: "",
            enumValue: "",
            fieldStartId: 2,
            complexDataType: 1,
            fieldEnumId: 2
          },
          {
            complexValue: "",
            enumValue: "",
            fieldStartId: 2,
            complexDataType: 1,
            fieldEnumId: 2
          }
        ]
      }
    }
  },
  methods:{
    addEditDomain() {
      this.enums.push({logicAction: '',fieldStartId: ''})
    },
    addEditDomain1() {
      this.enums1.push({logicAction: '',fieldStartId: ''})
    },
    deleteEditDomain(){
      this.enums.splice(0,this.enums.length-1)
    },
    deleteEditDomain1(){
      this.enums1.splice(0,this.enums1.length-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

#deriveField {
  .warning-info{
    font-size: 14px;
    margin-left: 10px;
  }
  .options{
    display: flex;
    /*align-content: center;*/
    align-items: center;
    margin-bottom: 15px;
    &.options1{
      .el-select{
        margin-left: 0;
        margin-right: 10px;
      }
    }
    .el-input{
      width: 181px;
      height: 32px;
      border-radius: 4px;
      margin-bottom: 0;
      margin-right: 10px;
    }
    .el-select{
      margin-bottom: 0;
      margin-left: 10px;
    }

  }
  .add-btn{
    font-size: 14px;
    margin-left: 10px;
    color: #0079FE;
  }
  .delete-btn{
    font-size: 14px;
    margin-left: 10px;
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
  >>>.el-input-group__append, >>>.el-input-group__prepend {
    background-color: #D9D9D9;
    color: #FFFFFF;
    border-color: #D9D9D9;
    padding: 0px 14px;
  }
  h3{
    font-size: 32px;
    color: #34335B;
    margin-bottom: 32px;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #666777;
  }
  .foot{
    margin-top: 60px;
    .el-button{
      width: 124px;
      height: 40px;
      background: #0079FE;
      border-radius: 6px;
      font-size: 18px;
      &.cancel{
        width: 160px;
        height: 40px;
        background: #F8FAFB;
        border-color: #F8FAFB;
        border-radius: 6px;
        color: #9596AB;
      }
    }
  }
  section{
    .label{
      font-size: 12px;
      color: #FF8C00;
      display: block;
      margin-bottom: 32px;
      margin-top: 8px;
    }
    .add{
      font-size: 14px;
      font-weight: 500;
      color: #0079FE;
      line-height: 20px;
    }
    p{
      font-size: 20px;
      font-weight: 600;
      color: #34335B;
      line-height: 28px;
      margin-bottom: 20px;
    }
    .el-select{
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
      >>> .el-input__icon {
        line-height: 30px;
      }
    }
    .el-input {
      width: 440px;
      height: 32px;
      border-radius: 4px;
      margin-bottom: 32px;
      .el-input-group__prepend{
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

}
</style>
