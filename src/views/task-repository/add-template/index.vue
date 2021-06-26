<template>
  <div id="addTemplate">
    <step1 v-show="step == 1" @next="next" @edit="edit"></step1>
    <step2 ref="step2" v-show="step == 2" @pre="pre" :taskTplId="taskTplId"></step2>
  </div>
</template>
<script>
  import step1 from './add-template-step1.vue'
  import step2 from './add-template-step2.vue'
  export default {
    components: {
      step1,
      step2
    },
    data() {
      return {
        step: 1,
        taskTplId: ''
      }
    },
    created() {
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      next(taskTplId) {
        if(!taskTplId) return false;
        this.step = 2;
        this.taskTplId = taskTplId;
      },
      edit(taskTplId) {
        this.step = 2;
        this.taskTplId = taskTplId;
        this.$nextTick(() => {
          this.$refs.step2.editTask();
        })
      },
      pre() {
        this.step = 1;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  #addTemplate {
    padding: 36px 25px 36px 50px;
    margin: 30px 0px 30px 30px;
    width: calc(100% - 72px);
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);
    min-height: 768px;

  }
</style>
