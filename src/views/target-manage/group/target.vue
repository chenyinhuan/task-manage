<template>
  <div id="target">
    <section>
      <p>指标名称</p>
      <el-input v-model="form.name" placeholder="请输入指标名称" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>指标说明</p>
      <el-input v-model="form.name" placeholder="请输入指标说明" maxlength="20" show-word-limit></el-input>
    </section>
    <section>
      <p>指标计算</p>
      <div style="display: flex;flex-wrap: wrap;">
        <el-select v-model="form.targetId1" placeholder="选择指标"></el-select>
        <el-select v-model="form.judgeId" placeholder="运算选择"></el-select>
        <el-select v-model="form.targetId2" placeholder="选择指标"></el-select>
        <div v-for="(item,index) in list" :key="index" style="margin-left: 20px;">
          <el-select v-model="item.judgeId" placeholder="运算选择"></el-select>
          <el-select v-model="item.targetId" placeholder="选择指标"></el-select>
        </div>
        <a @click="addTarget()" class="add-list" v-if="list.length==0">+新增</a>
        <a v-else class="del" @click="deleteItem()">X删除</a>
      </div>
      <div>
        <el-select v-model="form.name" placeholder="选择展示方式"></el-select>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'target',
    data() {
      return {
        list: [],
        form: {
          name: '',
          targetId1: '',
          targetId2: '',
          judgeId: ''
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
      addTarget(){
        this.list.push({
          targetId: '',
          judgeId: ''
        })
      },
      deleteItem() {
        this.list.splice(0,1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #target {
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
