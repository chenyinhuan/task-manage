<template>
  <div id="taskDtlList" :style="{'height': tableData.length==0?'661px':''}">
    <section class="hd">
      <p>派发任务明细</p>
      <el-input v-model="keyword" placeholder="账户名/账号" @keyup.enter.native="search"><i slot="prefix"
          class="el-input__icon el-icon-search"></i></el-input>
    </section>
    <el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for="(item,index) in tableColumn"
        :key="index">
        <template slot-scope="scope">
          <div v-if="item.slot && item.prop=='username'">
            <span>{{scope.row.username}}/{{scope.row.mobi}}</span>
          </div>
          <div v-if="item.slot && item.prop=='opt'">
            <el-button type="primary" @click.stop="go(scope.row)">查看详情</el-button>
          </div>
          <div v-if="item.slot && item.prop == 'leaderComment'">
            <el-input v-model="scope.row.leaderComment" maxlength="200" ></el-input>
          </div>
          <div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
      :current-page.sync="currentPage" :page-size="limit" layout="prev, pager, next, jumper" :total="total">
    </el-pagination>
    <div class="tempty" v-if="tableData.length==0 && isShow">
      <img src="@/images/my-task/illustration.png">
      <p>还没有任务明细～</p>
    </div>
  </div>
</template>
<script>
  import {
    getTaskDetail
  } from '@/api/task-repository/index'
  export default {
    data() {
      return {
        tableData: [],
        tableColumn: [ // 表格列数据
          {
            label: '任务名称',
            prop: 'taskName',
          },
          {
            label: '账户名/账户号',
            prop: 'username',
            slot: true
          },
          {
            label: '账户角色',
            prop: 'roleName',
          },
          {
            label: '完成指标率',
            prop: 'taskProcess',
          },
          {
            label: '评价说明',
            prop: 'leaderComment',
            slot: true,
          },
          {
            label: '操作',
            prop: 'opt',
            slot: true,
          },
        ],
        currentPage: 0,
        limit: 10,
        total: 0,
        isShow: false,
        keyword: '',
        taskId: ''
      }
    },
    created() {
      this.taskId = this.$route.query.id
      this.init()
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      init() {
        let params = {
          taskId: this.taskId,
          page: this.currentPage,
          limit: this.limit,
          keyword: this.keyword
        }
        getTaskDetail(params).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount
          this.isShow = true;
        })
      },
      handleSizeChange(val) {
        this.limit = val;
        this.currentPage = 1;
        this.init();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.init();
      },
      search() {
        this.currentPage = 1;
        this.init();
      },
      go(row) {
        this.$router.push({
          path: '/task-center/task-target-list',
          query: {
            id: row.taskId
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #taskDtlList {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

    .hd {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: bold;
        color: #292933;
        font-size: 20px;
        line-height: 28px;
      }

      .el-input {
        width: 160px;
        background-color: #F8FAFB;

        >>>.el-input__inner {
          height: 40px;
          line-height: 40px;
          width: 160px;
          border-radius: 5px;
          background-color: #F8FAFB;
          border: 0px;
          font-size: 14px;
          padding-left: 43px;
        }

        >>>.el-input__prefix {
          left: 11px;
        }

        >>>.el-input__icon {
          font-size: 20px;
          line-height: 40px;
          color: #9596AB;
        }
      }
    }

    .el-table {

      .el-button {
        background-color: #0079FE;
        padding: 5px;
        color: #FFFFFF;
        font-size: 14px;
      }

      .percent {
        display: flex;
        align-items: center;

        span {
          margin-left: 6px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;

          &.green {
            background-color: #21D487;
          }

          &.blue {
            background-color: #4AB1E1;
          }

          &.red {
            background-color: #FC5555;
          }
        }
      }
    }

    .tempty {
      text-align: center;
      padding-top: 145px;

      img {
        width: 84px;
        height: 109px;
      }

      p {
        color: #9596AB;
        font-size: 20px;
        line-height: 28px;
        margin-top: 39px;
        font-weight: 400;
      }
    }

  }
</style>
