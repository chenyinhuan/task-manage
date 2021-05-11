<template>
  <div id="accountConfig">
    <div class="main">
      <div class="tree">
        <el-input
          placeholder="请输入"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </div>
      <div class="table-list">
        <section class="search">
          <p>业务三部</p>
          <div>
            <el-input class="account" v-model="form.taskName" placeholder="请输入账号名"></el-input>
            <el-input v-model="form.taskName" placeholder="请输入登录账号"></el-input>
          </div>
        </section>
        <div class="foot">
          <el-button type="primary" @click="addAccount">添加账号</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                           v-for="(item,index) in tableColumn" :key="index">
            <template slot-scope="scope">
              <div v-if="item.slot && item.prop=='weight'" class="percent">
                <div class="dot" :class="[scope.$index == 0?'green':'',scope.$index == 1?'grey':'']"></div><span> {{scope.$index == 1?'未上架':'正常'}}</span>
              </div>
              <div v-if="item.slot && item.prop=='related'">
                <el-button type="text" @click="assocoated(scope.row)">关联</el-button>
              </div>
              <div v-if="item.slot && item.prop=='opt'">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </div>
              <div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
                       :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        filterText: '',
        data: [{
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentPage: 0,
        tableData: [{
          date: '2016-05-02',
          userName: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          userName: '王小虎',
          status: '完成'
        }, {
          date: '2016-05-01',
          userName: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          userName: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumn: [ // 表格列数据
          {
            label: '账号名/账号',
            prop: 'userName',
          },
          {
            label: '角色',
            prop: 'specName',
          },
          {
            label: '所属组织',
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
            label: '账户状态',
            prop: 'status',
            slot: true,
          },
          {
            label: '修改账户状态',
            prop: 'weight'
          },
          {
            label: '关联主播',
            prop: 'related',
            slot: true,
          },
          {
            label: '操作',
            prop: 'opt',
            slot: true,
          },
        ],
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
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      assocoated(item){
        this.$router.push('/user-manage/associated-anchor')
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      addAccount(){
        this.$router.push('/user-manage/add-account')
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

  #accountConfig {
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
          >>>.el-input__inner {
            font-size: 14px;
            padding-left: 8px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .table-list{
        width: 1192px;
        .iconfont{
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #21D487;
          border-radius: 50%;
          margin-right: 10px;
        }
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
