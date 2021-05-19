<template>
  <div id="field-select" v-if="visible">
    <el-dialog :close-on-click-modal="false" custom-class="dialog" :visible="visible" top="15vh"  width="782px" @close="close">
        <div class="dialog-content">
          <div class="cont-item">
            <h3>选择表:</h3>
            <div class="list">
              <el-input placeholder="输入表名称" style="margin-bottom: 20px"></el-input>
              <ul>
                <li>字段名称</li>
                <li>字段描述</li>
              </ul>
              <ul v-for="(item,index) in fieldList" :key="index">
                <li>{{item.name}}</li>
                <li>{{item.desc}}</li>
              </ul>
            </div>
          </div>
          <div class="cont-item">
            <h3>选择字段:</h3>
            <div class="list">
              <ul>
                <li>字段名称</li>
                <li>字段描述</li>
              </ul>
              <ul v-for="(item,index) in fieldList" :key="index">
                <li>{{item.name}}</li>
                <li>{{item.desc}}</li>
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
          ]
        }
      },
      methods:{
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
      .list{
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 10px;
        ul{
          display: flex;
          li{
            flex: 1;
            padding-left: 10px;
            line-height: 30px;
            &:first-child{
              border-right: 1px solid #ddd;
            }
          }
        }
      }
      h3{
        margin-bottom: 10px;
      }
    }
  }
}
</style>
