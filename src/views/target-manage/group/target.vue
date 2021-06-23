<template>
  <div id="target">
    <section>
      <p>指标名称</p>
      <el-input :class="[showValidate && form.targetName == ''?'validate-empty':'',
      showValidate && form.targetName != '' && checkTargetName?'validate-error':'']"
       v-model="form.targetName" placeholder="请输入指标名称" @blur="inputTatgetName" maxlength="20" show-word-limit></el-input>
      <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.targetName == ''">请输入指标名称</span>
      <span class="validate-info" style="color: #C03639;"
        v-if="showValidate && form.targetName != '' && checkTargetName">请输入正确的字段显示名，支持中文、英文、数字</span>
    </section>
    <section>
      <p>指标说明</p>
      <el-input v-model="form.description" placeholder="请输入指标说明" maxlength="200" show-word-limit></el-input>
    </section>
    <section>
      <p>指标计算</p>
      <div style="display: flex;flex-wrap: wrap;">
        <el-select v-model="form.targetQuoteEndId" placeholder="请选择指标">
          <el-option v-for="(citem,cindex) in list" :key="cindex" :value="citem.id" :label="citem.targetName"></el-option>
        </el-select>
        <span class="validate-info1"  style="color: #FF8C00;" v-if="showValidate && form.targetQuoteEndId == ''">请选择指标</span>
        <div v-for="(item,index) in form.targesubs" :key="index" style="margin-left: 20px;" v-if="index == 0">
          <el-select v-model="item.logicAction" placeholder="运算选择">
            <el-option v-for="(citem,cindex) in $targetLogicAction" :key="cindex" :value="citem.value" :label="citem.label"></el-option>
          </el-select>
          <span class="validate-info1"  style="color: #FF8C00;left: 260px;" v-if="showValidate && form.targesubs[0].logicAction == ''">请选择运算方式</span>
          <el-select v-model="item.targetQuoteStartId" placeholder="请选择指标">
            <el-option v-for="(citem,cindex) in list" :key="cindex" :value="citem.id" :label="citem.targetName"></el-option>
          </el-select>
          <span class="validate-info1" style="color: #FF8C00;left: 524px;" v-if="showValidate && form.targesubs[0].targetQuoteStartId == ''">请选择指标</span>
          <a @click="addTarget()"class="add-list" v-if="form.targesubs.length == 1">+新增</a>
        </div>
      </div>
      <div>
        <div v-for="(item,index) in form.targesubs" :key="index" v-if="index > 0">
          <el-select v-model="item.logicAction" placeholder="运算选择">
            <el-option v-for="(citem,cindex) in $targetLogicAction" :key="cindex" :value="citem.value" :label="citem.label"></el-option>
          </el-select>
          <el-select v-model="item.targetQuoteStartId" placeholder="选择指标">
            <el-option v-for="(citem,cindex) in list" :key="cindex" :value="citem.value" :label="citem.targetName"></el-option>
          </el-select>
          <a @click="addTarget()"class="add-list" v-if="index == form.targesubs.length -1">+新增</a>
          <a class="del" v-if="form.targesubs.length>1"  @click="deleteItem()">X删除</a>
        </div>
      </div>
      <div>
        <el-select v-model="form.resultType" placeholder="选择展示方式">
          <el-option v-for="(citem,cindex) in $targetShowType" :key="cindex" :value="citem.value" :label="citem.label"></el-option>
        </el-select>
      </div>
    </section>
    <div class="foot">
      <el-button type="primary" @click="save">保存指标</el-button>
      <el-button class="cancel" @click="back">取消</el-button>
    </div>
  </div>
