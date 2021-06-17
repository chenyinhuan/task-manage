<template>
  <div id="addRecord">
    <section class="hd">
      <p>新增任务/编辑任务</p>
    </section>
    <section class="container">
      <div class="content">
        <div class="content-item" v-for="(item,index) in taskRecordDetailBasicVOs" :key="index">
          <span class="tit">{{item.fieldName}}</span>
          <el-input placeholder="请输入" v-model="item.fieldValue"></el-input>
        </div>
      </div>
    </section>
    <div class="footer-btn">
      <el-button type="primary" @click="saveGood()">保存商品</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </div>
</template>
<script>
  import {
    getRecordListInputs,
    saveTaskRecord
  } from '@/api/task-center/my-task/index.js'
  export default {
    data() {
      return {
        form: {
          brandId: '',
          date: '',
          name: '',
          progress: '',
          shopName: '',
          isFeed: '',
          account: '',
          accountName: '',
          companyName: '',
          linkId: '',
          orderNo: '',
          orderCode: '',
          expressNo: '',
          taskFeed: '',
          receive: '',
          noReceive: '',
          imageUrl: '',
          fileList: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }, {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
        },
        taskRecords: '',
        taskId: '',
        taskRecordDetailBasicVOs: []

      }
    },
    created() {
      if(this.$route.query.id) this.taskId = this.$route.query.id;
      let params = {
        taskId: this.taskId
      }
      getRecordListInputs(params).then(res => {
        if (res.code == 0) {
          this.taskRecords = JSON.parse(JSON.stringify(res.taskRecords))
          this.taskRecordDetailBasicVOs = JSON.parse(JSON.stringify(res.taskRecords.taskRecordDetailBasicVOs))
        }
      })
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      saveGood() {
        let params = {
          taskRecordDetailBasicVOs: this.taskRecordDetailBasicVOs,
          taskRecordDetailComplexVOs: this.taskRecords.taskRecordDetailComplexVOs,
          taskTplId: this.taskRecords.taskTplId,
          taskId: this.taskId,
        }
        saveTaskRecord(params).then(res => {
          if(res.code == 0) this.$message.success('保存成功！');
          else this.$message.warning(res.msg);
        })
      },
      cancel() {
        this.$router.go(-1)
      },
      handleAvatarSuccess(res, file) {
        this.form.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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

          .tit {
            font-size: 12px;
            color: #666777;
            margin-bottom: 4px;
          }

          .el-input {
            >>>.el-input__inner {
              border: 0px;
              font-size: 14px;
              padding: 0px;
              color: #CDCDD5;
            }
          }

          .el-select {
            width: 105px;

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
