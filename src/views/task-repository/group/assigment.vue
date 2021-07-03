<template>
	<div id="assigment">
		<el-dialog title="" :visible.sync="visibleDialog" width="738px">
			<section class="add-assigment">
				<div class="header">
					<span @click="changeType(1)" :class="type==1?'active':''">直接派发</span>
					<span @click="changeType(2)" :class="type==2?'active':''">由下级派发</span>
				</div>
			</section>
			<!--				<div>-->
			<!--					<tree-transfer :title="title" :from_data='fromData' :to_data='toData'-->
			<!--						:defaultProps="{label:'label'}" @add-btn='add' @remove-btn='remove' :mode='mode' height='540px'-->
			<!--						filter openAll>-->
			<!--					</tree-transfer>-->
			<!--				</div>-->
			<!--			</section>-->
			<!--			<span slot="footer" class="dialog-footer">-->
			<!--				<el-button @click="handleClose">取 消</el-button>-->
			<!--				<el-button type="primary" @click="confirm">确 定</el-button>-->
			<!--			</span>-->
			<div class="title">
				<h3>人员名单：</h3>
				<h3>任务派发人员名单：</h3>
			</div>
			<div class="tranferbox">
				<div class="conbox" style="background: #F7F7F7">
					<div class="titbox">
						<el-input size="mini" placeholder="输入人员名称" suffix-icon="el-icon-search" v-model="filterText">
						</el-input>
					</div>
					<div class="wordbox">
						<el-tree @check="getData" show-checkbox class="filter-tree" default-expand-all node-key="userId" :data="data"
							:props="defaultProps" :filter-node-method="filterNode" ref="tree" :default-checked-keys="checkData"></el-tree>
					</div>
				</div>
				&emsp;
				<img src="@/images/target-manage/Path.png">
				&emsp;
				<div class="conbox">
					<div class="wordbox" style="margin-top: 0">
						<el-tag v-for="(item,index) in selectedData" :key="index"
							type="info">
							{{item.username}}
						</el-tag>
						<template v-for="(item,index) in keyarr"  v-if="!selectedData.some(n => n.userId == item.userId)">
							<el-tag @close="removeData(item)"  closable type="info" :key="index">
								{{item.username}}
							</el-tag>
						</template>
					</div>
				</div>

			</div>
			<span slot="footer" class="dialog-footer">
				<span class="count">已选择派发人数：{{checkFlag?keyarr.length:selectedData.length}}人</span>
				<el-button @click="visibleDialog = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	// import treeTransfer from 'el-tree-transfer' // 引入
	export default {
		name: 'assigment',
		// components: {
		// 	treeTransfer
		// },
    props:{
      data: {
        type: Array,
        default: []
      },
      selectedData:{
        type: Array,
        default: []
      }
    },
		data() {
			return {
				type: 1,
				input3: "",
				checkList: [],
				keyarr: [],
				filterText: "",
				defaultProps: {
				  children: "children",
				  label: "name",
				},
				taskName: '',
				title: '',
				mode: "transfer", // transfer addressList
				toData: [],
				visibleDialog: false,
				checkFlag: false
				// checkData: []
			}
		},
		created() {

		},
		mounted() {

		},

		computed: {
			checkData() {
				let arr = [];
				for (var i = 0; i < this.selectedData.length; i++) {
					arr.push(this.selectedData[i].userId)
				}
				return arr;
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			},
		},
		methods: {
			changeType(type) {
				this.type = type
			},
			//关键词搜索
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			getData() {
				this.checkFlag = true; // 点击复选框标记
				this.keyarr = []
				this.checkList = this.$refs.tree.getCheckedNodes();
				if (this.checkList.length > 0) {
					for (var i = 0; i < this.checkList.length; i++) {
						if (!this.checkList[i].children && this.checkList[i].userId) {
						  this.checkList[i].taskType = this.type
							this.keyarr.push(this.checkList[i])
						}
					}

				} else {
					this.keyarr = []
				}
			},
			setCheckedNodes(arr) {
				this.$refs.tree.setCheckedNodes(arr);
			},
			removeData(data) {
				let checklist = this.keyarr;
				for (var i = 0; i < checklist.length; i++) {
					if (checklist[i].username === data.username) {
						checklist.splice(i, 1);
					}
				}
				this.keyarr = checklist;
				this.setCheckedNodes(this.keyarr);
			},
			open() {
				this.visibleDialog = true;
			},
			handleClose() {
				this.visibleDialog = false;
			},
			confirm() {
				this.$emit('confirm', this.keyarr)
        this.visibleDialog = false
			},
			// 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
			changeMode() {
				if (this.mode == "transfer") {
					this.mode = "addressList";
				} else {
					this.mode = "transfer";
				}
			},
			// 监听穿梭框组件添加
			add(fromData, toData, obj) {
				// 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
				// 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
				console.log("fromData:", fromData);
				console.log("toData:", toData);
				console.log("obj:", obj);
			},
			// 监听穿梭框组件移除
			remove(fromData, toData, obj) {
				// 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
				// 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
				console.log("fromData:", fromData);
				console.log("toData:", toData);
				console.log("obj:", obj);
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/variables.scss';

	#assigment {
		.add-assigment {
			.header {
				width: 252px;
				display: flex;
				align-items: center;

				span {
					flex: 1;
					display: inline-block;
					padding-bottom: 7px;
					text-align: center;
					cursor: pointer;
					&.active {
						color: #1890FF;
						position: relative;

						&:after {
							content: '';
							display: inline-block;
							width: 80px;
							height: 1px;
							background: #1890FF;
							position: absolute;
							left: 23px;
							bottom: 0;
						}
					}
				}
			}
		}

		.dialog-footer {
			width: 100%;

			.count {
				margin-right: 32px;
				font-size: 14px;
				color: #34335B;
			}
		}

		.title {
			display: flex;
			margin: 15px 0;
			padding: 0 20px;

			h3 {
				&:first-child {
					margin-right: 289px;
				}
			}
		}

		>>>.el-dialog__body {
			padding: 0 20px;
		}

		.tranferbox {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20px;

			.conbox {
				border: 1px solid #e9eaed;
				border-radius: 2px;
				background: #fff;
				width: 300px;
				padding: 14px;
				min-height: 300px;

				.el-tree {
					background: #F7F7F7;
				}

				.titbox {
					height: 29px;
					line-height: 29px;

					h2 {
						font-size: 14px
					}
				}

				.wordbox {
					font-size: 12px;
					margin-top: 10px;
					overflow-y: auto;

					.el-tag {
						margin-right: 8px;
						margin-bottom: 8px;
					}

					.el-tree-node__label {
						font-size: 12px;
					}

					ul {
						li {
							.inli {
								display: flex;
								align-items: baseline;
							}

							span {
								font-size: 12px;
								display: block;
								width: 70px;
								padding-left: 10px
							}

							.el-icon-s-custom {
								color: #93a9d3
							}

							.el-icon-close {
								color: #808080;
								cursor: pointer;
							}
						}
					}
				}
			}
		}

		>>>.wl-transfer .transfer-left,
		>>>.wl-transfer .transfer-right {
			width: 44%;
		}

		>>>.wl-transfer .transfer-center {
			width: 12%;
			left: 44%;
		}
	}
</style>