</template>
<script>
  import {saveTarge,getTargeList} from '@/api/target-manage/index.js'
  export default {
    name: 'target',
    data() {
      return {
        list: [{
          value: 1, label: '指標一'},
          {value: 2, label: '指標二'
        }],
        form: {
          targetName: '',
          targetQuoteEndId: '',
          targesubs: [
            {
              targetQuoteStartId: '',
              logicAction: ''
            }
          ]
        },
        showValidate: false,
        checkTargetName: false,
      }
    },
    created() {
      let params = {
        page: 1,
        limit: 10000
      }
      getTargeList(params).then(res=>{
        this.list = res.page.list
      })
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      addTarget(){
        if(this.form.targesubs.length >= 6) return this.$message.warning('最多只能新增5个！')
        this.form.targesubs.push({
          targetQuoteStartId: '',
          logicAction: ''
        })
      },
      deleteItem() {
        this.form.targesubs.splice(0,1)
      },
      save(){
        if (this.form.targetName == '' || this.form.targetQuoteEndId == '' || this.checkTargetName) return this.showValidate = true;
        let params = {};
        if(this.form.targesubs.length == 1) {
          this.form.targesubs = [{
            "logicAction": this.form.targesubs[0].logicAction,   //运算方式 1：加法，2：减法，3除，4乘， 5等于，6不等于，7包含， 8不包含， 9空判断，10非空判断
            "targetQuoteStartId": this.form.targesubs[0].targetQuoteStartId,   //第一个字段id
            "targetQuoteEndId": this.form.targetQuoteEndId   //第二个字段id
          }]
        }else if(this.form.targesubs.length == 2){
          this.form.targesubs = [{
            "logicAction": this.form.targesubs[0].logicAction,
            "targetQuoteStartId": this.form.targesubs[0].targetQuoteStartId,   //第一个字段id
            "targetQuoteEndId": this.form.targetQuoteEndId   //第二个字段id
          }, {
            "logicAction": this.form.targesubs[1].logicAction,
            "targetQuoteStartId": this.form.targesubs[1].targetQuoteStartId
          }]
        }
        params = {
          "targetName": this.form.targetName,
          "targesubs": this.form.targesubs, // 暂时不传，如果有限制就随便传一个
          "resultType": this.form.resultType,
          "description": this.form.description,
          "type": 2
        }
        if(this.id){  //编辑
          params.id = this.id
          //修改方法
        }else {  //新增
          saveTarge(params).then(res => {
            if (res.code == 0) {
              this.$message.success('新增成功！');
              this.back()
            } else {
              this.$message.warning(res.msg);
            }
          })
        }
      },
      // 校验字段显示名
      inputTatgetName() {
        let regex = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$"); // 中文、英文、数字
        //判断输入框中有内容
        if (!regex.test(this.form.targetName.trim())) {
          this.checkTargetName = true;
        }else this.checkTargetName = false;
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #target {
    .foot {
      margin-top: 60px;

      .el-button {
        width: 124px;
        height: 40px;
        background: #0079FE;
        border-radius: 6px;
        font-size: 18px;

        &.cancel {
          width: 160px;
          height: 40px;
          background: #F8FAFB;
          border-color: #F8FAFB;
          border-radius: 6px;
          color: #9596AB;
        }
      }
    }

    .item:nth-child(2n+1) {
      margin-left: 20px;
    }
    section {
      position: relative;
      font-size: 14px;
      .validate-info1 {
        position: absolute;
        left: 0px;
        top: 82px;
        font-size: 12px;
      }
      .validate-info {
        position: absolute;
        left: 0px;
        bottom: 9px;
        font-size: 12px;
      }
      .label {
        font-size: 12px;
        color: #FF8C00;
        display: block;
        margin-bottom: 32px;
        margin-top: 8px;
      }

      .add {
        font-size: 14px;
        font-weight: 500;
        color: #0079FE;
        line-height: 20px;
      }

      p {
        font-size: 20px;
        font-weight: 600;
        color: #34335B;
        line-height: 28px;
        margin-bottom: 20px;
      }
      .del {
        color: #FD6B6D;
        height: 32px;
        line-height: 32px;
        margin-left: 20px;
      }
      .add-list{
        font-size: 14px;
        color: #2A7ED1;
        height: 32px;
        line-height: 32px;
        background-color: #F8FAFB;
        border-radius: 4px;
        width: 82px;
        text-align: center;
        margin-left: 20px;
      }
      .el-select {
        width: 240px;
        height: 32px;
        border-radius: 4px;
        margin-bottom: 20px;
        margin-left: 20px;
        &:first-child {
          margin-left: 0px;
        }
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

        .el-input-group__prepend {
          background: #D9D9D9;
        }

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
