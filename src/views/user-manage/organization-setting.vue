<template>
  <div id="organizationSetting">
    <div class="main">
      <div class="tree">
        <el-input prefix-icon="el-icon-search" placeholder="请输入" v-model="filterText"></el-input>
        <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all
                 :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick" node-key="id"></el-tree>
      </div>
      <div class="table-list">
        <section class="search">
          <p>{{deptName}}</p>
        </section>
        <div class="foot">
          <el-button type="primary" @click="addOrganization">添加组织</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                           v-for="(item,index) in tableColumn" :key="index">
            <template slot-scope="scope">
              <div v-if="item.slot && item.prop=='opt'">
                <el-button type="text" @click="editRow(scope.row)">编辑</el-button>
                <el-button type="text" @click="del(scope.row)">删除</el-button>
              </div>
              <div v-if="item.slot && item.prop=='name'">
                <span>{{scope.row.name}}/{{scope.row.deptId}}</span>
              </div>
              <div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {getDeptList,deleteDept} from '@/api/user-manage/organization/index';
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
            label: '组织名称/id',
            prop: 'name',
          },
          {
            label: '所属组织',
            prop: 'parentName',
          },
          {
            label: '手机号',
            prop: 'explain',
          },
          {
            label: '创建人',
            prop: 'weight'
          },
          {
            label: '创建时间',
            prop: 'weight'
          },
          {
            label: '操作',
            prop: 'opt',
            slot: true,
          },
        ],
        taskName: '',
        deptId:'',
        deptName: '',
        actionList: {}
      }
    },
    created() {
      this.init()
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
        this.init();
      },
      init() {
        getDeptList({deptId: this.deptId}).then(res => {
          if(res.code != 500) {
            this.tableData = res;
            this.data = this.$dealingwithadult(res);
            if(!this.deptId) {
              this.deptId = this.data[0].deptId
              this.deptName = this.data[0].name
            }
          }
        })
      },
      editRow(item){
        this.$router.push('/user-manage/add-organization?item='+JSON.stringify(item))
      },
      del(item){
        this.$confirm('删除后将无法恢复该组织相关配置项，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDept({deptId: item.deptId}).then(res => {
            if(res.code == 500) return this.$message.warning(res.msg);
            else this.$message.success('删除成功！')
            this.init()
          })
        })
      },
      assocoated(item){
        this.$router.push('/user-manage/associated-anchor')
      },
      filterNode(value, data) {
      	if (!value) return true;
      	return data.name.indexOf(value) !== -1;
      },
      addOrganization(){
        this.$router.push('/user-manage/add-organization?type=1&deptId='+this.deptId)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
  }
</script>
<style lang="scss">
  @import '@/styles/variables.scss';

  #organizationSetting {
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
