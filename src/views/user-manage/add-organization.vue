<template>
  <div id="addOrganization">
    <section>
      <p>组织名</p>
      <el-input :class="[validate && formData.name == ''?'validate-empty':'',
		  validate && formData.name != '' && checkName?'validate-error':'']" v-model="formData.name" @blur="inputName" placeholder="请输入组织名" maxlength="20" show-word-limit></el-input>
      <span class="error" style="color: #FF8C00;"  v-show="validate && !formData.name">请输入组织名</span>
      <span class="error" style="color: #C03639;" v-show="validate && formData.name!='' && checkName">支持中文、英文，20字符以内</span>
    </section>
    <div class="foot">
      <el-button type="primary" @click="addDept">{{type?'创建':'修改'}}</el-button>
    </div>
  </div>
</template>
<script>
  import {saveAddDept,updateAddDept} from '@/api/user-manage/organization/index'
  export default {
    data() {
      return {
        formData: {
          name: ''
        },
        type: '',
        validate: false,
        checkName: false
      }
    },
    created() {
      this.type = this.$route.query.type
      if(this.$route.query.item) this.formData = JSON.parse(this.$route.query.item);
      if(this.$route.query.deptId) this.formData.parentId = this.$route.query.deptId;
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      inputName() {
        let regex = new RegExp("^[A-Za-z\u4e00-\u9fa5]+$"); // 中文、英文
        //判断输入框中有内容
        if (!regex.test(this.formData.name.trim())) {
          this.checkName = true;
        } else this.checkName = false;
      },
      addDept(){
        if(!this.formData.name) return this.validate = true;
        if(this.type){
          saveAddDept(this.formData).then(res=>{
            if(res.code==0){
              this.$message.success('保存成功')
              this.$router.go(-1)
            }else{
              this.$message.warning(res.msg)
            }
          })
        }else{
          updateAddDept(this.formData).then(res=>{
            if(res.code==0){
              this.$message.success('修改成功')
              this.$router.go(-1)
            }else{
              this.$message.warning(res.msg)
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addOrganization {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;
    .error {
      position: absolute;
      color: $red;
      font-size: 12px;
      bottom: 7px;
      left: 0px;
    }
    .foot{
      .el-button{
        width: 124px;
        height: 40px;
      }
    }
    section{
      position: relative;
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
