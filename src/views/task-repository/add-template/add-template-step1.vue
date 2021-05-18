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
        <draggable v-model="originalField"  chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
          <transition-group>
            <div class="field-item" v-for="(item, index) in originalField" :key="index">
              <div class="field-sitem">
                <span>商品ID{{item.id}}</span>
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
                <div class="drag"><i class="el-icon-caret-top" v-if="index != 0" @click="sort(index, index + 1)"></i><i class="el-icon-caret-bottom" @click="sort(index, index - 1)" v-if="index != originalField.length -1"></i></div>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="add-field" @click="addField(1)">+ 新增表单字段</div>
      </div>
    </section>
    <section>
      <p>监测字段（衍生字段）</p>
      <div class="field">
        <draggable v-model="extendField"  chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
          <transition-group>
            <div class="field-item" v-for="(item, index) in extendField" :key="index">
              <div class="field-sitem">
                <span>字段显示名</span>
                <div class="name">直播间是否装扮{{item.id}}</div>
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
                <div class="drag"><i class="el-icon-caret-top" v-if="index != 0" @click="sortExtend(index, index + 1)"></i><i class="el-icon-caret-bottom" @click="sortExtend(index, index - 1)" v-if="index != extendField.length - 1"></i></div>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="add-field" @click="addField(2)">+ 新增检测字段</div>
      </div>
    </section>
    <div class="foot">
      <el-button>上一步</el-button>
      <el-button type="primary" @click="next()">下一步</el-button>
      <el-button class="cancel">取消</el-button>
    </div>
    <el-dialog
      :title="`选择${type==1?'表单':'检测'}字段（${type==1?'原生字段':'衍生字段'}）`"
      :visible.sync="dialogVisible"
      width="782px"
      :before-close="handleClose">
      <div class="dialog-content">
        <el-input v-model="keyword" placeholder="任务名称" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0 && type==1">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for="(item,index) in tableColumn"
            :key="index">
            <template slot-scope="scope">
              <div>{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0 && type==2">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for="(item,index) in tableColumn1"
            :key="index">
            <template slot-scope="scope">
              <div>{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  export default {
    components: {
      draggable,
    },
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
        originalField: [
          {id:1},{id:2}
        ],
        extendField: [{id:1},{id:2},{id:3}],
        addDialog: false,
        type: '',
        dialogVisible: false,
        keyword: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumn: [ // 表格列数据
          {
            label: '字段显示名',
            prop: 'strengthName',
          },
          {
            label: '数据类型',
            prop: 'specName',
          },
          {
            label: '表单类型',
            prop: 'explain',
          },
          {
            label: '字段描述',
            prop: 'toothTypeName',
          }
        ],
        tableColumn1: [ // 表格列数据
          {
            label: '字段显示名',
            prop: 'strengthName',
          },
          {
            label: '数据类型',
            prop: 'specName',
          },
          {
            label: '字段描述',
            prop: 'toothTypeName',
          }
        ],
        drag: false
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
      //开始拖拽事件
      onStart(){
        this.drag=true;
      },
      //拖拽结束事件
      onEnd() {
        this.drag=false;
      },
      openDialog() {
        this.addDialog = true;
      },
      handleClose() {
        this.dialogVisible = false
      },
      addField(val) {
        this.type = val;
        this.dialogVisible = true;
      },
      next() {
        this.$emit('next');
      },
      search() {

      },
      sort(index, refIndex) {
        let list = this.originalField;
        [list[index], list[refIndex]] = [list[refIndex], list[index]];
        this.originalField = JSON.parse(JSON.stringify(list));
        console.log(this.originalField)
      },
      sortExtend(index, refIndex) {
        let list = this.extendField;
        [list[index], list[refIndex]] = [list[refIndex], list[index]];
        this.extendField = JSON.parse(JSON.stringify(list));
      },
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
          cursor: pointer;
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
              display: flex;
              flex-direction: column;
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
    .dialog-content {
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
</style>
