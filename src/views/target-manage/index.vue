<template>
  <div id="targetManage" :style="{'height': tableData.length==0?'661px':''}">
    <section class="hd">
      <div>
        <el-input v-model="keyword" placeholder="指标名称" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
      </div>
      <el-button type="primary" @click="addTask">新增</el-button>
    </section>
    <el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                       v-for="(item,index) in tableColumn" :key="index">
        <template slot-scope="scope">
          <div v-if="item.slot && item.prop=='weight'" class="percent">
            <div class="dot" :class="[scope.$index == 0?'green':'',scope.$index == 1?'grey':'',scope.$index == 2?'blue':'']"></div><span> {{scope.$index == 0?'进行中':''}}{{scope.$index == 1?'已取消，已结束':''}}{{scope.$index == 2?'待开始':''}}</span>
          </div>
          <div v-if="item.slot && item.prop=='opt'">
            <el-button type="text" v-if="scope.$index != 2">编辑</el-button>
            <el-button type="text" v-if="scope.$index != 2">删除</el-button>
          </div>
          <div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="tableData.length>0"
                   :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
    </el-pagination>
    <div class="tempty" v-if="tableData.length==0 && isShow">
      <img src="@/images/my-task/illustration.png">
      <p>还没有任务明细～</p>
    </div>
  </div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				keyword: '',
        tableData: [{
          date: '2016-05-02',
          name: '佣金求和',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '佣金求和',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '佣金求和',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '佣金求和',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableColumn: [ // 表格列数据
          {
            label: '指标名称',
            prop: 'name',
          },
          {
            label: '指标说明',
            prop: 'specName',
          },
          {
            label: '数据类型',
            prop: 'explain',
          },
          {
            label: '创建人/创建时间',
            prop: 'toothTypeName',
          },
          {
            label: '修改人/修改后时间',
            prop: 'surfaceTreatmentName',
          },
          {
            label: '操作',
            prop: 'opt',
            align: 'center',
            slot: true,
          },
        ],
        currentPage: 1,
        isShow: false
			}
		},
		created() {

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
      addTask(){

      },
			search() {
				console.log(this.keyword)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#targetManage {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		.hd {
			font-size: 20px;
			line-height: 28px;
			color: #34335B;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
      .el-input{
        width: 160px;
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        >>>.el-input__inner{
          background: #F8FAFB;
          height: 40px;
          line-height: 40px;
        }
        >>>.el-input__prefix{
        color: #9596AB;
      }
      }
			.left {
				display: inline-flex;
				position: relative;

				div {
					cursor: pointer;
					position: relative;
				}

			}

			.right {
				.el-button {
					background-color: #0079FE;
					padding: 13px 29px;
					font-size: 14px;
					margin-right: 14px;
				}

				.el-input {
					width: 160px;
					background-color: #F8FAFB;

					>>>.el-input__inner {
						height: 40px;
						line-height: 40px;
						width: 160px;
						border-radius: 5px;
						background-color: #F8FAFB;
						border: 0px;
						font-size: 14px;
						padding-left: 43px;
					}

					>>>.el-input__prefix {
						left: 11px;
					}

					>>>.el-input__icon {
						font-size: 20px;
						line-height: 40px;
						color: #9596AB;
					}
				}
			}

			.item-add {
				margin-left: 20px;
			}

			.active {
				color: #FF8C00;

				&::after {
					content: "";
					height: 3px;
					width: 12px;
					background-color: #FF8C00;
					position: absolute;
					bottom: -4px;
					left: 34px;
				}
			}
		}

	}
</style>
