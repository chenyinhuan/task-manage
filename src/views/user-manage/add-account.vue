<template>
  <div id="addAccount">
    <section>
      <p>账户号</p>
      <el-input :class="[mobileValidate && !form.mobile?'validate-empty':'',
		  showValidate && form.mobile != ''?'validate-error':'']" @blur="inputMobile" v-model="form.mobile" placeholder="请输入使用人手机号" maxlength="11" show-word-limit></el-input>
      <span class="error" style="color: #FF8C00;" v-if="mobileValidate && !form.mobile">请输入账户名</span>
      <span class="error" style="color: #C03639;" v-if="showValidate && form.mobile != ''">手机号格式不正确</span>
    </section>
    <section>
      <p>用户姓名</p>
      <el-input :class="[nameValidate && !form.username?'validate-empty':'']" v-model="form.username" placeholder="请输入使用人姓名" @blur="inputName" maxlength="20" show-word-limit></el-input>
      <span class="error" style="color: #FF8C00;" v-show="nameValidate && !form.username">请输入使用人姓名</span>
    </section>
    <section>
      <p>登录密码</p>
      <el-input :class="[pswValidate && !form.password?'validate-empty':'',
	  pswValidate && form.password != '' && form.password.length<6?'validate-error':''
	  ]" v-model="form.password" type="password" @blur="inputPsw" auto-complete="new-password" placeholder="请输入6至20位登录密码" maxlength="20" show-word-limit></el-input>
      <span class="error" style="color: #FF8C00;" v-show="pswValidate && !form.password">请输入登录密码</span>
	  <span class="error" style="color: #C03639;" v-show="pswValidate && form.password != '' && form.password.length<6">请输入6至20位登录密码</span>
    </section>
    <section>
      <p>确认登录密码</p>
      <el-input :class="[conPswValidate && !form.conPassword?'validate-empty':'']" v-model="form.conPassword" type="password" @blur="inputConPsw" auto-complete="new-password" placeholder="请输入6至20位登录密码" maxlength="20" show-word-limit></el-input>
      <span class="error" style="color: #FF8C00;" v-show="conPswValidate && !form.conPassword">请输入登录密码</span>
      <span class="error" style="color: #C03639;" v-show="pswError">输入密码不一致！</span>
    </section>
	<section>
	  <p style="margin-bottom: 0px;">是否可被任务派发</p>
    <span class="label">如果可派发，则可被上级派发任务“由下级派发”时被选中为操作对象</span>
    <el-select class="ass-select" v-model="form.assigment" placeholder="选择派发权限">
      <el-option v-for="(item, index) in assigmentList" :key="index" :value="item.value" :label="item.label"></el-option>
    </el-select>
	</section>
    <section>
      <p>匹配角色</p>
      <div v-for="(item, index) in permission" :key="index" style="display: flex;align-items: center;position: relative;">
        <el-select v-model="item.deptId" placeholder="选择部门">
          <el-option v-for="(ditem,dindex) in deptlist" :key="dindex" :label="ditem.name"
        :value="ditem.deptId"></el-option>
        </el-select>
        <el-select v-model="item.roleIdList" placeholder="选择角色">
          <el-option v-for="(ritem,rindex) in roleList" :key="rindex" :label="ritem.roleName"
        :value="ritem.roleId"></el-option>
        </el-select>
		<span class="delete-btn" @click="deleteItem(index)" v-if="permission.length>1 && !(deptValidate && item.roleIdList == '')">X 删除</span>
        <span class="error1" v-show="deptValidate && item.roleIdList == ''">请选择部门/角色</span>
      </div>
      <el-button class="add-role" type="primary" @click="addRole()">+新增</el-button>
    </section>
    <div class="foot">
      <el-button type="primary" @click="create"  v-preventReClick>{{isEdit == 1?'修改':'创建'}}</el-button>
    </div>
  </div>
