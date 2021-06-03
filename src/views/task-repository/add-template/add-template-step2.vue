<template>
  <div id="step2">
    <p class="title">模版信息</p>
    <section class="hd">
      <div class="left">
        <div class="item" v-for="(item,index) in taskTplTargetVOs" :class="[curIndex == index?'active':'']" @click="changeTab(index)" :key="index">
          <span>任务指标{{index+1}}</span>
        </div>
        <a class="add" type="text" @click="addTask">+新增</a>
      </div>
    </section>
    <section v-for="(item, index) in taskTplTargetVOs" :key="index" v-if="curIndex == index">
      <section>
        <p><span class="red">* </span>任务指标名称</p>
        <el-input class="input" v-model="item.taskTplTargetEntity.targetName" placeholder="请输入任务指标名称" maxlength="20" show-word-limit></el-input>
      </section>
      <section>
        <p><span class="red">* </span>任务指标计算</p>
        <div class="type-select">
          <el-checkbox-group v-model="item.taskTplTargetEntity.targetResultShowType" @change="changeResShowType">
            <el-checkbox :label="1">逻辑判断后输出结果</el-checkbox>
            <el-checkbox :label="2">直接输出指标结果</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="content" v-if="item.taskTplTargetEntity.targetResultShowType[0] == 1">
          <h3>逻辑判断</h3>
          <div class="container">
            <div class="right-cont square_brackets" v-for="(citem,cindex) in item.taskTplTargeruleEntities"
              :key="cindex">
              <span style="position: absolute;color: #fd6b6d;right: 0px;font-size: 14px;cursor: pointer;margin-top: 4px;" @click="deleteRule(item.taskTplTargeruleEntities, cindex)" v-if="cindex != 0">X 删除</span>
              <!-- <ul v-for="(citem,cindex) in item" :key="cindex">
                <li>
                  <label class="label">如果</label>
                  <div>
                    <div >
                      <el-select v-model="citem.targetStartId" placeholder="选择指标"></el-select>
                      <el-select v-model="citem.logicAction" placeholder="判断选择"></el-select>
                      <el-select v-model="citem.targetEndId" placeholder="选择指标"></el-select>
                    </div>
                    <a @click="addTarget(cindex)" class="add-list">+新增</a>
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
              </ul> -->
              <ul>
                <li>
                  <label class="label">如果</label>
                  <div>
                    <div >
                      <el-select v-model="citem.targetStartId" placeholder="选择指标">
                        <el-option v-for="(titem, tindex) in targetList" :value="titem.targetName" :label="titem.targetName" :key="tindex"></el-option>
                      </el-select>
                      <el-select v-model="citem.logicAction" placeholder="判断选择">
                        <el-option v-for="(item, index) in logicAction" :label="item.label" :value="item.value" :key="index"></el-option>
                      </el-select>
                      <el-select v-model="citem.targetEndId" placeholder="选择指标">
                        <el-option v-for="(titem, tindex) in targetList" :value="titem.targetName" :label="titem.targetName" :key="tindex"></el-option>
                      </el-select>
                    </div>
                    <a @click="addTarget(cindex)" class="add-list">+新增</a>
                  </div>
                </li>
                <li>
                  <label class="label">输出</label>
                  <div>
                    <el-select v-model="item.taskTplTargereslutEntity.elseResult" placeholder="选择输出类型">
                      <el-option v-for="(eitem, eindex) in complateList" :label="eitem.label" :value="eitem.value" :key="eindex"></el-option>
                    </el-select>
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
              <el-button type="text" @click="addList(index)">+ 如果输出</el-button>
              <el-button type="text" @click="elseStatus = true">+ 否则输出</el-button>
            </div>
            <div class="else" v-if="elseStatus">
              <label class="label">否则</label>
              <div>
                <el-select v-model="item.taskTplTargereslutEntity.elseResult" placeholder="选择输出类型">
                  <el-option v-for="(eitem, eindex) in complateList" :label="eitem.label" :value="eitem.value" :key="eindex"></el-option>
                </el-select>
                <el-checkbox-group v-model="checkList" @change="bindCheckBox">
                  <el-checkbox :label="1">不显示数值</el-checkbox>
                  <el-checkbox :label="2">显示百分数（两位小数)</el-checkbox>
                  <el-checkbox :label="3">显示数值（两位小数）</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <div class="else-result"  v-if="item.taskTplTargetEntity.targetResultShowType[0] == 2">
          <p><span class="red">* </span>直接输出指标</p>
          <el-select v-model="item.targetId">
            <el-option v-for="(titem, tindex) in targetList" :value="titem.targetName" :label="titem.targetName" :key="tindex"></el-option>
          </el-select>
        </div>
      </section>
      <section class="end-time">
        <p>任务指标考核结束时间</p>
        <div class="date">
          <el-select v-model="item.taskTplTargetEntity.targetTestCycle" placeholder="选择考核结束时间">
            <el-option v-for="titem in targetTestTimeTypeList" :key="titem.value" :label="titem.label" :value="titem.value">
            </el-option>
          </el-select>
          <div style="margin-left: 20px;" v-if="item.taskTplTargetEntity.targetTestCycle == 1">
            <el-input-number controls-position="right" v-model="item.taskTplTargetEntity.targetTestTimeHour" placeholder="任务开始后小时数" type="number" :max="24" :min="1"></el-input-number controls-position="right"><span style="margin: 0px 10px;">时</span>
            <el-input-number controls-position="right" v-model="item.taskTplTargetEntity.targetTestTimeMinute" type="number" :max="59" :min="0"></el-input-number controls-position="right"><span style="margin: 0px 10px;">分</span><span>结束考核</span>
          </div>
          <el-date-picker type="datetime" v-if="item.taskTplTargetEntity.targetTestCycle == 2" v-model="item.taskTplTargetEntity.targetTestDate" placeholder="请选择日期和时间">
          </el-date-picker>
          <div v-if="item.taskTplTargetEntity.targetTestCycle == 3">
            <el-select placeholder="选择周期"></el-select>
          </div>
        </div>
      </section>
    </section>
    <div class="foot">
      <el-button>上一步</el-button>
      <el-button type="primary">保存模版</el-button>
      <el-button class="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  import {getTargeList} from '@/api/target-manage/index.js'
  export default {
    props: {
      taskTplId: {
        type: [Number, String],
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        elseStatus: false,
        template: '',
        checkList: [1],
        targetTestTimeTypeList: this.$targetTestTimeTypeList,
        targetTestCycleList: this.$targetTestCycleList,
        logicAction: this.$logicAction,
        logicTypeList: [{value: 1,label: '且'},{value: 2, label: '或'}],
        taskTplTargetVOs: [{
          "taskTplTargereslutEntity": { //结果显示逻辑对象
            "color": "", //颜色
            "defineValue": "", //自定义值
            "elseResult": '', //1:完成， 2未完成， 3自定义
            "elseResultShow": '', //0：不显示 1：显示
            "elseResultShowType": '', //1：显示百分比 2：显示数值（小数2位）
            "ifResult": '', //1:完成， 2未完成， 3自定义
            "ifResultShow": '', //是否显示  0：不显示 1：显示
            "ifResultShowType": '', //1：显示百分比 2：显示数值（小数2位）
          },
          "taskTplTargeruleEntities": [ //规则列表
            {
              "logicAction": '', //状态  1：<, 2:<=, 3:>, 4:>=，5:= 6:!=
              "logicType": '', //状态  1：且运算 2：或运算
              targetStartId: '',
              "targetEndId": '', //指标id
            }
          ],
          "taskTplTargetEntity": {
            targetId: '', // 指标id
            "targetName": "",
            "targetResultShowType": [1], //状态  1：判断后输出 2：直接输出
            "targetTestCycle": '', //1:每日考核， 2每周考核，3每月考核
            "targetTestDate": "", //俱体日期
            "targetTestTimeHour": '', //1-24小时
            "targetTestTimeMinute": '', //0-59
            "targetTestTimeType": '', //考核时间类型：1：任务派发后固定时间 2：指定日期，3：周期性任务
          }
        }],
        curIndex: 0,
        addDialog: false,
        curIndex: 0,
        targetList: [],
        complateList: [{label: '完成',value: 1},{label: '未完成',value: 2},{label: '自定义', value: 3}]
      }
    },
    created() {
      getTargeList({page: 1, limit: 100000}).then(res => {
        if(res.code != 0) return;
        this.targetList = res.page.list;
      })
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      addList() {
        this.taskTplTargetVOs[this.curIndex].taskTplTargeruleEntities.push({
          "logicAction": '', //状态  1：<, 2:<=, 3:>, 4:>=，5:= 6:!=
          "logicType": '', //状态  1：且运算 2：或运算
          "targetEndId": '', //指标id
          "targetStartId": '', //指标id
        })
      },
      addTarget(index) {
        this.taskTplTargetVOs[this.curIndex].taskTplTargeruleEntities[index].push({
          "logicType": '', //状态  1：且运算 2：或运算
          "targetEndId": '',
          "targetStartId": '',
          "logicAction": '',
        })
      },
      changeResShowType(value) {
        if (this.taskTplTargetVOs[this.curIndex].taskTplTargetEntity.targetResultShowType.length > 1) {
          this.taskTplTargetVOs[this.curIndex].taskTplTargetEntity.targetResultShowType.splice(0, 1)
        }
        if(this.targetList.length == 0) {
          getTargeList({page: 1, limit: 100000}).then(res => {
            if(res.code != 0) return;
            this.targetList = res.page.list;
          })
        }
      },
      bindCheckBox(value) {
        if (this.checkList.length > 1) {
          this.checkList.splice(0, 1)
        }
      },
      changeTab(index) {
        this.curIndex = index
      },
      addTask() {
        this.taskTplTargetVOs.push({
          "taskTplTargereslutEntity": { //结果显示逻辑对象
            "color": "string", //颜色
            "defineValue": "string", //自定义值
            "elseResult": '', //1:完成， 2未完成， 3自定义
            "elseResultShow": '', //0：不显示 1：显示
            "elseResultShowType": '', //1：显示百分比 2：显示数值（小数2位）
            "ifResult": '', //1:完成， 2未完成， 3自定义
            "ifResultShow": '', //是否显示  0：不显示 1：显示
            "ifResultShowType": '', //1：显示百分比 2：显示数值（小数2位）
          },
          "taskTplTargeruleEntities": [ //规则列表
            {
              "logicAction": '', //状态  1：<, 2:<=, 3:>, 4:>=，5:= 6:!=
              "logicType": '', //状态  1：且运算 2：或运算
              "targetEndId": '', //指标id
              "targetStartId": '', //指标id
            }
          ],
          "taskTplTargetEntity": {
            "targetId": '', //指标id
            "targetName": "string", //任务名称
            "targetResultShowType": [1], //状态  1：判断后输出 2：直接输出
            "targetTestCycle": '', //1:每日考核， 2每周考核，3每月考核
            "targetTestDate": "", //俱体日期
            "targetTestTimeHour": '', //1-24小时
            "targetTestTimeMinute": '', //0-59
            "targetTestTimeType": '', //考核时间类型：1：任务派发后固定时间 2：指定日期，3：周期性任务
          }
        })
      },
      openDialog() {
        this.addDialog = true;
      },
      handleClose() {

      },
      deleteRule(data, index) {
        this.$confirm('确定删除吗？', '提示', {
        	confirmButtonText: '确定',
        	cancelButtonText: '取消',
        	type: 'warning'
        }).then(() => {
        	data.splice(index, 1);
        })
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

    .add-term {
      margin-top: 32px;

      .el-button {
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

        .add {
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

    .foot {
      margin-top: 60px;

      .el-button {
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

    section {
      .type-select {
        margin-bottom: 20px;
      }
      .else-result {
        margin-bottom: 32px;
      }
      p {
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

        h3 {
          font-size: 16px;
          color: #34335B;
          margin-bottom: 15px;
        }

        .square_brackets {
          border: none;
          position: relative;
          padding: 0;
        }

        .square_brackets:before {
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
        .container {
          position: relative;
        }
        .else {
          display: flex;
          font-size: 14px;
          margin-top: 20px;
          padding-top: 32px;
          &::before {
            position: absolute;
            background-color: #FFFFFF;
            height: 1px;
            content: '';
            width: calc(100% + 60px);
            left: -30px;
            bottom: 66px;
          }
          &:first-child {
            margin-bottom: 68px;

            .el-select {
              margin: 10px 20px 5px 0;
            }

            .label {
              margin-top: 15px;
            }
          }

          .add-list {
            font-size: 14px;
            color: #2A7ED1;
          }

          .label {
            margin-right: 20px;
            color: #9596AB;
            margin-top: 6px;
            white-space: nowrap;
          }

          .el-select {
            margin-right: 20px;
            width: 160px;
          }

          div {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
          }
        }

        .right-cont {
          &:not(:first-child) {
            margin-top: 15px;
            ul {
              &::before {
                position: absolute;
                width: calc(100% + 60px);
                height: 1px;
                background-color: #FFFFFF;
                content: '';
                left: -30px;
              }
            }
          }
          ul {
            li {
              display: flex;
              font-size: 14px;
              padding-left: 32px;

              &:first-child {
                margin-bottom: 68px;

                .el-select {
                  margin: 10px 20px 5px 0;
                }

                .label {
                  margin-top: 15px;
                }
              }

              .add-list {
                font-size: 14px;
                color: #2A7ED1;
              }

              .label {
                margin-right: 20px;
                color: #9596AB;
                margin-top: 10px;
                white-space: nowrap;
              }

              .el-select {
                margin-right: 20px;
                width: 160px;
              }

              div {
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
    .red {
      color: #fd6b6d;
    }
    .el-select {
      >>>.el-input__inner {
        height: 32px;
         line-height: 32px;
      }
    }
    .end-time {
      .date {
        display: flex;
        align-items: center;
        .el-select {
          width: 160px;
        }
        .el-date-editor {
          width: 190px;
          margin-left: 20px;
        }
      }
      .el-input {
        width: 140px;
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
