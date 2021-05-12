<template>
  <div id="userCenter">
      <section>
        <p>个人中心</p>
        <ul class="info">
          <li>
            <h3>账户名</h3>
            <p>张三</p>
          </li>
          <li>
            <h3>手机号</h3>
            <p>18888888888</p>
          </li>
          <li>
            <h3>密码</h3>
            <p><a>修改</a></p>
          </li>
        </ul>
      </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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

  #userCenter {
    padding: 40px 25px 36px 60px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;
    .foot{
      margin-top: 60px;
      .el-button{
        width: 124px;
        height: 40px;
        background: #0079FE;
        border-radius: 6px;
      }
    }
    .info{
      li{
        padding: 15px 0;
        h3{
          font-size: 12px;
          line-height: 17px;
          color: #CDCDD5;
          margin-bottom: 4px;
        }
        p{
          font-size: 14px;
          line-height: 20px;
          color: #34335B;
          a{
            color: #0079FE;
          }
        }
      }
    }
    section{
      .add{
        font-size: 14px;
        font-weight: 500;
        color: #0079FE;
        line-height: 20px;
      }
      p{
        font-size: 20px;
        font-weight: 600;
        color: #34335B;
        line-height: 28px;
        margin-bottom: 20px;
      }
      .el-select{
        width: 181px;
        height: 32px;
        border-radius: 4px;
        margin-right: 15px;
        >>>.el-input__inner {
          font-size: 14px;
          padding-left: 8px;
          height: 32px;
          line-height: 32px;
        }
        >>> .el-input__icon {
          line-height: 30px;
        }
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
    }

  }
</style>
