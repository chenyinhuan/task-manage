<template>
  <div id="field">
    <section>
      <p>指标名称</p>
      <el-input v-model="form.targetName" placeholder="请输入指标名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>指标说明</p>
      <el-input v-model="form.description" placeholder="请输入指标说明" maxlength="200" show-word-limit></el-input>
    </section>
    <section>
      <p>聚合函数</p>
      <el-select v-model="form.targeFieldVO.logicAction" placeholder="请选择" @change="changeLogic()">
        <el-option v-for="item in aggregateFun" :key="item.value" :label="item.label"
        	:value="item.value">
        </el-option>
      </el-select>
    </section>
    <section>
      <p>选择字段</p>
      <el-select v-model="form.targeFieldVO.fieldId" filterable placeholder="请选择">
        <el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName" :value="item.id"></el-option>
      </el-select>
      <el-select style="margin-left: 15px;" v-model="form.targeFieldVO.logicAction" placeholder="字段内容选择" @change="changeLogic()">
        <el-option v-for="item in fieldContent" :key="item.value" :label="item.label"
        	:value="item.value">
        </el-option>
      </el-select>
      <el-select style="margin-left: 15px;" v-model="form.targeFieldVO.fieldId" filterable placeholder="请选择">
        <el-option v-for="(item,index) in nativeList" :key="index" :label="item.fieldName" :value="item.id"></el-option>
      </el-select>
      <span style="margin-left: 11px;">
        <span>=</span>
        <el-input style="margin-left: 11px;width: 240px;" v-model="form.targeFieldVO.fieldId" placeholder="请输入计数字段内容"></el-input>
      </span>
    </section>
    <div class="foot">
      <el-button type="primary" @click="save">保存指标</el-button>
      <el-button class="cancel" @click="back">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {saveTarge} from '@/api/target-manage/index.js'
  import {getNativeList} from '@/api/filed-manage/index.js'
    export default {
      name: "field",
      data(){
          return{
            form: {
              "targetName": "",             //指标名称
              "description": "",       //指标描述
              "type": 1,                                  //类型1：字段指标， 2指标类指标
              "targeFieldVO": {
                "logicAction": '',                         //聚合类型： 1：求和  2：平均, 3：最大数, 4：最小数, 5：计数
                "fieldId": ''                            //字段id
              }
            },
            nativeList: [],
            aggregateFun: this.$aggregateFun,
            fieldContent: this.$fieldContent
          }
      },
      created() {

      },
      methods:{
        back() {
          this.$router.go(-1)
        },
        save() {
          let params = '';
          params = this.form;
          saveTarge(params).then(res => {
            if(res.code == 0) {
              this.$message.success('保存成功！');
              setTimeout(() => {
                this.$router.push('/target-manage')
              },2000)
            }
          })
        },
        changeLogic() {
          let params = {
            "dataTypes": [],    //数据类型，为空时取全部
            "formTypes": [],       //表单类型，为空时取全部
            "type": ''              //字段类型1：原生2衍生，为空时取全部
          }
          if(this.form.targeFieldVO.logicAction != 5) {
            params.dataTypes = [2,3]
          }

          getNativeList(params).then(res => {
          	if (res.code == 0) {
          		this.nativeList = res.fields;
          	}
          })
        }
      }
    }
</script>

<style lang="scss">
  #field{
    section{
      p{
        font-size: 20px;
        font-weight: 600;
        color: #34335B;
        line-height: 28px;
        margin-bottom: 20px;
      }
      .el-select{
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
        >>> .el-input__icon {
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
        .el-input-group__prepend{
          background: #D9D9D9;
        }
      }
    }
  }
</style>
