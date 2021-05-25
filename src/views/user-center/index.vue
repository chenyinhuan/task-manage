<template>
  <div id="userCenter">
      <section>
        <p>个人中心</p>
        <ul class="info">
          <li>
            <h3>账户名</h3>
            <p>张三</p>
          </li>
          <li>
            <h3>手机号</h3>
            <p>18888888888</p>
          </li>
          <li>
            <h3>密码</h3>
            <p><a @click="editPwd">修改</a></p>
          </li>
        </ul>
      </section>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" inline label-width="100px">
        <el-form-item label="原密码:">
          <el-input v-model="form.password" type="password" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码:">
          <el-input v-model="form.newPassword" type="password" placeholder="新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {resetPassword} from '@/api/user-center/index.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        form:{
          password: '',
          newPassword: ''
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
      editPwd(){
        this.dialogVisible = true
      },
      confirm(){
        if(!this.form.password) return this.$message.warning('请输入原密码');
        if(!this.form.newPassword) return this.$message.warning('请输入新密码')
        resetPassword(this.form).then(res=>{
          if(res.code == 0) {
            this.$message.success('修改成功！');
            this.dialogVisible = false
          }else {
            this.$message.warning(res.msg);
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #userCenter {
    padding: 40px 25px 36px 60px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;
    >>>.el-dialog__header{
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
    }
    .foot{
      margin-top: 60px;
      .el-button{
        width: 124px;
        height: 40px;
        background: #0079FE;
        border-radius: 6px;
      }
    }
    .info{
      li{
        padding: 15px 0;
        h3{
          font-size: 12px;
          line-height: 17px;
          color: #CDCDD5;
          margin-bottom: 4px;
        }
        p{
          font-size: 14px;
          line-height: 20px;
          color: #34335B;
          a{
            color: #0079FE;
          }
        }
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
