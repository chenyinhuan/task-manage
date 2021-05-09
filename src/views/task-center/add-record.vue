<template>
  <div id="addRecord">
    <section class="hd">
      <p>新增任务/编辑任务</p>
    </section>
    <section class="container">
      <div class="content">
        <div class="content-item">
          <span class="tit">商品ID</span>
          <el-input placeholder="请输入" v-model="form.brandId"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">直播日期</span>
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="请填写日期">
          </el-date-picker>
        </div>
        <div class="content-item">
          <span class="tit">店铺</span>
          <el-input placeholder="请填写店铺" v-model="form.shopName"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">主播</span>
          <el-select placeholder="请选择主播" v-model="form.name"></el-select>
        </div>
        <div class="content-item">
          <span class="tit">是否付费</span>
          <el-input placeholder="请填写是否付费" v-model="form.isFeed"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">付款账户</span>
          <el-input placeholder="请填写" v-model="form.account"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">付款名</span>
          <el-input placeholder="请填写付款名" v-model="form.accountName"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">开票公司</span>
          <el-input placeholder="请填写开票公司" v-model="form.companyName"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">链接ID</span>
          <el-input placeholder="请填写链接ID" v-model="form.linkId"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">合同进度</span>
          <el-select placeholder="请选择进度" v-model="form.progress"></el-select>
        </div>
        <div class="content-item">
          <span class="tit">合同单号</span>
          <el-input placeholder="请填写合同单号" v-model="form.orderNo"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">合同编号</span>
          <el-input placeholder="请填写合同编号" v-model="form.orderCode"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">快递单号</span>
          <el-input placeholder="请填写快递单号" v-model="form.expressNo"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">任务费用</span>
          <el-input placeholder="请填写任务费用" v-model="form.taskFeed"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">已收佣金</span>
          <el-input placeholder="请填写已收佣金" v-model="form.receive"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">需补佣金</span>
          <el-input placeholder="请填写需补佣金" v-model="form.noReceive"></el-input>
        </div>
        <div class="content-item">
          <span class="tit">已补佣金截图</span>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img class="img" src="@/images/my-task/upload.png">
            <span>上传文件</span>
          </el-upload>
        </div>
        <div class="content-item">
          <span class="tit">佣金备注</span>
          <el-input placeholder="请填写备注" v-model="form.brandId"></el-input>
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
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }

      }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
      saveGood() {

      },
      cancel() {

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
  @import '@/styles/var.scss';

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
