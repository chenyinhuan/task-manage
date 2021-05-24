<template>
  <div id="nativeField">
    <section>
      <p>字段显示名</p>
      <el-input v-model="form.showName" placeholder="请输入字段显示名" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>字段名</p>
      <el-input v-model="form.name" placeholder="请输入字段名" maxlength="20" show-word-limit>
        <template style=" background: #D9D9D9;" slot="prepend">basic_</template>
      </el-input>
    </section>
    <section class="form-type">
      <div class="item">
        <p>表单类型</p>
      <el-select v-model="form.formType" placeholder="请选择表单类型" @change="changeFormType">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div class="item">
        <p v-if="form.formType != '' && form.formType != 4">数据类型</p>
        <el-select v-model="form.dataType" placeholder="请选择数据类型" v-if="form.formType != '' && form.formType != 4" @change="changeDataType">
          <el-option
            v-for="item in dataTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <p v-if="form.formType == 2 || form.formType == 3">枚举值</p>
        <div v-if="form.formType == 2 || form.formType == 3" class="options">
          <div v-for="(item, index) in enums" :key="index">
            <el-input class="select" v-model="item.enumValue" placeholder="请输入" maxlength="20">
              <template style=" background: #D9D9D9;" slot="prepend">选项{{index+1}}</template>
            </el-input>
            <span @click="remove(item,index)" v-if="index > 1" style="color: #C03639;margin-left: 10px;cursor: pointer;">X删除</span>
          </div>
          <el-button @click="addEditDomain()">新增选项</el-button>
        </div>
      </div>
    </section>
    <section>
      <p>字段描述</p>
      <el-input v-model="form.remark" placeholder="请输入描述" maxlength="20" show-word-limit></el-input>
    </section>
    <div class="foot">
      <el-button type="primary">保存</el-button>
      <el-button class="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "nativeField",
  data() {
    return {
      options: this.$formTypeList,
      dataTypeList: this.$dataTypeList,
      form: {
        showName: '',
        name: '',
        remark: '',
        formType: '',
        dataType: ''
      },
      enums: [
        {
          enumValue: ''
        },
        {
          enumValue: ''
        }
      ]
    }
  },
  methods: {
    addEditDomain() {
      this.enums.push({value: '',id: ''})
    },
    remove(item,index) {
      this.enums.splice(index,1)
    },
    changeDataType() {

    },
    changeFormType() {
      this.form.dataType = '';
      this.enums = [
        {
          enumValue: ''
        },
        {
          enumValue: ''
        }
      ]
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
    .select.el-input {
      width: 230px;
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
