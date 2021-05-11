<template>
  <div id="addAccount">
    <section>
      <p>账户号</p>
      <el-input v-model="form.taskName" placeholder="请输入使用人手机号" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>用户姓名</p>
      <el-input v-model="form.taskName" placeholder="请输入用户姓名" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>登录密码</p>
      <el-input v-model="form.taskName" type="password" placeholder="请输入登录密码" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>确认登录密码</p>
      <el-input v-model="form.taskName" type="password" placeholder="请输入登录密码" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>匹配角色</p>
      <el-select v-model="form.template" placeholder="选择部门"></el-select>
      <el-select v-model="form.template" placeholder="选择角色"></el-select>
<!--      <a class="add">+新增</a>-->
    </section>
    <div class="foot">
      <el-button type="primary">创建</el-button>
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
          template: ''
        }
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addAccount {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;
    .foot{
      margin-top: 60px;
      .el-button{
        width: 124px;
        height: 40px;
        background: #0079FE;
        border-radius: 6px;
      }
    }
    section{
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
        margin-right: 15px;
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
