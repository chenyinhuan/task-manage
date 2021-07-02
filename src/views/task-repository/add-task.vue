<template>
  <div id="addTask">
    <p class="title">任务信息</p>
    <section>
      <p>任务名称</p>
      <el-input :disabled="isDisabled" :class="[showValidate && form.taskName == ''?'validate-empty':'',
		  showValidate && form.taskName != '' && checkTaskName?'validate-error':'']" v-model="form.taskName"
                placeholder="请输入任务名称" @blur="inputTaskName" maxlength="20" show-word-limit></el-input>
      <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.taskName == ''">请输入任务名称</span>
      <span class="validate-info" style="color: #C03639;"
            v-if="showValidate && form.taskName != '' && checkTaskName">请输入正确的任务名称，支持中文、英文、数字</span>
    </section>
    <section>
      <p>任务说明</p>
      <el-input :disabled="isDisabled" v-model="form.description" placeholder="请输入任务说明" maxlength="200" show-word-limit></el-input>
    </section>
    <section>
      <p>任务模版</p>
      <el-select v-model="form.taskTplId" placeholder="选择任务模版" :disabled="isDisabled || isEdit==1">
        <el-option v-for="(item,index) in taskTplList" :value="item.id" :key="index" :label="item.taskName">
        </el-option>
      </el-select>
      <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.taskTplId == ''">请选择任务模版</span>
    </section>
    <section>
      <p>覆盖时间</p>
      <div class="date-des">
        <span>任务开始时间</span>
        <span>任务结束时间</span>
      </div>
      <div>
        <el-date-picker :disabled="isDisabled" v-model="form.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="startTimeRule" :clearable="false" placeholder="选择日期">
        </el-date-picker>
        <span style="margin: 0px 3px;">-</span>
        <el-date-picker :disabled="isDisabled" v-model="form.endTime" type="datetime" :clearable="false" :picker-options="endTimeRule"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
        </el-date-picker>
      </div>
      <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.startTime == ''">请选择任务开始时间</span>
      <span class="validate-info" style="color: #FF8C00;left: 200px;"
            v-if="showValidate && form.endTime == ''">请选择任务结束时间</span>
      <span class="validate-info" style="color: #FF8C00;"
            v-if="showValidate && form.endTime != '' && form.startTime != '' && validateTime">任务结束时间不能大于任务开始时间</span>
    </section>
    <section>
      <p>派发名单</p>
      <div class="assigment">
        <span v-for="(item,index) in form.users" :key="index" style="margin-right: 10px">{{item.username}}</span>
        <span v-if="!isDisabled" class="add" @click="openDialog">+ 新增</span>
      </div>
      <span class="validate-info" style="color: #FF8C00;bottom: -22px;"
            v-if="showValidate && form.users.length == 0">请选择派发名单</span>
    </section>
    <section>
      <p>任务类型</p>
      <el-radio-group v-model="form.recordType" :disabled="isDisabled">
        <el-radio :label="1">单记录任务</el-radio>
        <el-radio :label="2">多记录任务</el-radio>
      </el-radio-group>
      <span class="validate-info" style="color: #FF8C00;bottom: -22px;"
            v-if="showValidate && form.recordType == ''">请选择任务类型</span>
    </section>
    <div class="foot">
      <el-button :disabled="isDisabled" type="primary" @click="submit" v-preventReClick>提交任务</el-button>
      <el-button class="cancel" @click="cancel">取消</el-button>
    </div>
    <assigment ref="assigment" :data.sync="userList" :selectedData="selectedData" @confirm="confirm"></assigment>
  </div>
