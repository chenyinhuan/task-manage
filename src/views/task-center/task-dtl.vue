<template>
	<div id="taskDtl">
		<section class="hd">
			<p>查看任务</p>
		</section>
		<section class="container" v-if="list.taskRecordEntities">
			<div class="field">
				<template v-for="(item,index) in tableColumn">
					<div class="field-item" :key="index" v-if="item.fieldType == 2">
						<span class="tit">{{item.fieldName}}</span>
						<div class="des">
							{{list.taskRecordEntities?list.taskRecordEntities.find(n => n.fieldId == item.fieldId).fieldValue:''}}
						</div>
					</div>
				</template>
			</div>
			<div class="content">
				<template v-for="(item,index) in tableColumn">
					<div class="content-item" :key="index" v-if="item.fieldType == 1">
						<span class="tit">{{item.fieldName}}</span>
						<div class="des"
							v-if="list.taskRecordEntities.find(n => n.fieldId == item.fieldId).formType != 4">
							{{list.taskRecordEntities?list.taskRecordEntities.find(n => n.fieldId == item.fieldId).fieldValue:''}}
						</div>
            <div v-else>
              <el-image
                :ref="'img' + item.fieldId"
                 style="max-height: 18px;max-width: 18px;display: none;"
                 :src="list.taskRecordEntities?list.taskRecordEntities.find(n => n.fieldId == item.fieldId).fieldValue:''"
                 :preview-src-list="list.taskRecordEntities?[list.taskRecordEntities.find(n => n.fieldId == item.fieldId).fieldValue]:[]">
              </el-image>
              <el-button @click="scan('img' + item.fieldId)" type="text">查看</el-button>
            </div>

					</div>
				</template>
			</div>
		</section>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				tableColumn: [],
        img: require('../../images/default.png')
			}
		},
		created() {
			let taskDtl = JSON.parse(localStorage.getItem('taskDtl'));
			this.list = taskDtl.list;
			this.tableColumn = taskDtl.tableColumn;
			console.log(this.tableColumn)
			console.log(this.list)

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			scan(key) {
        console.log(this.$refs[key])
        this.$refs[key][0].showViewer = true
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#taskDtl {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		.hd {
			display: flex;
			align-items: center;
			justify-content: space-between;

			p {
				font-weight: bold;
				color: #292933;
				font-size: 20px;
				line-height: 28px;
			}
		}

		.container {
			.field {
				display: flex;
				align-items: center;
				margin-top: 40px;

				.field-item {
					display: inline-flex;
					flex-direction: column;
					width: 164px;
					margin-bottom: 30px;

					.tit {
						font-size: 12px;
						color: #CDCDD5;
            line-height: 17px;
					}

					.des {
						width: 260px;
						font-size: 14px;
            line-height: 20px;
						color: #34335B;
						margin-top: 8px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}

			.content {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin-top: 40px;
				padding-right: 200px;

				.content-item {
					display: inline-flex;
					flex-direction: column;
					margin-bottom: 30px;
					width: 270px;
					text-align: left;

					.tit {
						font-size: 12px;
						color: #CDCDD5;
					}

					.des {
						width: 260px;
						font-size: 14px;
						color: #34335B;
						margin-top: 4px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

			}
		}
	}
</style>
