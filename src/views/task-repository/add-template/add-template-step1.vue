<template>
  <div id="step1">
    <p class="title">模版信息</p>
    <section>
      <p>模版名称</p>
      <el-input v-model="form.taskName" placeholder="请输入任务名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>模版说明</p>
      <el-input v-model="form.taskName" placeholder="请输入任务说明" maxlength="20" show-word-limit></el-input>
    </section>
    <section style="margin-bottom: 32px;">
      <p>表单字段（原生字段）</p>
      <div class="field">
        <div class="field-item" v-for="(item, index) in originalField" :key="index">
          <div class="field-sitem">
            <span>商品ID</span>
            <el-input v-model="form.taskName" placeholder="请输入商品ID"></el-input>
          </div>
          <div class="field-sitem">
            <span>是否必填ID</span>
            <el-radio-group v-model="form.radio">
                <el-radio :label="3">b必填</el-radio>
                <el-radio :label="6">非必填</el-radio>
            </el-radio-group>
          </div>
          <div class="field-sitem">
            <div style="height: 20px;"> </div>
            <div class="delete"><i class="el-icon-error"></i>删除</div>
          </div>
          <div class="field-sitem">
            <div style="height: 20px;"> </div>
            <div class="drag"><i class="el-icon-caret-top"></i><div class="line"></div><i class="el-icon-caret-bottom"></i></div>
          </div>
        </div>
        <div class="add-field" @click="addOriginfield()">+ 新增表单字段</div>
      </div>
    </section>
    <section>
      <p>监测字段（衍生字段）</p>
      <div class="field">
        <div class="field-item" v-for="(item, index) in extendField" :key="index">
          <div class="field-sitem">
            <span>字段显示名</span>
            <div class="name">直播间是否装扮</div>
          </div>
          <div class="field-sitem">
            <span>是否必填ID</span>
            <el-radio-group v-model="form.radio">
                <el-radio :label="3">b必填</el-radio>
                <el-radio :label="6">非必填</el-radio>
            </el-radio-group>
          </div>
          <div class="field-sitem">
            <div style="height: 20px;"> </div>
            <div class="delete"><i class="el-icon-error"></i>删除</div>
          </div>
          <div class="field-sitem">
            <div style="height: 20px;"> </div>
            <div class="drag"><i class="el-icon-caret-top"></i><div class="line"></div><i class="el-icon-caret-bottom"></i></div>
          </div>
        </div>
        <div class="add-field" @click="addField()">+ 新增表单字段</div>
      </div>
    </section>
    <div class="foot">
      <el-button>上一步</el-button>
      <el-button type="primary" @click="next()">下一步</el-button>
      <el-button class="cancel">取消</el-button>
    </div>
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
        originalField: Array(3),
        extendField: Array(4),
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

      },
      addOriginfield() {

      },
      addField() {

      },
      next() {
        this.$emit('next');
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #step1 {
    height: 100%;
    width: 100%;
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
        border-radius: 6px;
        font-size: 18px;
        &.el-button--primary {
          background: #0079FE;
        }
        &.cancel {
          background-color: #F8FAFB;
          color: #9596AB;
        }
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
      .field {
        background-color: #F5F5F5;
        width: 860px;
        padding: 5px 0px 40px 30px;
        .add-field {
          margin-top: 15px;
          color: #0079FE;
          font-size: 16px;
        }
        &-item {
          display: flex;
          align-items: center;
          color: #9596AB;
          font-size: 14px;
          border-bottom: 1px solid #FFFFFF;
          padding-top: 15px;
          .field-sitem {
            display: flex;
            flex-direction: column;
            &:nth-child(2) {
              margin-left: 40px;
            }
            &:nth-child(3) {
              margin-left: 256px;
            }
            &:nth-child(4) {
              margin-left: 32px;
            }
            .name {
              color:#34335B;
              height: 32px;
              line-height: 32px;
              width: 240px;
              margin-top: 8px;
              line-height: 32px;
              margin-bottom: 14px;
            }
            span {
              line-height: 20px;
              margin-top: 0px;
            }
            .el-input {
              width: 240px;
              height: 32px;
              border-radius: 4px;
              margin-top: 8px;
              margin-bottom: 14px;
              >>>.el-input__inner {
                font-size: 14px;
                padding-left: 8px;
                height: 32px;
                line-height: 32px;
              }
            }
            .el-radio-group {
              height: 32px;
              margin-bottom: 14px;
              margin-top: 8px;
              display: inline-flex;
              align-items: center;
            }
            .delete {
              height: 32px;
              margin-bottom: 14px;
              margin-top: 8px;
              display: inline-flex;
              align-items: center;
              color: #FD6B6D;
              cursor: pointer;
              i {
                font-size: 14px;
                margin-right: 8px;
              }
            }
            .drag {
              text-align: center;
              i {
                color: #9596AB;
                font-size: 18px;
                cursor: pointer;
              }
              .line {
                background-color: #9596AB;
                width: 20px;
                height: 2px;
              }
            }

          }
        }
      }
    }

  }
</style>
