<template>
	<div id="addRecord">
		<section class="hd">
			<p>新增任务/编辑任务</p>
		</section>
		<section class="container">
			<div class="content">
				<div class="content-item" v-for="(item, index) in taskRecordDetailBasicVOs" :key="index">
					<span class="tit">{{item.fieldName}}</span>
					<el-input placeholder="请输入" v-model="item.fieldValue"
						v-if="item.formType == 1 && item.dataType == 1"></el-input>
					<el-input-number placeholder="请输入" :controls="false" v-model="item.fieldValue"
						v-if="item.formType == 1 && (item.dataType == 3 || item.dataType == 2)"></el-input-number>
					<el-date-picker v-if="item.formType == 1 && item.dataType == 4" v-model="form.date" type="date"
						placeholder="请填写日期">
					</el-date-picker>
					<el-time-picker v-if="item.formType == 1 && item.dataType == 5" v-model="item.fieldValue" type="date"
						placeholder="请填写日期">
					</el-time-picker>
					<el-select placeholder="请输入" v-model="item.fieldValue"
						v-if="item.formType == 2 || item.formType == 3" :multiple="item.formType == 2?false:true">
						<el-option v-for="citem in item.enums" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-upload v-if=" item.formType == 4" class="upload-demo" drag
						action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
						:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img class="img" src="@/images/my-task/upload.png">
						<span>上传文件</span>
					</el-upload>
				</div>
			</div>
		</section>
		<div class="footer-btn">
			<el-button type="primary" @click="saveGood()">保存商品</el-button>
			<el-button @click="cancel()">取消</el-button>
		</div>
	</div>
</template>
<script>
	import {
		getRecordListInputs,
		saveTaskRecord
	} from '@/api/task-center/my-task/index.js'
	export default {
		data() {
			return {
				form: {
					brandId: '',
					date: '',
					name: '',
					progress: '',
					shopName: '',
					isFeed: '',
					account: '',
					accountName: '',
					companyName: '',
					linkId: '',
					orderNo: '',
					orderCode: '',
					expressNo: '',
					taskFeed: '',
					receive: '',
					noReceive: '',
					imageUrl: '',
					fileList: [{
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}, {
						name: 'food2.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}]
				},
				taskRecordDetailBasicVOs: [],
				taskRecords: {},
			}
		},
		created() {
			let params = {
				taskTplId: 4
			}
			getRecordListInputs(params).then(res => {
				if (res.code == 0) {
					this.taskRecords = JSON.parse(JSON.stringify(res.taskRecords));
					this.taskRecordDetailBasicVOs = JSON.parse(JSON.stringify(res.taskRecords
						.taskRecordDetailBasicVOs));
				}
			})
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			saveGood() {
				// {
				//   "taskId": 0,
				//   "taskRecordDetailBasicVOs": [
				//     {
				//       "createTime": "2021-06-16T03:40:18.275Z",
				//       "createUserId": 0,
				//       "dataType": 0,
				//       "description": "string",
				//       "enums": [
				//         {
				//           "createTime": "2021-06-16T03:40:18.275Z",
				//           "enumValue": "string",
				//           "fieldId": 0,
				//           "id": 0,
				//           "status": 0,
				//           "updateTime": "2021-06-16T03:40:18.275Z"
				//         }
				//       ],
				//       "fieldId": 0,
				//       "fieldInputType": 0,
				//       "fieldName": "string",
				//       "fieldShowType": 0,
				//       "fieldValue": "string",
				//       "formType": 0,
				//       "id": 0,
				//       "status": 0,
				//       "taskRecordId": 0,
				//       "taskTplFieldId": 0,
				//       "type": 0,
				//       "updateTime": "2021-06-16T03:40:18.275Z",
				//       "updateUserId": 0
				//     }
				//   ],
				//   "taskRecordDetailComplexVOs": [
				//     {
				//       "createTime": "2021-06-16T03:40:18.275Z",
				//       "createUserId": 0,
				//       "dataType": 0,
				//       "description": "string",
				//       "enums": [
				//         {
				//           "createTime": "2021-06-16T03:40:18.275Z",
				//           "enumValue": "string",
				//           "fieldId": 0,
				//           "id": 0,
				//           "status": 0,
				//           "updateTime": "2021-06-16T03:40:18.275Z"
				//         }
				//       ],
				//       "fieldId": 0,
				//       "fieldInputType": 0,
				//       "fieldName": "string",
				//       "fieldShowType": 0,
				//       "fieldValue": "string",
				//       "formType": 0,
				//       "id": 0,
				//       "status": 0,
				//       "taskRecordId": 0,
				//       "taskTplFieldId": 0,
				//       "type": 0,
				//       "updateTime": "2021-06-16T03:40:18.275Z",
				//       "updateUserId": 0
				//     }
				//   ],
				//   "taskTplId": 0
				// }
				let params = {}
				saveTaskRecord(params).then(res => {

				})
			},
			cancel() {
				this.$router.go(-1)
			},
			handleAvatarSuccess(res, file) {
				this.form.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#addRecord {
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
						color: #666777;
						margin-bottom: 4px;
					}

					.el-input {
						>>>.el-input__inner {
							border: 0px;
							font-size: 14px;
							padding: 0px;
							color: #323232;
							text-align: left;
						}
					}
					.el-input-number {
						>>>.el-input__inner {
							border: 0px;
							font-size: 14px;
							padding: 0px;
							color: #323232;
							text-align: left;
						}
					}
					.el-select {
						width: 105px;

						>>>.el-input__inner {
							border: 0px;
							padding: 0px;
							font-size: 14px;
							text-align: left;
						}
					}

					.img {
						width: 10px;
						height: 10px;
					}

					.el-date-editor {
						position: relative;

						>>>.el-input__prefix {
							left: 0px;
							right: 50px;
							color: #CDCDD5;
						}
					}

					>>>.el-upload-dragger {
						width: 115px;
						height: 30px;
						line-height: 27px;
						border-radius: 4px;
						font-size: 12px;

						span {
							margin-left: 4px;
						}
					}
				}

			}
		}

		.footer-btn {
			.el-button {
				width: 160px;
				font-size: 18px;

				&.el-button--primary {
					background-color: #0079FE;
				}

				&.el-button--default {
					background-color: #F8FAFB;
					color: #9596AB;
					border-color: #F8FAFB;
				}
			}
		}
	}
</style>
