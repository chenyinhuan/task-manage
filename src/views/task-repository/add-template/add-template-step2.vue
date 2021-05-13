<template>
  <div id="step2">
    <p class="title">模版信息</p>
    <section class="hd">
      <div class="left">
        <div class="item" v-for="(item,index) in taskList" :class="[curIndex == index?'active':'']" @click="changeTab(index)">
          <span>{{item.name}}{{index+1}}</span>
        </div>
<!--        <div class="item-add" :class="[index == 1?'active':'']" @click="changeTab(1)"><span>衍生字段</span></div>-->
        <a class="add" type="text" @click="addTask">+新增</a>
      </div>
    </section>
    <section>
      <p>任务指标名称</p>
      <el-input class="input" v-model="form.taskName" placeholder="请输入任务指标名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>任务指标计算</p>
      <div class="type-select">
        <el-checkbox-group v-model="checkList" @change="bindCheckBox">
          <el-checkbox :label="1">逻辑判断后输出结果</el-checkbox>
          <el-checkbox :label="2">直接输出指标结果</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="content">
        <h3>逻辑判断</h3>
        <div class="container">
          <div class="right-cont square_brackets" v-for="(item,index) in allTermList" :key="index">
            <ul>
              <li>
                <label class="label">如果</label>
                <div>
                  <div v-for="(citem,cindex) in item.list" :key="cindex">
                    <el-select v-model="citem.targetId" placeholder="选择指标"></el-select>
                    <el-select v-model="citem.judgeId" placeholder="判断选择"></el-select>
                  </div>
                  <a @click="addTarget(index)" class="add-list">+新增</a>
                </div>
              </li>
              <li>
                <label class="label">输出</label>
                <div>
                  <el-select v-model="item.template" placeholder="选择指标"></el-select>
                  <el-checkbox-group v-model="checkList" @change="bindCheckBox">
                    <el-checkbox :label="1">不显示数值</el-checkbox>
                    <el-checkbox :label="2">显示百分数（两位小数)</el-checkbox>
                    <el-checkbox :label="3">显示数值（两位小数）</el-checkbox>
                  </el-checkbox-group>
                </div>
              </li>
            </ul>
          </div>
          <div class="add-term">
            <el-button type="text" @click="addList">+ 如果输出</el-button>
            <el-button type="text" @click="elseStatus = true">+ 否则输出</el-button>
          </div>
          <div class="else" v-if="elseStatus">
            <label class="label">否则</label>
            <div>
              <el-select v-model="template" placeholder="选择指标"></el-select>
              <el-checkbox-group v-model="checkList" @change="bindCheckBox">
                <el-checkbox :label="1">不显示数值</el-checkbox>
                <el-checkbox :label="2">显示百分数（两位小数)</el-checkbox>
                <el-checkbox :label="3">显示数值（两位小数）</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <p>任务指标考核结束时间</p>
      <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="请填写日期">
      </el-date-picker>
    </section>
    <div class="foot">
      <el-button type="primary">保存模版</el-button>
      <el-button class="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        elseStatus: false,
        template: '',
        checkList:[1],
        allTermList:[{
          list: [
            {
              targetId: '',
              judgeId: ''
            }
          ],
        }],
        taskList: [
          {name: '任务指标'}
        ],
        taskName: '',
        form: {
          taskName: '',
          date: ''
        },
        curIndex: 0,
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
      addList(){
        this.allTermList.push({
          list: [
            {
              targetId: '',
              judgeId: ''
            }
          ],
        })
      },
      addTarget(index){
        this.allTermList[index].list.push({
          targetId: '',
          judgeId: ''
        })
      },
      bindCheckBox(value){
        if(this.checkList.length > 1){
          this.checkList.splice(0,1)
        }
      },
      changeTab(index){
        this.curIndex = index
      },
      addTask(){
        this.taskList.push({
          name: '任务指标'
        })
      },
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

  #step2 {
    height: 100%;
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    .add-term{
      margin-top: 32px;
      .el-button{
        width: 86px;
        height: 24px;
        line-height: 24px;
        background: #FFFFFF;
        border-radius: 4px;
        padding: 0;
        font-size: 14px;
        color: #2A7ED1;
      }
    }
    .hd {
      font-size: 20px;
      line-height: 28px;
      color: #34335B;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: inline-flex;
        position: relative;
        margin-bottom: 32px;
        align-items: center;
        .add{
          display: inline-block;
          width: 53px;
          height: 24px;
          line-height: 24px;
          background: #F8FAFB;
          border-radius: 4px;
          font-size: 14px;
          color: #2A7ED1;
          text-align: center;
        }
        .item {
          cursor: pointer;
          position: relative;
          margin-right: 14px;
          font-size: 16px;
          color: #333333;
          &.active {
            color: #FF8C00;
            font-size: 20px;
            &::after {
              content: "";
              height: 3px;
              width: 12px;
              background-color: #FF8C00;
              position: absolute;
              bottom: -5px;
              left: 35px;
            }
          }
        }
      }
      .item-add {
        margin-left: 20px;
      }

    }
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
      .type-select{
        margin-bottom: 20px;
      }
      p{
        font-size: 20px;
        font-weight: 600;
        color: #34335B;
        line-height: 28px;
        margin-bottom: 20px;
      }
      .input {
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
      .content {
        background-color: #F5F5F5;
        width: 860px;
        padding: 20px 30px 40px 30px;
        margin-bottom: 32px;
        h3{
          font-size: 16px;
          color: #34335B;
          margin-bottom: 15px;
        }
        .square_brackets {
          border: none;
          position: relative;
          padding: 0;
        }
        .square_brackets:before{
          content: '';
          display: block;
          height: calc(100% - 40px);
          width: 20px;
          border: 1px solid #979797;
          position: absolute;
          top: 24px;
          left: 0;
          border-right: 0;
        }
        .else{
          display: flex;
          font-size: 14px;
          margin-top: 32px;
          &:first-child{
            margin-bottom: 68px;
            .el-select{
              margin: 10px 20px 5px 0;
            }
            .label{
              margin-top: 15px;
            }
          }
          .add-list{
            font-size: 14px;
            color: #2A7ED1;
          }
          .label{
            margin-right: 20px;
            color: #9596AB;
            margin-top: 10px;
            white-space: nowrap;
          }
          .el-select{
            margin-right: 20px;
            width: 160px;
          }
          div{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
          }
        }
        .right-cont{
          ul{
            li{
              display: flex;
              font-size: 14px;
              padding-left: 32px;
              &:first-child{
                margin-bottom: 68px;
                .el-select{
                  margin: 10px 20px 5px 0;
                }
                .label{
                  margin-top: 15px;
                }
              }
              .add-list{
                font-size: 14px;
                color: #2A7ED1;
              }
              .label{
                margin-right: 20px;
                color: #9596AB;
                margin-top: 10px;
                white-space: nowrap;
              }
              .el-select{
                margin-right: 20px;
                width: 160px;
              }
              div{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
              }
            }
          }
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
