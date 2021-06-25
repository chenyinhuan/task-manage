<template>
  <div id="roleSetting">
    <div class="main">
      <div class="tree">
        <el-input prefix-icon="el-icon-search" placeholder="请输入" v-model="filterText"></el-input>
        <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all
                 :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick" node-key="id">
        </el-tree>
      </div>
      <div class="table-list">
        <section class="search">
          <p>{{deptName}}</p>
        </section>
        <div class="foot">
          <el-button type="primary" @click="addRole">添加角色</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                           v-for="(item,index) in tableColumn" :key="index">
            <template slot-scope="scope">
              <div v-if="item.slot && item.prop=='menuIdList'">
                <el-button @click="permissionConfig(scope.row)" type="text">配置</el-button>
              </div>
              <div v-if="item.slot && item.prop=='opt'">
                <el-button type="text" @click="editRow(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteCurRow(scope.row)">删除</el-button>
              </div>
              <div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
                       :current-page.sync="searchParams.page" :page-size="searchParams.limit" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {getRoleList,deleteRole,getRoleSelect} from '@/api/user-manage/role/index'
import {getDeptList} from '@/api/user-manage/organization/index';
  import {
  	mapGetters,
  	mapActions,
  } from 'vuex'
  export default {
    data() {
      return {
        filterText: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        total: 0,
        tableData: [],
        tableColumn: [ // 表格列数据
          {
            label: '角色编号',
            prop: 'roleId',
          },
          {
            label: '角色',
            prop: 'roleName',
          },
          {
            label: '所属组织',
            prop: 'deptName',
          },
          {
            label: '创建人',
            prop: 'weight'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            width: '200'
          },
          {
            label: '关联账户数',
            prop: 'weight'
          },
          {
            label: '权限管理',
            prop: 'menuIdList',
            slot: true,
          },
          {
            label: '操作',
            prop: 'opt',
            slot: true,
          },
        ],
        taskName: '',
        searchParams:{
          page: 1,
          limit: 10
        },
        deptId: '',
        deptName: '',
        actionList: {}
      }
    },
    created() {
      this.init()
      this.getDeptList();
    },
    computed:{
      ...mapGetters({action: 'module/action'}),
    },
    mounted() {

    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      action: {
        handler(val, oldVal) {
          if(val) {
            this.actionList = val.find(n => n.url == this.$route.path)
          }
        },
        immediate: true,
        deep: true //true 深度监听
      }
    },
    methods: {
      // 点击节点名称触发的事件
      handleNodeClick (data) {
        this.deptId = data.deptId
        this.deptName = data.name
        this.searchParams.page = 1;
        this.init();
      },
      getDeptList() {
        getDeptList().then(res => {
          if(res.code != 500) {
            this.data = this.$dealingwithadult(res);
            this.deptId = this.data[0].deptId
            this.deptName = this.data[0].name
          }else {
            this.data = [];
          }
        })
      },
      init() {
        getRoleList(this.searchParams).then(res => {
          if (res.code != 0) return this.$message.warning(res.msg);
          this.tableData = res.page.list;
          this.total = res.page.totalCount;
        })
      },
      deleteCurRow(row){
        this.$confirm('确定删除该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole([row.roleId]).then(res => {
            if(res.code == 500) return this.$message.warning(res.msg);
            this.$message.success('删除成功！');
			this.searchParams.page  = 1;
            this.init()
          })
        })
      },
      editRow(item){
        this.$router.push('/user-manage/add-role?item='+JSON.stringify(item))
      },
      permissionConfig(item){
        this.$router.push(`/user-manage/role-permission-setting?id=${item.roleId}`)
      },
      assocoated(item){
        this.$router.push(`/user-manage/associated-anchor?id=${item.roleId}`)
      },
      filterNode(value, data) {
      	if (!value) return true;
      	return data.name.indexOf(value) !== -1;
      },
      addRole(){
        this.$router.push('/user-manage/add-role?type=1&deptId='+this.deptId+'&deptName='+this.deptName)
      },
      handleSizeChange(val) {
		  this.searchParams.limit = val;
      	this.searchParams.page  = 1;
      	this.init();
      	console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
      	this.searchParams.page = val;
      	this.init();
      	console.log(`当前页: ${val}`);
      },
    }
  }
</script>
<style lang="scss">
  @import '@/styles/variables.scss';

  #roleSetting {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    .main{
      display: flex;
      /*justify-content: space-between;*/
      .tree{
        width: 403px;
        padding-right: 110px;
        .expanded{
          color: #D8D8D8;
        }
        .el-tree-node__label{
          color: #666777;
          line-height: 20px;
        }
        .el-tree-node__content:hover, .is-current{
          background: #F5F7FA;
        }
        .el-input{
          width: 237px;
          height: 40px;
          border-radius: 6px;
          margin-bottom: 24px;
          .el-input__prefix{
           left: 13px;
          }
          .el-input__inner {
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #CDCDD5;
            padding-left: 46px;
          }
          .el-input__icon{
            font-size: 20px;
            line-height: 40px;
            color: #9596AB;
          }
        }
      }
      .table-list{
        width: 1192px;
      }
    }
    .search{
      display: flex;
      justify-content: space-between;
      .el-input{
        width: 200px;
        &.account{
          margin-right: 15px;
        }
      }
    }
    .foot{
      .el-button{
        width: 96px;
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
        margin-bottom: 14px;
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
      }
      .el-input {
        width: 440px;
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
</style>
