<template>
  <div id="rolePermissionSetting">
    <section>
      <p>系统页面权限</p>
      <!-- @check="getMenuData" -->
      <div class="tree">
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="menuId"
          ref="tree"
          highlight-current
          :default-checked-keys="role.menuIdList"
          :props="defaultProps1">
        </el-tree>
      </div>
    </section>
    <section>
      <!-- @check="getData" -->
      <p>数据权限</p>
      <el-tree
        :data="deptList"
        show-checkbox
        default-expand-all
        node-key="deptId"
        ref="tree1"
        highlight-current
        :default-checked-keys="role.deptIdList"
        :props="defaultProps">
      </el-tree>
    </section>
    <div class="foot">
      <el-button type="primary" @click="save()"  v-preventReClick>保存</el-button>
    </div>
  </div>
</template>
<script>
  import {getDeptList} from '@/api/user-manage/organization/index.js';
  import {getRoleInfo, updateRole} from '@/api/user-manage/role/index.js';
  import {getMenuList} from '@/api/common/index.js'
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultProps1: {
          children: 'children',
          label: 'name'
        },
        form: {
          taskName: '',
          remark: '',
          template: ''
        },
        id: '',
        menuList: [],
        deptList: [],
        role:'',
        checkdDepList: [],
        keyDepArr: [],
        checkdMenuList: [],
        keyMenuArr: []
      }
    },
    created() {
      if(this.$route.query.id) this.id = this.$route.query.id;
       getDeptList().then(res => {
          this.deptList = this.$dealingwithadult(res);
       })

       getRoleInfo({id: this.id}).then(res => {
        if(res.code == 0) this.role = res.role;
       })

       getMenuList().then(res => {
		   this.menuList = this.$dealingwithMenu(res);
          // if(res.code == 0) this.menuList = res.menuList;
       })
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      getData() {
      	this.keyDepArr = []
      	this.checkdDepList = this.$refs.tree1.getCheckedNodes(false,true);
      	if (this.checkdDepList.length != 0) {
      		for (var i = 0; i < this.checkdDepList.length; i++) {
      			this.keyDepArr.push(this.checkdDepList[i])
      		}
      	} else {
      		this.keyDepArr = []
      	}
      },
      getMenuData() {
      	this.keyMenuArr = []
      	this.checkdMenuList = this.$refs.tree.getCheckedNodes(false,true);
      	if (this.checkdMenuList.length != 0) {
      		for (var i = 0; i < this.checkdMenuList.length; i++) {
      			this.keyMenuArr.push(this.checkdMenuList[i])
      		}
      	} else {
      		this.keyMenuArr = []
      	}
      },
      save() {
        this.getData();
        this.getMenuData();
        let deptIdList = this.keyDepArr.map(item => {
          return item.deptId;
        })
        let menuIdList = this.keyMenuArr.map(item => {
          return item.menuId;
        })
        let params = {
          deptIdList: deptIdList,
          menuIdList: menuIdList,
          roleId: this.role.roleId,
          roleName: this.role.roleName,
          remark: this.role.remark,
          deptId: this.role.deptId,
          deptName: this.role.deptName,
          createTime: this.role.createTime
        }
        updateRole(params).then(res => {
          if(res.code == 0) {
            this.$message.success('更新成功！');
            this.$router.push('/user-manage/role-setting')
          }
          else this.$message.warning(res.msg)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #rolePermissionSetting {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;
    .el-tree-node__content:hover,.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
      background-color: transparent;
    }
    .foot{
      margin-top: 60px;
      .el-button{
        width: 124px;
        height: 40px;
      }
    }
    section{
      .tree{
        width: 440px;
        background: #F5F5F5;
        border-radius: 4px;
        padding: 20px 30px;
        margin-bottom: 32px;
        font-size: 14px;
        color: #666777;
        .el-tree{
          background: transparent;
        }
      }
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
