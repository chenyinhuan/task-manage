<template>
  <div id="field-select" v-if="visible">
    <el-dialog :close-on-click-modal="false" custom-class="dialog" :visible="visible" top="15vh"  width="738px" @close="close">
        <div class="dialog-content">
          <div class="cont-item">
            <h3>选择表</h3>F
            <div class="list list-left">
              <ul>
                <li>名称</li>
                <li>描述</li>
              </ul>
              <ul v-for="(item,index) in fieldList" :key="index" @click="checkItem(item,index)" :class="curIndex == index?'active':''">
                <li>{{item.name}}</li>
                <li>{{item.desc}}<img v-if="curIndex == index" src="@/images/target-manage/dui.png"></li>
              </ul>
            </div>
          </div>
          <div class="cont-item">
            <h3>选择字段</h3>
            <div class="list">
              <ul>
                <li>字段名称</li>
                <li>字段描述</li>
              </ul>
              <ul v-for="(item,index) in fieldList" :key="index"  @click="checkCurItem(item,index)" :class="cIndex == index?'active':''">
                <li>{{item.name}}</li>
                <li>{{item.desc}}<img v-if="cIndex == index" src="@/images/target-manage/dui.png"></li>
              </ul>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="visible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "targetFieldSelect",
      props: {
        visible: {
          type: Boolean,
          default() {
            return false;
          }
        },
      },
      data(){
        return{
          fieldList:[
            {name: 'yname', desc: '主键'},
            {name: 'yname', desc: '主键'},
            {name: 'yname', desc: '主键'},
          ],
          curIndex: null,
          cIndex: null
        }
      },
      methods:{
        checkItem(item,index){
          this.curIndex = index
        },
        checkCurItem(item,index){
          this.cIndex = index
        },
        close() {
          this.$emit('update:visible', false);
        },
      }
    }
</script>

<style scoped lang="scss">
#field-select{
  .dialog-content{
    display: flex;
    .cont-item{
      flex: 1;
      &:first-child{
        margin-right: 30px;
      }
      h3{
        font-size: 16px;
        font-weight: 600;
        color: #000;
        margin-bottom: 26px;
      }
      .list{
        border-radius: 3px;
        position: relative;
        padding-right: 6px;
        &:after{
          content: '';
          display: inline-block;
          width: 3px;
          height: 120px;
          background: #F1F1F1;
          border-radius: 2px;
          position: absolute;
          right: 0;
          top: 22px;
        }
        ul{
          display: flex;
          border-bottom: 1px solid #ddd;
          height: 56px;
          line-height: 56px;
          align-items: center;
          font-size: 14px;
          color: #34335B;
          &.active{
            color: #1890FF;
          }
          li{
            flex: 1;
            padding-left: 10px;
            line-height: 30px;
            img{
              float: right;
              margin-top: 11px;
            }
          }
        }
      }
    }
  }
}
</style>
