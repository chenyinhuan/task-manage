<template>
  <div id="addTask">
    <p class="title">任务信息</p>
    <section>
      <p>任务名称</p>
      <el-input v-model="form.taskName" placeholder="请输入任务名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>任务说明</p>
      <el-input v-model="form.taskName" placeholder="请输入任务说明" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>任务模版</p>
      <el-select v-model="form.template" placeholder="选择任务模版"></el-select>
    </section>
    <section>
      <p>覆盖时间</p>
      <div class="date-des">
        <span>任务开始时间</span>
        <span>任务开始时间</span>
      </div>
      <div>
        <el-date-picker
          v-model="form.startDate"
          type="date"
          format="yyyy/MM/dd"
          :clearable="false"
          size:="125"
          placeholder="选择日期">
        </el-date-picker>
        <span style="margin: 0px 3px;">-</span>
        <el-date-picker
          v-model="form.endDate"
          type="date"
          :clearable="false"
          size:="125"
          format="yyyy/MM/dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </section>
    <section>
      <p>派发名单</p>
      <div class="assigment">
        <span>小叮当</span>
        <span class="add" @click="openDialog">+ 新增</span>
      </div>
    </section>
    <section>
      <p>任务类型</p>
      <el-radio-group v-model="form.radio">
          <el-radio :label="3">单记录任务</el-radio>
          <el-radio :label="6">多记录任务</el-radio>
        </el-radio-group>
    </section>
    <div class="foot">
      <el-button type="primary">创建</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="addDialog"
      width="30%"
      :before-close="handleClose">
      <section class="add-assigment">
        <div class="header">
          <span>直接派发</span>
          <span>由下级派发</span>
        </div>
        <div>

        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDialog = false">确 定</el-button>
      </span>
    </el-dialog>
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
          template: '',
          radio: '',
          startDate: '',
          endDate: ''
        },
        addDialog: false
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
      openDialog() {
        this.addDialog = true;
      },
      handleClose() {
        
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addTask {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;
    .title {
      font-size: 32px;
      line-height: 45px;
      color: #34335B;
      font-weight: bold;
      margin-bottom: 32px;
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
    section{
      p{
        font-size: 20px;
        font-weight: 600;
        color: #34335B;
        line-height: 28px;
        margin-bottom: 20px;
      }
      .assigment {
        font-size: 14px;
        color: #34335B;
        padding: 20px 14px;
        background-color: #F8FAFB;
        margin-bottom: 32px;
        .add {
          background-color: #FFFFFF;
          line-height: 20px;
          padding: 0px 12px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
      .date-des {
        display: flex;
        align-items: center;
        color: #E89003;
        font-size: 12px;
        margin-bottom: 8px;
        span:last-child {
          margin-left: 81px;
        }
      }
      .el-select{
        width: 160px;
        height: 32px;
        border-radius: 4px;
        margin-right: 15px;
        margin-bottom: 32px;
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
      .el-date-editor {
        position: relative;
        &.el-input {
          width: 125px;
          >>>.el-input__inner {
            padding-left: 10px;
          }
          >>>.el-input__prefix {
            left: unset;
            right: 0px;
            color: #333333;
          }
        }
      }
    }

  }
</style>
