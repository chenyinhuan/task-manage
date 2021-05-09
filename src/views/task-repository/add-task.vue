<template>
	<div id="addTask" :style="{'height': tableData.length==0?'661px':''}">
    <p>任务信息</p>
    <section>
      <p>任务名称</p>
      <el-input v-model="form.taskName"></el-input>
    </section>
    <section>
      <p>任务说明</p>
      <el-input v-model="form.remark"></el-input>
    </section>
    <section>
      <p>任务模版</p>
      <el-select v-model="form.template"></el-select>
    </section>
    <section>
      <p>覆盖时间</p>
      <el-select v-model="form.template"></el-select>
    </section>
    <section>
      <p>派发名单</p>
      <el-select v-model="form.template"></el-select>
    </section>
    <section>
      <p>任务类型</p>
      <el-select v-model="form.template"></el-select>
    </section>
    <div>
      <el-button type="primary">提交任务</el-button>
      <el-button>取消</el-button>
    </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
        taskName: '',
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

	#addTask {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);


	}
</style>
