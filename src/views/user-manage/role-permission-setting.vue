<template>
  <div id="rolePermissionSetting">
    <section>
      <p>系统页面权限</p>
      <div class="tree">
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
      </div>
    </section>
    <section>
      <p>数据权限</p>
      <el-select v-model="form.template" placeholder="选择权限"></el-select>
    </section>
    <div class="foot">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {
          taskName: '',
          remark: '',
          template: ''
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

  #rolePermissionSetting {
    padding: 36px 25px 36px 50px;
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
      }
    }
    section{
      .tree{
        width: 440px;
        background: #F5F5F5;
        border-radius: 4px;
        padding: 20px 30px;
        margin-bottom: 32px;
        font-size: 14px;
        color: #666777;
        .el-tree{
          background: transparent;
        }
      }
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
    }

  }
</style>