</template>
<script>
import assigment from '@/views/task-repository/group/assigment.vue'
import {saveTask, getTasktpl,getTaskDetailById,updateTaskDetail} from '@/api/task-repository/index'
import {
  getAccountList
} from '@/api/user-manage/account'
// import {
//   getDeptListusers
// } from '@/api/user-manage/organization/index'
export default {
  components: {
    assigment
  },
  data() {
    return {
      visibleDialog: false,
      taskName: '',
      form: {
        taskName: '',
        taskTplId: '',
        recordType: '',
        startTime: '',
        endTime: '',
        users: [],
        description: ''
      },
      taskTplList: [],
      userList: [],
      showValidate: false,
      checkTaskName: false,
      /* start  */
      startTimeRule: {
        disabledDate: time => {
          if (this.form.endTime) {
            return (
              time.getTime() > new Date(this.form.endTime).getTime()
            );
          } else {
            return time.getTime() > Date.now();
          }
        },
        disabledDate: time => {
          if (this.form.endTime) {
            return (
              time.getTime() > new Date(this.form.endTime).getTime()
            );
          } else {
            return time.getTime() + 86400000 < Date.now();
          }
        }
      },
      endTimeRule: {
        disabledDate: time => {
          if (this.form.startTime) {
            return (
              time.getTime() < new Date(this.form.startTime).getTime()
            );
          } else {
            return time.getTime() + 86400000 < Date.now();
          }
        },
      },
      /* end*/
      isEdit: 0,
      taskId: '',
      isDisabled: false,
      selectedData: []
    }
  },
  created() {
    this.init()
    this.isEdit = Number(this.$route.query.isEdit);
    this.taskId = this.$route.query.id
    this.isDisabled = Boolean(this.$route.query.isDisabled)
    if(this.isEdit == 1 || this.isDisabled == true) {
      getTaskDetailById({id: this.$route.query.id}).then(res => {
        if(res.code == 0) {
          this.form = res.task
          if(this.form.users.length){
            for(var i=0;i< this.form.users.length;i++){
              this.selectedData.push(this.form.users[i].userId)
            }
          }
        }
      })
    }
  },
  mounted() {

  },
  computed: {
    validateTime() {
      return (new Date(this.form.endTime).getTime()) - (new Date(this.form.startTime).getTime()) > 0 ? false : true
    },
  },
  methods: {
    cancel() {
      this.$router.push('/task-repository/task-list')
    },
    submit() {
      if ( this.checkTaskName|| this.form.taskName == '' || this.form.recordType == '' ||
        this.form.taskTplId == '' || this.form.startTime == '' ||
        this.form.endTime == '' || this.form.users.length == 0 || ((new Date(this.form.endTime).getTime()) - (
          new Date(this.form.startTime).getTime()) > 0 ? false : true)) return this.showValidate = true;
      if(this.isEdit == 1){
        updateTaskDetail(this.form).then(res => {
          if (res.code == 0) {
            this.$message.success('更新成功')
            this.$router.push('/task-repository/task-list')
          } else {
            this.$message.warning(res.msg)
          }
        })
      }else{
        saveTask(this.form).then(res => {
          if (res.code == 0) {
            this.$message.success('保存成功')
            this.$router.push('/task-repository/task-list')
          } else {
            this.$message.warning(res.msg)
          }
        })
      }
    },
    confirm(val) {
      this.form.users = val
      // this.submit()
    },
    init() {
      getTasktpl().then(res => {
        if (res.code == 0) this.taskTplList = res.taskTplList
      })
      let params = {
        page: 1,
        limit: 1000,
        username: '',
        deptId: 1
      }
      getAccountList(params).then(res => {
        if (res.code == 0) this.userList = res.page.list;
        else return this.$message.warning(res.msg)
      })
      // getDeptListusers().then(res => {
      //   if (res.code == 0){
      //     this.userList = res.deptUsers;
      //   }
      //   else return this.$message.warning(res.msg)
      // })
    },
    openDialog() {
      this.$refs.assigment.open();
    },
    handleClose() {

    },

    // 校验字段显示名
    inputTaskName() {
      let regex = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$"); // 中文、英文、数字
      //判断输入框中有内容
      if (!regex.test(this.form.taskName.trim())) {
        this.checkTaskName = true;
      } else this.checkTaskName = false;
    },
  }
}
</script>
<style lang="scss">
#addTask {
  // .el-table__header-wrapper tr th:nth-last-child(2) {
  //   text-align: center !important;
  // }
  // .el-table__row {
  //   td:nth-last-child(1) {
  //     text-align: center !important;
  //   }
  // }
}
</style>
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

  .foot {
    margin-top: 60px;

    .el-button {
      width: 124px;
      height: 40px;
      font-size: 18px;
      background: #0079FE;
      border-radius: 6px;

      &.cancel {
        background-color: #F8FAFB;
        color: #9596AB;
      }
    }
  }

  section {
    position: relative;

    .validate-info {
      position: absolute;
      left: 0px;
      bottom: 9px;
      font-size: 12px;
    }

    p {
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
        padding: 1px 11px;
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
        margin-left: 130px;
      }
    }

    .el-select {
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

      >>>.el-input__icon {
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
        width: 175px;

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

  >>>.el-input__icon {
    line-height: 32px;
  }
}
</style>
