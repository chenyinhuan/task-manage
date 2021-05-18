<template>
  <div id="field">
    <section>
      <p>指标名称</p>
      <el-input v-model="form.name" placeholder="请输入指标名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>指标说明</p>
      <el-input v-model="form.name" placeholder="请输入指标说明" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>聚合函数</p>
      <el-select v-model="form.template" placeholder="请选择"></el-select>
    </section>
    <section>
      <p>选择字段</p>
      <el-select v-model="form.template" placeholder="请选择"></el-select>
    </section>
  </div>
</template>

<script>
    export default {
      name: "field",
      data(){
          return{
            form:{}
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
        margin-top: 32px;
      }
      .el-select{
        width: 240px;
        height: 32px;
        border-radius: 4px;
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
