<template>
  <div id="database">
    <div style="display: flex;">
      <section>
        <p>选择连接库</p>
        <el-select v-model="form.name" placeholder="选择连接库"></el-select>
      </section>
      <section style="margin-left: 32px;">
        <p>选择表字段</p>
        <el-button>点击选择字段</el-button>
      </section>
    </div>
    <section>
      <p>指标名称</p>
      <el-input v-model="form.name" placeholder="请输入指标名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>指标说明</p>
      <el-input v-model="form.name" placeholder="请输入指标说明" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>数据类型</p>
      <el-input v-model="form.dataType" disabled></el-input>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'database',
    data() {
      return {
        list: [],
        form: {
          name: '',
          dataType: 'number'
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

    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #database {
    .item:nth-child(2n+1) {
      margin-left: 20px;
    }
    section {
      font-size: 14px;
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
        &.is-disabled {
          width: 240px;
        }
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
    .el-button {
      padding: 8px 19px;
      border-color: #0079FE;
      color: #0079FE;
    }
  }
</style>
