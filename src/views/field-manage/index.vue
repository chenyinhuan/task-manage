<template>
  <div id="fieldManage">
    <section class="hd">
      <div class="left">
        <div class="item" :class="[type == 1?'active':'']" @click="changeTab(1)"><span>原生字段</span></div>
        <div class="item-add" :class="[type == 2?'active':'']" @click="changeTab(2)"><span>衍生字段</span></div>
      </div>
      <div class="right">
        <el-button type="primary" @click="addField">新增</el-button>
        <el-input v-model="keyword" placeholder="字段显示名" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
      </div>
    </section>
    <div style="margin-top: 16px;">
      <!-- 原生字段 -->
      <origin-field v-show="type==1"></origin-field>
      <!-- 衍生字段 -->
      <add-field v-show="type==2"></add-field>
    </div>
  </div>
</template>
<script>
  import originField from '@/views/field-manage/group/original.vue';
  import addField from '@/views/field-manage/group/add.vue';
  export default {
    components: {
      originField,
      addField
    },
    data() {
      return {
        type: 1,
        keyword: ''
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
      addField() {
        this.$router.push(`/field-manage/add-field?type=${this.type}`)
      },
      changeTab(type) {
        this.type = type;
      },
      search() {
        console.log(this.keyword)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #fieldManage {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

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

        div {
          cursor: pointer;
          position: relative;
        }
      }

      .right {
        .el-button {
          background-color: #0079FE;
          padding: 13px 29px;
          font-size: 14px;
          margin-right: 14px;
        }

        .el-input {
          width: 160px;
          background-color: #F8FAFB;

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

      .item-add {
        margin-left: 20px;
      }

      .active {
        color: #FF8C00;

        &::after {
          content: "";
          height: 3px;
          width: 12px;
          background-color: #FF8C00;
          position: absolute;
          bottom: -4px;
          left: 34px;
        }
      }
    }

  }
</style>
