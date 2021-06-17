<template>
	<div id="taskDtlList" :style="{'height': tableData.length==0?'661px':''}">
		<section class="hd">
			<p>任务详情</p>
			<el-button type="primary" @click="add()">新增记录</el-button>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
			<el-table-column :prop="item.fieldId" :label="item.fieldName" :width="item.width"
				v-for="(item,index) in tableColumn" :key="index">
				<template slot-scope="scope">
					<div v-if="item.slot && item.prop=='opt'">
						<el-button type="text" @click="go('scan', scope.row)">查看</el-button>
						<el-button type="text" @click="go('edit', scope.row)">编辑</el-button>
						<el-button type="text">删除</el-button>
					</div>
					<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
			:current-page.sync="currentPage" :page-size="limit" layout="prev, pager, next, jumper" :total="total">
		</el-pagination>
		<div class="tempty" v-if="tableData.length==0 && isShow">
			<img src="@/images/my-task/illustration.png">
			<p>还没有任务明细～</p>
		</div>
	</div>
</template>
<script>
  import {getRecordList} from '@/api/task-center/my-task/index.js'
	export default {
		data() {
			return {
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '{原生字段1}',
						prop: 'strengthName',
					},
					{
						label: '{原生字段1}',
						prop: 'specName',
					},
					{
						label: '{原生字段1}',
						prop: 'explain',
					},
					{
						label: '{原生字段1}',
						prop: 'toothTypeName',
					},
					{
						label: '{衍生字段名1}',
						prop: 'surfaceTreatmentName',
					},
					{
						label: '{衍生字段名1}',
						prop: 'materialName',
					},
					{
						label: '{衍生字段名1}',
						prop: 'weight',
					},
					{
						label: '创建时间',
						prop: 'weight',

					},
					{
						label: '操作',
						prop: 'opt',
            width: 140,
						slot: true,
					},
				],
				currentPage: 1,
        limit: 10,
        total: 0,
				isShow: false,
        taskId: '',
        taskTplId: ''
			}
		},
		created() {
      if(this.$route.query.id) this.taskId = this.$route.query.id;
      if(this.$route.query.taskTplId) this.taskTplId = this.$route.query.taskTplId;
      if(this.taskId) {
        let params = {
          taskId: this.taskId,
          limit: this.limit,
           page: this.currentPage,
        }
        getRecordList(params).then(res => {
          if(res.code == 0) {
            res.record.taskTplFieldStructureDTOS.push({
              
            })
            this.tableData = res.record.page.list[0]?res.record.page.list[0].taskRecordEntities:[];
            this.tableColumn = res.record.taskTplFieldStructureDTOS;
            this.total = res.record.page.totalCount;
          }
        })
      }
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
      add() {
        this.$router.push({
          path: '/task-center/add-record',
          query: {
            id: this.taskId,
            taskTplId: this.taskTplId
          }
        })
      },
      go(type, row) {
        this.$router.push({
          path: type=='scan'?'/task-center/task-dtl':'/task-center/add-record',
          query: {
            id: row.id
          }
        })
      }
		}
	}
</script>
<style lang="scss">
  #taskDtlList {
    // .el-table__header-wrapper tr th:nth-last-child(2) {
    //   text-align: center !important;
    // }
    // .el-table__row {
    //   td:nth-last-child(1) {
    //     text-align: center !important;
    //   }
    // }
  }
</style>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#taskDtlList {
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
			.el-button {
				background-color: #0079FE;
				padding: 8px 21px;
				font-size: 14px;
			}
		}

		.el-table {
			.el-button {
				font-size: 14px;
			}
		}
		.tempty {
			text-align: center;
			padding-top: 145px;
			img {
				width: 84px;
				height: 109px;
			}

			p {
				color: #9596AB;
				font-size: 20px;
				line-height: 28px;
				margin-top: 39px;
				font-weight: 400;
			}
		}

	}
</style>
