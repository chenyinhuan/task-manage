<template>
  <div id="deriveField">
    <section>
      <p>字段显示名</p>
      <el-input v-model="form.taskName" placeholder="请输入字段显示名" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>字段名</p>
      <el-input v-model="form.taskName" placeholder="请输入字段名" maxlength="20" show-word-limit>
        <template style=" background: #D9D9D9;" slot="prepend">complex_</template>
      </el-input>
    </section>
    <section>
      <p>字段描述</p>
      <el-input v-model="form.taskName" placeholder="请输入描述" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <h3>加工规则</h3>
      <p>加工规则</p>
      <el-select v-model="form.template" placeholder="选择加工方式"></el-select>
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
      form: {
        taskName: '',
        remark: '',
        template: ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

#deriveField {
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
