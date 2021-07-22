<template>
  <div id="addRecord">
    <section class="hd">
      <p>{{isEdit==1?'编辑任务':'新增任务'}}</p>
    </section>
    <section class="container">
      <div class="content">
        <div class="content-item" v-for="(item, index) in taskRecordDetailBasicVOs" :key="index"
          @click="checkItem(item)">
          <span class="tit"><span style="color: #C03639;"
              v-if="item.fieldInputType == 1">*</span>{{item.fieldName}}</span>
          <el-input placeholder="请输入" v-model="item.fieldValue" v-if="item.formType == 1 && item.dataType == 1">
          </el-input>
          <el-input-number placeholder="请输入" :controls="false" v-model="item.fieldValue"
            v-if="item.formType == 1 && (item.dataType == 3 || item.dataType == 2)"></el-input-number>
          <el-date-picker v-if="item.formType == 1 && item.dataType == 4" value-format="yyyy-MM-dd" v-model="item.fieldValue" type="date"
            placeholder="请填写日期">
          </el-date-picker>
          <el-time-picker v-if="item.formType == 1 && item.dataType == 5" v-model="item.fieldValue"
            placeholder="请填写时间">
          </el-time-picker>
          <el-select placeholder="请输入" v-model="item.fieldValue" v-if="item.formType == 2 || item.formType == 3"
            :multiple="item.formType == 2?false:true">
            <el-option v-for="citem in item.enums" :key="citem.id" :label="citem.enumValue" :value="citem.id">
            </el-option>
          </el-select>
          <div v-if=" item.formType == 4" style="display: flex;align-items: center;">
            <div @click="preview(item)" v-if="item.fieldValue" class="upload-img">
              <img style="max-height: 34px;max-width: 34px;cursor: pointer;" :src="item.fieldValue" />
            </div>
            <el-upload
            accept=".jpg,.png,.jpeg"
            :style="{'margin-left':item.fieldValue?'24px':''}"
            class="upload-demo"
            drag :action="uploadUrl"
              :show-file-list="false" :with-credentials="true" :on-success="successUpload"
              :before-upload="beforeUpload">
              <img class="img" src="@/images/my-task/upload.png">
              <span>上传图片</span>
            </el-upload>
          </div>
          <span class="validate-info" style="color: #FF8C00;"
            v-if="showValidate && item.fieldInputType == 1 && item.fieldValue == ''">
            {{item.formType == 1? `请输入${item.fieldName}`:''}}
            {{item.formType == 2 || item.formType == 3? `请选择${item.fieldName}`:''}}
            {{item.formType == 4? `请上传${item.fieldName}`:''}}
          </span>
        </div>
      </div>
    </section>
    <div class="footer-btn">
      <el-button type="primary" @click="saveGood()" v-preventReClick>保存商品</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
    <el-dialog width="900px" :visible="dialogVisible" @close="dialogVisible = false">
      <img style="max-width: 800px;max-height: 800px;" :src="url">
      <div style="height: 24px;"></div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getRecordListInputs,
    saveTaskRecord,
    getTaskRecord,
    updateTaskRecord
  } from '@/api/task-center/my-task/record.js'
  export default {
    data() {
      return {
        taskRecords: '',
        taskId: '',
        taskRecordDetailBasicVOs: [],
        uploadUrl: `${window.$globalConfig.API_BASE_Tabel}/task-admin/sys/oss/upload`,
        uploadItem: '',
        dialogVisible: false,
        url: '',
        showValidate: false,
        isEdit: 0,
        id: '',
        date: '',
				userId: localStorage.getItem('recordUserId')
      }
    },
    created() {
      this.showValidate = false;
      if (this.$route.query.taskId) this.taskId = this.$route.query.taskId;
      if (this.$route.query.id) {
        this.isEdit = 1;
        this.id = this.$route.query.id;
      }
      if(this.$route.query.date) this.date = this.$route.query.date;
      if (this.isEdit == 1) { // 编辑
        let params = {
          id: this.id
        }
        getTaskRecord(params).then(res => {
          this.taskRecords = res.taskRecordVO
          this.taskRecordDetailBasicVOs = res.taskRecordVO.taskRecordDetailBasicVOs
        })
      } else { // 新增
        let params = {
          taskId: this.taskId
        }
        getRecordListInputs(params).then(res => {
          if (res.code == 0) {
            this.taskRecords = JSON.parse(JSON.stringify(res.taskRecords))
            this.taskRecordDetailBasicVOs = JSON.parse(JSON.stringify(res.taskRecords
              .taskRecordDetailBasicVOs))
          }
        })
      }

    },
    mounted() {

    },

    methods: {
      saveGood() {
        if (this.taskId == '') return this.$message.warning('任务id不能为空！')
        let flag = false;
        for (let i = 0; i < this.taskRecordDetailBasicVOs.length; i++) {
          let item = this.taskRecordDetailBasicVOs[i];
          if (item.fieldInputType == 1 && item.fieldValue == '') flag = true;
        }
        if (flag) return this.showValidate = true;
        let taskRecordDetailBasicVOs = JSON.parse(JSON.stringify(this.taskRecordDetailBasicVOs));
        if (taskRecordDetailBasicVOs.length > 0) {
          taskRecordDetailBasicVOs.forEach(item => {
            if (item.formType == 3) {
              item.fieldValue = item.fieldValue.join('@#')
            }
            if (item.dataType == 2 || item.dataType == 3) {
              item.fieldValue = Number(item.fieldValue);
            }
          })
        }
        let params = {
          taskRecordDetailBasicVOs: taskRecordDetailBasicVOs,
          taskRecordDetailComplexVOs: this.taskRecords.taskRecordDetailComplexVOs,
          taskTplId: this.taskRecords.taskTplId,
          taskId: this.taskId,
		  userId: this.userId
        }
        if(this.isEdit == 1) {
          params.id = this.id;
          updateTaskRecord(params).then(res => {
            if (res.code == 0) {
              this.$message.success('修改成功！');
              if (this.$route.path.indexOf('/my-assignment/') != -1) {
                this.$router.push(`/task-center/my-assignment/task-dtl-list?id=${this.taskId}`)
              }else this.$router.push(`/task-center/task-dtl-list?id=${this.taskId}&date=${this.date}`)
            } else this.$message.warning(res.msg);
          })
        }else {
          saveTaskRecord(params).then(res => {
            if (res.code == 0) {
              this.$message.success('保存成功！');
              if (this.$route.path.indexOf('/my-assignment/') != -1) {
                this.$router.push(`/task-center/my-assignment/task-dtl-list?id=${this.taskId}`)
              }else this.$router.push(`/task-center/task-dtl-list?id=${this.taskId}&date=${this.date}`)
            } else this.$message.warning(res.msg);
          })
        }
      },
      cancel() {
        if (this.$route.path.indexOf('/my-assignment/') != -1) {
          this.$router.push(`/task-center/my-assignment/task-dtl-list?id=${this.taskId}`)
        }else this.$router.push(`/task-center/task-dtl-list?id=${this.taskId}&date=${this.date}`)
      },
      //上传
      successUpload(response, file, fileList) {
        if (response.code == 0) this.uploadItem.fieldValue = response.url;
        console.log(this.taskRecordDetailBasicVOs)
      },
      beforeUpload(file) {
        const isCheck = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isCheck) {
          this.$message.warning('上传图片只能是 JPG 格式、PNG 格式!');
        }
        if (!isLt10M) {
          this.$message.warning('上传图片大小不能超过 10MB!');
        }
        return isCheck && isLt10M;
      },
      checkItem(item) {
        this.uploadItem = item;
      },
      preview(item) {
        this.url = item.fieldValue;
        this.dialogVisible = true;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addRecord {
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
    }

    .container {
      .content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 40px;
        padding-right: 200px;

        .content-item {
          display: inline-flex;
          flex-direction: column;
          margin-bottom: 30px;
          width: 270px;
          text-align: left;
          position: relative;

          .validate-info {
            position: absolute;
            left: 0px;
            bottom: -18px;
            font-size: 12px;
          }

          .tit {
            font-size: 12px;
            line-height: 17px;
            color: #666777;
            margin-bottom: 4px;
          }
          >>>.el-input__suffix {
            right: unset;
            left: 100px;
          }
          .el-input,
          .el-input-number {
            >>>.el-input__inner {
              border: 0px;
              font-size: 14px;
              padding: 0px;
              color: #323232;
              text-align: left;
            }
          }

          .el-select {
            width: 130px;

            >>>.el-input__inner {
              border: 0px;
              padding: 0px;
              font-size: 14px;
            }
          }

          .img {
            width: 10px;
            height: 10px;
          }

          .el-date-editor {
            position: relative;

            >>>.el-input__prefix {
              left: 0px;
              right: 50px;
              color: #CDCDD5;
            }
          }

          >>>.el-upload-dragger {
            width: 115px;
            height: 30px;
            line-height: 27px;
            border-radius: 4px;
            font-size: 12px;

            span {
              margin-left: 4px;
            }
          }
        }
      }

      .upload-img {
        width: 36px;
        height: 36px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }

    .footer-btn {
      .el-button {
        width: 160px;
        font-size: 18px;

        &.el-button--primary {
          background-color: #0079FE;
        }

        &.el-button--default {
          background-color: #F8FAFB;
          color: #9596AB;
          border-color: #F8FAFB;
        }
      }
    }
  }
</style>
