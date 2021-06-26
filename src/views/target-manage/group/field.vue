<template>
  <div id="field">
    <section>
      <p>指标名称</p>
      <el-input :class="[showValidate && form.targetName == ''?'validate-empty':'',
      showValidate && form.targetName != '' && checkTargetName?'validate-error':'']" v-model="form.targetName"
        placeholder="请输入指标名称" @blur="inputTatgetName" maxlength="20" show-word-limit></el-input>
      <span class="validate-info" style="color: #FF8C00;" v-if="showValidate && form.targetName == ''">请输入指标名称</span>
      <span class="validate-info" style="color: #C03639;"
        v-if="showValidate && form.targetName != '' && checkTargetName">请输入正确的字段显示名，支持中文、英文、数字</span>
    </section>
    <section>
      <p>指标说明</p>
      <el-input v-model="form.description" placeholder="请输入指标说明" maxlength="200" show-word-limit></el-input>
    </section>
    <section>
      <p>聚合函数</p>
      <el-select v-model="form.targeFieldVO.logicAction" placeholder="请选择" @change="changeLogic()">
        <el-option v-for="item in aggregateFun" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </section>
    <section>
      <p>选择字段</p>
      <el-select v-model="form.targeFieldVO.fieldId" filterable placeholder="请选择字段名称" @change="changeField()">
        <el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName" :value="item.id"></el-option>
      </el-select>
      <span class="validate-info" style="color: #FF8C00;"
        v-if="showValidate && form.targeFieldVO.fieldId == ''">请选择字段名称</span>
      <el-select v-if="form.targeFieldVO.logicAction == 5" style="margin-left: 15px;"
        v-model="form.targeFieldVO.chooseType" placeholder="字段内容选择">
        <el-option v-for="item in
        nativeList.length>0 && form.targeFieldVO.fieldId && (nativeList.find(n => n.id == form.targeFieldVO.fieldId).formType == 2
        || nativeList.find(n => n.id == form.targeFieldVO.fieldId).formType == 3
        )?fieldSelectContent:fieldContent" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <!-- 选择类 & 按选择项 -->
      <el-select :multiple="nativeList.find(n => n.id == form.targeFieldVO.fieldId).formType == 2?false:true"
        v-if="form.targeFieldVO.logicAction == 5
      && form.targeFieldVO.chooseType == 4
      && nativeList.length>0
      && nativeList.find(n => n.id == form.targeFieldVO.fieldId)
      && (nativeList.find(n => n.id == form.targeFieldVO.fieldId).formType == 2 || nativeList.find(n => n.id == form.targeFieldVO.fieldId).formType == 3)" style="margin-left: 15px;"
        v-model="form.targeFieldVO.fieldEnumIds" filterable placeholder="请选择">
        <el-option v-for="(item,index) in fieldEnumList" :key="index" :label="item.enumValue" :value="item.id">
        </el-option>
      </el-select>
      <!-- 非选择类  & 自定义-->
      <span style="margin-left: 11px;"
        v-if="form.targeFieldVO.logicAction == 5 && form.targeFieldVO.chooseType == 4 && nativeList.length>0 && nativeList.find(n => n.id == form.targeFieldVO.fieldId) && !(nativeList.find(n => n.id == form.targeFieldVO.fieldId).formType == 2 || nativeList.find(n => n.id == form.targeFieldVO.fieldId).formType == 3)">
        <span>=</span>
        <el-input style="margin-left: 11px;width: 240px;" v-model="form.targeFieldVO.countFieldTargeValue"
          placeholder="请输入计数字段内容"></el-input>
      </span>
    </section>
    <div class="foot">
      <el-button type="primary" @click="save">保存指标</el-button>
      <el-button class="cancel" @click="back">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {
    saveTarge,
    getTargeDetail,
    updateTarget
  } from '@/api/target-manage/index.js'
  import {
    getNativeList,
    getNativeEnums
  } from '@/api/filed-manage/index.js'
  export default {
    name: "field",
    props: {
      targetId: {
        type: [Number, String],
        default: ''
      },
      type: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        form: {
          "targetName": "", //指标名称
          "description": "", //指标描述
          "type": 1, //类型1：字段指标， 2指标类指标
          "targeFieldVO": {
            "logicAction": 1, //聚合类型： 1：求和  2：平均, 3：最大数, 4：最小数, 5：计数
            "fieldId": '', //字段id
            countFieldTargeValue: '',
            fieldEnumIds: []
          }
        },
        nativeList: [],
        aggregateFun: this.$aggregateFun,
        fieldContent: this.$fieldContent,
        fieldSelectContent: this.$fieldSelectContent,
        fieldEnumList: [],
        showValidate: false,
        checkTargetName: false
      }
    },
    created() {
      if (this.targetId && this.type == 1) {
        this.getDetail();
      }
      this.changeLogic();
    },
    methods: {
      back() {
        this.$router.push('/target-manage')
      },
      getDetail() {
        getTargeDetail({
          id: this.targetId
        }).then(res => {
          if(res.code == 0) {
            this.form.targetName = res.target.targetName;
            this.form.description = res.target.description;
            this.form.targeFieldVO.logicAction = res.target.targeFieldVO.logicAction;
            this.form.targeFieldVO.fieldId = res.target.targeFieldVO.fieldId;
            this.form.targeFieldVO.countFieldTargeValue = res.target.targeFieldVO.countFieldTargeValue;
            this.form.targeFieldVO.fieldEnumIds = res.target.targeFieldVO.fieldEnumIds;
            this.form.targeFieldVO.chooseType = res.target.targeFieldVO.chooseType;
          }
        })
      },
      save() {
        if (this.form.targetName == '' || this.form.targeFieldVO.logicAction == '' || this.form.targeFieldVO.fieldId ==
          '' || this.checkTargetName) return this.showValidate = true;
        let params = JSON.parse(JSON.stringify(this.form));
        params.targeFieldVO.fieldEnumIds = params.targeFieldVO.fieldEnumIds && params.targeFieldVO.fieldEnumIds.length>0? params.targeFieldVO.fieldEnumIds.join(','):'';
        if(this.targetId) {
          params.id = this.targetId;
          updateTarget(params).then(res => {
            if (res.code == 0) {
              this.$message.success('更新成功！');
              this.$router.push('/target-manage')
            }
          })
        }else {
          saveTarge(params).then(res => {
            if (res.code == 0) {
              this.$message.success('保存成功！');
              this.$router.push('/target-manage')
            }
          })
        }
      },
      changeLogic() {
        let params = {
          "dataTypes": [], //数据类型，为空时取全部
          "formTypes": [], //表单类型，为空时取全部
          "type": '' //字段类型1：原生2衍生，为空时取全部
        }
        console.log(this.form.targeFieldVO.logicAction != 5)
        if (this.form.targeFieldVO.logicAction != 5) {
          params.dataTypes = [2, 3]
        }
        getNativeList(params).then(res => {
          if (res.code == 0) {
            this.nativeList = res.fields;
          }
        })
      },
      changeField() {
        if (this.nativeList.find(n => n.id == this.form.targeFieldVO.fieldId).formType == 2 || this.nativeList.find(n =>
            n.id == this.form.targeFieldVO.fieldId).formType == 3) {
          getNativeEnums({
            id: this.form.targeFieldVO.fieldId
          }).then(res => {
            this.fieldEnumList = res.field.fieldEnumEntityList
          })
        }
      },
      // 校验字段显示名
      inputTatgetName() {
        let regex = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$"); // 中文、英文、数字
        //判断输入框中有内容
        if (!regex.test(this.form.targetName.trim())) {
          this.checkTargetName = true;
        } else this.checkTargetName = false;
      },
    }
  }
</script>

<style lang="scss">
  #field {
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

      .el-select {
        width: 240px;
        height: 32px;
        border-radius: 4px;
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

        .el-input {
          width: 100%;
        }
      }

      .el-input {
        width: 440px;
        height: 32px;
        border-radius: 4px;
        margin-bottom: 32px;

        .el-input__inner {
          font-size: 14px;
          padding-left: 8px;
          height: 32px;
          line-height: 32px;
        }

        .el-input-group__prepend {
          background: #D9D9D9;
        }
      }
    }
  }
</style>
