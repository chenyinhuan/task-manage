<template>
  <div id="nativeField">
    <section>
      <p>字段显示名</p>
      <el-input :class="[showValidate && form.fieldName == ''?'validate-empty':'',
      showValidate && form.fieldName != '' && checkFieldName?'validate-error':'']" v-model="form.fieldName" @blur="inputFieldName" placeholder="请输入字段显示名" maxlength="20" show-word-limit></el-input>
      <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.fieldName == ''">请输入字段显示名</span>
      <span class="validate-info" style="color: #C03639;" v-if="showValidate && form.fieldName != '' && checkFieldName">请输入正确的字段显示名，支持中文、英文、数字</span>
    </section>
    <section>
      <p>字段名</p>
      <el-input :class="[showValidate && form.name == ''?'validate-empty':'',
      showValidate && form.name != '' && checkName?'validate-error':'']"
       v-model="form.name" @blur="inputName" placeholder="请输入字段名" maxlength="20" show-word-limit>
        <template style=" background: #D9D9D9;" slot="prepend">{{prepend}}</template>
      </el-input>
      <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.name == ''">请输入字段名</span>
      <span class="validate-info" style="color: #C03639;" v-if="showValidate && form.name != '' && checkName">请输入正确的字段名，支持英文、数字、下划线</span>
    </section>
    <section class="form-type">
      <div class="item">
        <p>表单类型</p>
        <el-select v-model="form.formType" placeholder="请选择表单类型" @change="changeFormType">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.formType==''">请选择表单类型</span>
      </div>
      <div class="item" style="position: relative">
        <p v-if="form.formType != '' && form.formType != 4">数据类型</p>
        <el-select v-model="form.dataType" placeholder="请选择数据类型" v-if="form.formType != '' && form.formType != 4"
          @change="changeDataType">
          <el-option v-for="item in dataTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.formType != '' && !form.dataType&& form.formType != 4">请选择数据类型</span>
      </div>
      <div class="item">
        <p v-if="form.formType == 2 || form.formType == 3">枚举值</p>
        <div v-if="form.formType == 2 || form.formType == 3" class="options">
          <div v-for="(item, index) in enums" :key="index" style="position:relative;">
            <el-input class="select" v-model="item.enumValue" placeholder="请输入" maxlength="20">
              <template style=" background: #D9D9D9;" slot="prepend">选项{{index+1}}</template>
            </el-input>
            <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && !item.enumValue">请输入枚举值</span>
            <span @click="remove(item,index)" v-if="index > 1" style="color: #C03639;margin-left: 10px;cursor: pointer;">X
              删除</span>
          </div>
          <el-button @click="addEditDomain()">新增选项</el-button>
        </div>
      </div>
    </section>
    <section>
      <p>字段描述</p>
      <div style="width: 440px;">
        <el-input :autosize="true" type="textarea" placeholder="请输入描述" v-model="form.description" maxlength="200"
          show-word-limit>
        </el-input>
      </div>
      <!-- <el-input v-model="form.description" placeholder="请输入描述" maxlength="200" show-word-limit></el-input> -->
    </section>
    <div class="foot">
      <el-button type="primary" @click="save()" v-preventReClick>保存</el-button>
      <el-button class="cancel" @click="back()">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {saveBasic, getNativeEnums,getBasicDetail,updateBasic} from '@/api/filed-manage/index.js'
  export default {
    name: "nativeField",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        options: this.$formTypeList,
        dataTypeList: this.$dataTypeList,
        form: {
          fieldName: '',
          name: '',
          description: '',
          formType: '',
          dataType: ''
        },
        enums: [{
            enumValue: ''
          },
          {
            enumValue: ''
          }
        ],
        showValidate: false,
        checkFieldName: false,
        checkName: false,
		prepend: 'basic_'
      }
    },
    created() {
      if (this.id && this.$route.query.type == 1) {
        this.init()
      }
    },
    methods: {
      init() {
        getBasicDetail({id:this.id}).then(res=>{
          this.form = res.field
          this.form.name = this.form.name.replace("basic_","")
          this.enums = this.form.enums
        })
      },
      addEditDomain() {
        this.enums.push({
          value: '',
          id: ''
        })
      },
      remove(item, index) {
        this.enums.splice(index, 1)
      },
      changeDataType() {

      },
      changeFormType() {
        this.form.dataType = '';
        this.enums = [{
            enumValue: ''
          },
          {
            enumValue: ''
          }
        ]
      },
      save() {
        console.log(this.form)
        if (this.form.fieldName == '' || this.form.name == '' ||  this.form.formType == '' || this.checkFieldName || this.checkName) return this.showValidate = true;

        if(this.form.formType == 2 || this.form.formType == 3){
          for(let i in this.enums){
            if(!this.enums[i].enumValue) return this.showValidate = true;
          }
        }
        if(this.form.formType !== 4 && !this.form.dataType) return this.showValidate = true;
        let params = {
          "dataType": this.form.dataType, //数据类型 1：字符串型string，2：整数int，3小数数值float，4日期date，5 时间time
          "description": this.form.description, //描述
          "fieldName": this.form.fieldName, //显示字段名
          "formType": this.form.formType, //表单类型 1：输入，2：单选，3多选，4文件
          "name": `${this.prepend}${this.form.name}`, //字段名
          "type": 1, //1：原生 2：衍生
          "enums": this.enums
        }
        if (this.id) { //编辑
          params.id = this.id
          //修改方法
          updateBasic(params).then(res => {
            if (res.code == 0) {
              this.$message.success('编辑成功！');
              this.$router.push('/field-manage')
            } else {
              this.$message.warning(res.msg);
            }
          })
        } else { //新增
          saveBasic(params).then(res => {
            console.log(res)
            if (res.code == 0) {
              this.$message.success('新增成功！');
              this.$router.push('/field-manage')
            } else {
              this.$message.warning(res.msg);
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
        if (!regex.test(this.form.fieldName)) {
          this.checkFieldName = true;
        }else this.checkFieldName = false;
      },
      inputName() {
        let regex = new RegExp("^[a-zA-Z0-9_]+$"); // 英文、数字、下划线
        //判断输入框中有内容
        if (!regex.test(this.form.name)) {
          this.checkName = true;
        }else this.checkName = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #nativeField {
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

      .select.el-input {
        width: 230px;
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

      &.form-type {
        display: flex;
        align-items: baseline;

        .item {
          display: inline-flex;
          flex-direction: column;
          margin-left: 40px;

          &:first-child {
            margin-left: 0px;
          }

          .options {
            display: flex;
            flex-direction: column;
          }
        }

        .el-button {
          width: 124px;
          height: 40px;
          background: #0079FE;
          color: #FFFFFF;
          border-radius: 6px;
          font-size: 18px;
        }
      }
    }
  }
</style>
