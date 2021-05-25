<template>
  <div id="addField">
    <h3>字段信息</h3>
    <section>
      <p>新增字段</p>
      <el-checkbox-group v-model="checkList" @change="bindCheckBox">
        <el-checkbox :label="1">原生字段</el-checkbox>
        <el-checkbox :label="2">衍生字段</el-checkbox>
      </el-checkbox-group>
      <span class="label">{{checkList[0]==1?'直接创建的字段为原生字段':'原生字段的基础上，经过计算逻辑可以变化生成衍生字段'}}</span>
    </section>
    <native-field v-show="checkList[0] == 1" :id="id"></native-field>
    <derive-field v-show="checkList[0] == 2" :id="id"></derive-field>
  </div>
</template>
<script>
  import nativeField from "./group/nativeField";
  import deriveField from "./group/deriveField";
  export default {
    components:{
      nativeField,deriveField
    },
    data() {
      return {
        checkList: [1],
        taskName: '',
        form: {
          taskName: '',
          remark: '',
          template: ''
        },
        id: ''
      }
    },
    created() {
      this.id = this.$route.query.id
      this.checkList = [Number(this.$route.query.type)]
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      bindCheckBox(value){
        if(this.checkList.length > 1){
          this.checkList.splice(0,1)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addField {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
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
