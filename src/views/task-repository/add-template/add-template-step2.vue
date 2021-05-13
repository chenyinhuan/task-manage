<template>
  <div id="step2">
    <p class="title">模版信息</p>
    <section>
      <p>任务指标名称</p>
      <el-input class="input" v-model="form.taskName" placeholder="请输入任务指标名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>任务指标计算</p>
      <div class="content">
        
      </div>
    </section>
    <section>
      <p>任务指标考核结束时间</p>
      <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="请填写日期">
      </el-date-picker>
    </section>
    <div class="foot">
      <el-button type="primary">保存模版</el-button>
      <el-button class="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        taskName: '',
        form: {
          taskName: '',
          date: ''
        },
        addDialog: false
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
      openDialog() {
        this.addDialog = true;
      },
      handleClose() {

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #step2 {
    height: 100%;
    width: 100%;
    .title {
      font-size: 32px;
      line-height: 45px;
      color: #34335B;
      font-weight: bold;
      margin-bottom: 32px;
    }
    .foot{
      margin-top: 60px;
      .el-button{
        width: 124px;
        height: 40px;
        border-radius: 6px;
        font-size: 18px;
        &.el-button--primary {
          background: #0079FE;
        }
        &.cancel {
          background-color: #F8FAFB;
          color: #9596AB;
        }
      }
    }
    section{
      p{
        font-size: 20px;
        font-weight: 600;
        color: #34335B;
        line-height: 28px;
        margin-bottom: 20px;
      }
      .input {
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
      .content {
        background-color: #F5F5F5;
        width: 860px;
        padding: 20px 30px 40px 30px;
        margin-bottom: 32px;
      }
      .el-date-editor {
        position: relative;
        &.el-input {
          width: 125px;
          >>>.el-input__inner {
            padding-left: 10px;
          }
          >>>.el-input__prefix {
            left: unset;
            right: 0px;
            color: #333333;
          }
        }
      }
    }

  }
</style>