</template>
<script>
  import {getDeptList} from '@/api/user-manage/organization/index.js';
  import {getRoleList} from '@/api/user-manage/role/index.js';
  import {addAccount,updateAccount,getUserInfo} from '@/api/user-manage/account/index.js'
  export default {
    data() {
      return {
        taskName: '',
        permission: [
          {
            deptId: '',
            roleIdList: ''
          }
        ],
        form: {
          mobile: '',
          username: '',
          password: '',
          conPassword: '',
          deptId: '',
          roleIdList: [],
          email: '5688888@qq.com',
          assigment: ''
        },
        deptlist: [],
        roleList: [],
        isEdit: 0,
        validate: false,
        showValidate: false,
        pswError: false,
        mobileValidate:false,
        nameValidate: false,
        pswValidate: false,
        conPswValidate: false,
        deptValidate: false,
        assigmentList: [
          {value: 1, label: '可派发'},
          {value: 2, label: '不可派发'}
        ]
      }
    },
    created() {
      this.init();
      this.isEdit = this.$route.query.isEdit;
      this.userId = this.$route.query.id
      if(this.isEdit == 1) {
        getUserInfo({userId: this.$route.query.id}).then(res => {
          if(res.code == 0) {
            this.form = {
              mobile: res.user.mobile || '',
              username: res.user.username,
              password: res.user.password || '',
              conPassword: res.user.password || '',
              deptId: res.user.deptId || '',
              roleIdList: res.user.roleIdList || [],
              email: res.user.email || ''
            }
			this.permission = [];
			for(let i=0;i<res.user.roleIdList.length;i++) {
				let item = res.user.roleIdList[i];
				this.permission.push({deptId: res.user.deptId,roleIdList: item })
			}
          }
        })
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      init() {
        getDeptList().then(res => {
          this.deptlist = res;
        })
        getRoleList().then(res => {
          this.roleList = res.page.list;
        })
      },
      inputMobile() {
        if(!this.form.mobile){
          this.mobileValidate = true;
        }
      },
      inputName() {
        if(!this.form.username){
          this.nameValidate = true;
        }
      },
      inputPsw(){
        if(!this.form.password){
          this.pswValidate = true;
        }
      },
      inputConPsw(){
        if(!this.form.conPassword){
          this.conPswValidate = true;
        }
      },
      create() {
        var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        //判断输入框中有内容
        if(!this.form.mobile){
          this.mobileValidate = true;
          this.showValidate = false;
          return
        }
        if (this.form.mobile && !reg.test(this.form.mobile.trim())) {
          this.showValidate = true;
          this.mobileValidate = false;
          return
        }else {
          this.showValidate = false;
        }
        if(!this.form.username){
          this.nameValidate = true
          return
        }
        if(this.form.password == ''){
          this.pswValidate = true
          this.pswError = false;
          return
        }
		if(this.form.password.length < 6){
		  this.pswValidate = true
		  return
		}
        if(this.form.conPassword == ''){
           this.conPswValidate = true;
           this.pswError = false;
          return
        }
        if(this.form.password != '' && this.form.password != this.form.conPassword) {
           this.pswError = true;
           this.validate = false;
           return
        }
        let roleIdList = this.permission.map(item => {
          return item.roleIdList
        })
        if(!this.permission[0].deptId || !roleIdList[0]) {
          this.deptValidate = true
          return;
        }else{
          this.deptValidate = false
        }
        if(this.isEdit != 0) {
          let params = {
            mobile: this.form.mobile,
            username: this.form.username,
            password: this.form.password,
            conPassword: this.form.conPassword,
            deptId: this.permission[0].deptId,
            roleIdList: roleIdList,
            email: this.form.email,
            userId: this.userId
          }
          updateAccount(params).then(res => {
            if(res.code == 0) {
              this.$message.success('修改成功！');
              this.$router.push('/user-manage/account-config')
            }
            else this.$message.warning(res.msg)
          })
        }else {
          let params = {
            mobile: this.form.mobile,
            username: this.form.username,
            password: this.form.password,
            conPassword: this.form.conPassword,
            deptId: this.permission[0].deptId,
            roleIdList: roleIdList,
            email: this.form.email,
            status: 0
          }
          addAccount(params).then(res => {
            if(res.code == 0) {
              this.$message.success('创建成功！');
              this.$router.push('/user-manage/account-config')
            }else this.$message.warning(res.msg)
          })
        }
      },
      addRole() {
        this.permission.push({deptId: '',roleIdList: ''})
      },
	  deleteItem(index) {
		  this.permission.splice(index, 1)
	  }
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
      position: relative;
      .label{
        font-size: 12px;
        color: #FF8C00;
        display: block;
        margin-bottom: 32px;
        margin-top: 8px;
      }
      .validate-info {
      	position: absolute;
      	left: 0px;
      	bottom: 9px;
      	font-size: 12px;
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
        margin-right: 15px;
        margin-bottom: 12px;
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
      .ass-select {
        width: 440px;
        margin-bottom: 32px;
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
      .add-role {
        // margin-top: 24px;
      }
    }
    .error {
      position: absolute;
      color: $red;
      font-size: 12px;
      bottom: 7px;
      left: 0px;
    }
	.error1 {
		position: absolute;
		color: $red;
		font-size: 12px;
		bottom: 20px;
		left: 400px;
	}
	.delete-btn {
		bottom: 20px;
		position: absolute;
		font-size: 14px;
		margin-left: 15px;
		color: #f44336;
		cursor: pointer;
		left: 400px;
	}
  }
</style>
