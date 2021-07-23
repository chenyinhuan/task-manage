<template>
  <div id="addTarget">
    <h3>指标信息</h3>
    <section>
      <p>指标创建方式</p>
      <el-radio-group v-model="type">
        <el-radio-button label="1" :disabled="targetId != '' && type != 1">根据字段创建</el-radio-button>
        <el-radio-button label="2" :disabled="targetId != '' && type != 2">根据指标创建</el-radio-button>
        <!-- <el-radio-button label="3" :disabled="targetId != '' && type != 3">根据数据库表创建</el-radio-button> -->
      </el-radio-group>
    </section>
    <field ref="field" v-show="type == 1" :targetId="targetId" :type="type"></field>
    <target ref="target" v-show="type == 2" :targetId="targetId" :type="type"></target>
    <database ref="database" v-show="type == 3" :targetId="targetId" :type="type"></database>
<!--    <div class="foot">-->
<!--      <el-button type="primary" @click="save">保存指标</el-button>-->
<!--      <el-button class="cancel" @click="back">取消</el-button>-->
<!--    </div>-->
  </div>
</template>
<script>
  import field from '@/views/target-manage/group/field.vue'
  import target from '@/views/target-manage/group/target.vue'
  import database from '@/views/target-manage/group/database.vue'
  export default {
    name: 'addTarget',
    components: {
      field,
      target,
      database
    },
    data() {
      return {
        type: '1',
		targetId: '',
      }
    },
    created() {
		if(this.$route.query.id) this.targetId = this.$route.query.id;
		if(this.$route.query.type) this.type = this.$route.query.type;
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      bindCheckBox(value) {
        if (this.checkList.length > 1) {
          this.checkList.splice(0, 1)
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addTarget {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

    >>>.el-checkbox__input.is-checked {
      .el-checkbox__inner {
        background-color: #108EE9;
        border-color: #108EE9;
      }
    }

    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #108EE9;
    }

    >>>.el-input-group__append,
    >>>.el-input-group__prepend {
      background-color: #CDCDD5;
      color: #FFFFFF;
      border-color: #CDCDD5;
      padding: 0px 14px;
    }

    .el-radio-group {
      margin-bottom: 32px;
    }

    >>>.el-radio-button__orig-radio:checked+.el-radio-button__inner {
      background-color: #0079FE;
      border-color: #0079FE;
    }

    h3 {
      font-size: 32px;
      color: #34335B;
      margin-bottom: 32px;
    }

    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #666777;
    }

    .foot {
      margin-top: 60px;

      .el-button {
        width: 124px;
        height: 40px;
        background: #0079FE;
        border-radius: 6px;
        font-size: 18px;

        &.cancel {
          width: 160px;
          height: 40px;
          background: #F8FAFB;
          border-color: #F8FAFB;
          border-radius: 6px;
          color: #9596AB;
        }
      }
    }

    section {
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

      .el-select {
        width: 181px;
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
