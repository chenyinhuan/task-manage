<template>
  <div id="addRole">
    <section>
      <p>角色名</p>
      <el-input v-model="roleName" placeholder="请输入角色名" maxlength="20" show-word-limit></el-input>
    </section>
    <div class="foot">
      <el-button type="primary" @click="addRole">创建</el-button>
    </div>
  </div>
</template>
<script>
import {saveAddRole} from '@/api/user-manage/role/index'
  export default {
    data() {
      return {
        roleName: '',
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
      addRole(){
        if(!this.roleName) return this.$message.warning('角色名不能为空');
        saveAddRole({roleName: this.roleName}).then(res=>{
          if(res.data==200){

          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addRole {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;
    .foot{
      .el-button{
        width: 124px;
        height: 40px;
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
    }

  }
</style>
