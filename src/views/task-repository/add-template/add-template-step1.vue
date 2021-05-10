<template>
  <div id="step1">
    <p class="title">模版信息</p>
    <section>
      <p>模版名称</p>
      <el-input v-model="form.taskName" placeholder="请输入任务名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>模版说明</p>
      <el-input v-model="form.taskName" placeholder="请输入任务说明" maxlength="20" show-word-limit></el-input>
    </section>
    <section style="margin-bottom: 32px;">
      <p>表单字段（原生字段）</p>
      <div class="field">
        <div class="field-item">
          <span>商品ID</span>
          <el-input v-model="form.taskName" placeholder="请输入商品ID"></el-input>
        </div>
        <div class="add-field">+ 新增表单字段</div>
      </div>
    </section>
    <section>
      <p>监测字段（衍生字段）</p>
      <div class="field">
        <div class="add-field">+ 新增表单字段</div>
      </div>
    </section>
    <div class="foot">
      <el-button>上一步</el-button>
      <el-button type="primary">创建</el-button>
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
          remark: '',
          template: '',
          radio: '',
          startDate: '',
          endDate: ''
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

  #step1 {
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
        background-color: #F5F5F5;
        width: 860px;
        padding: 5px 0px 40px 30px;
        .add-field {
          color: #0079FE;
          font-size: 16px;
        }
        &-item {
          color: #9596AB;
          font-size: 14px;
          span {
            line-height: 20px;
          }
          .el-input {
            width: 240px;
            height: 32px;
            border-radius: 4px;
            >>>.el-input__inner {
              font-size: 14px;
              padding-left: 8px;
              height: 32px;
              line-height: 32px;
            }
          }
        }
      }
    }

  }
</style>
