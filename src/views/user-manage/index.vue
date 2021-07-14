<template>
	<div id="accountConfig">
		<div class="main">
			<div class="tree">
				<el-input prefix-icon="el-icon-search" placeholder="请输入" v-model="filterText"></el-input>
				<el-tree class="filter-tree" :data="data" :highlight-current="true" :props="defaultProps"
					node-key="deptId" default-expand-all :filter-node-method="filterNode" @node-click="handleNodeClick"
					ref="tree">
				</el-tree>
			</div>
			<div class="table-list">
				<section>
					<p>{{deptName}}</p>
				</section>
				<div class="foot search">
					<el-button type="primary" @click="addAccount()" v-if="actionList && actionList.children && actionList.children.find(n => n.name == '添加账号')">添加账号</el-button>
					<div>
						<el-input class="account" v-model="form.username" placeholder="请输入账号名"
							@keyup.enter.native="search"></el-input>
						<el-input v-model="form.mobile" placeholder="请输入登录账号" @keyup.enter.native="search"></el-input>
					</div>
				</div>
				<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
					<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
						v-for="(item,index) in tableColumn" :key="index">
						<template slot-scope="scope">
							<div v-if="item.slot && item.prop=='username'">
								{{scope.row.username}}<br />{{scope.row.mobile}}
							</div>
							<div v-if="item.slot && item.prop=='status'" class="percent">
								<el-switch @change="changeStatus(scope.row)" v-model="scope.row.flag"
									active-color="#21D487" inactive-color="#CDCDD5">
								</el-switch>
								<!-- <div class="dot" :class="[scope.row.status == 1?'green':'']"> </div>-->
								<span> {{scope.row.status == 1?'正常':'禁用'}}</span>
							</div>
							<div v-if="item.slot && item.prop=='related'">
								<el-button type="text" @click="assocoated(scope.row)" v-if="actionList && actionList.children && actionList.children.find(n => n.name == '关联')">关联</el-button>
							</div>
							<div v-if="item.slot && item.prop=='opt'">
								<el-button type="text" @click="addAccount(scope.row)" v-if="actionList && actionList.children && actionList.children.find(n => n.name == '编辑')">编辑</el-button>
								<el-button type="text" @click="del(scope.row)" v-if="actionList && actionList.children && actionList.children.find(n => n.name == '删除')">删除</el-button>
							</div>
							<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					v-if="tableData.length>0" :current-page.sync="searchParams.page" :page-size="searchParams.limit"
					layout="prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getAccountList,
		delAccount,
		updateAccount
	} from '@/api/user-manage/account';
	import {
		getDeptList
	} from '@/api/user-manage/organization/index'
  import {
  	mapGetters,
  	mapActions,
  } from 'vuex'
	export default {
		data() {
			return {
				filterText: '',
				data: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				total: 0,
				tableData: [],
				tableColumn: [ // 表格列数据
					{
						label: '账号名/账号',
						prop: 'username',
						slot: true
					},
					{
						label: '角色',
						prop: 'specName',
					},
					{
						label: '所属组织',
						prop: 'deptName',
					},
					{
						label: '创建人',
						prop: 'weight'
					},
					{
						label: '创建时间',
						prop: 'createTime',
						width: 170
					},
					{
						label: '账户状态',
						prop: 'status',
						slot: true,
					},
					{
						label: '修改账户状态',
						prop: 'weight'
					},
					{
						label: '关联主播',
						prop: 'related',
						slot: true,
					},
					{
						label: '操作',
						prop: 'opt',
						slot: true,
					},
				],
				form: {
					mobile: '',
					username: '',
				},
				deptId: '',
        deptName: '',
				searchParams:{
				  page: 1,
				  limit: 10
				},
        actionList: {}
			}
		},
		created() {

			this.getDeptList();
		},
    computed:{
      ...mapGetters({action: 'module/action'}),
    },
		mounted() {

		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			},
      action: {
        handler(val, oldVal) {
          console.log(val)
          if(val) {
            this.actionList = val.find(n => n.url == this.$route.path)
            console.log(this.actionList)
          }
        },
        immediate: true,
        deep: true //true 深度监听
      }
		},
		methods: {
      // 点击节点名称触发的事件
      handleNodeClick (data) {
        this.deptId = data.deptId
        this.deptName = data.name
        this.search();
      },
			search() {
				this.currentPage = 1;
				this.init();
			},
			getDeptList() {
				getDeptList().then(res => {
          if(res.code != 500) {
            this.data = this.$dealingwithadult(res);
            this.deptId = this.data[0].deptId
            this.deptName = this.data[0].name
            this.setCheckedKeys();
          }
					this.init();
				})
			},
			setCheckedNodes() {
				this.$refs.tree.setCheckedNodes([this.data[0]]);
			},
			setCheckedKeys() {
				this.$refs.tree.setCheckedKeys([this.deptId]);
			},
			init() {
				let params = {
					page: this.searchParams.page,
					limit: this.searchParams.limit,
					username: this.form.username,
					deptId: this.deptId,
          mobile: this.form.mobile
					// order: 'asc',
					// _search: false
				}
				getAccountList(params).then(res => {
					if (res.code != 0) return this.$message.warning(res.msg);
					let list = res.page.list;
					list.forEach(item => {
						item.flag = item.status == 1 ? true : false
					})
					this.tableData = JSON.parse(JSON.stringify(list));
					this.total = res.page.totalCount;
				})
			},
			assocoated(item) {
				// this.$router.push(`/user-manage/associated-anchor?userId=${item.userId}`)
				// 显示弹窗
				
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			addAccount(item) {
				this.$router.push(`/user-manage/add-account?isEdit=${item?1:0}&id=${item && item.userId?item.userId:''}`)
			},
			handleSizeChange(val) {
			    this.searchParams.limit = val;
				this.searchParams.page  = 1;
				this.init();
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.searchParams.page = val;
				this.init();
				console.log(`当前页: ${val}`);
			},
			del(item) {
				this.$confirm('删除后该账户无法登录且无法恢复该账户相关配置项，是否确认？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = [item.userId]
					delAccount(params).then(res => {
						if (res.code == 500) return this.$message.warning(res.msg);
						else {
							this.$message.success('删除成功！');
							this.searchParams.page  = 1;
							this.init();
						}
					})
				})
			},
			changeStatus(item) {
				let params = {
					userId: item.userId,
					status: item.flag ? 1 : 0,
					mobile: item.mobile,
					username: item.username,
					password: item.password,
					conPassword: item.conPassword,
					deptId: item.deptId,
					roleIdList: item.roleIdList,
					email: item.email
				}
				updateAccount(params).then(res => {
					if (res.code == 0) {
						this.$message.success('修改成功！');
						this.init();
					} else this.$message.warning(res.msg)
				})
			}
		}
	}
</script>
<style lang="scss">
	@import '@/styles/variables.scss';

	#accountConfig {
		padding: 36px 25px 36px 50px;
		margin: 30px 0px 30px 30px;
		width: calc(100% - 72px);
		background-color: #FFFFFF;
		border-radius: 12px;
		box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.03);

		.main {
			display: flex;

			/*justify-content: space-between;*/
			.tree {
				width: 237px;
				margin-right: 110px;

				.expanded {
					color: #D8D8D8;
				}

				.el-tree-node__label {
					color: #666777;
					line-height: 20px;
				}

				.el-tree-node__content:hover,
				.is-current {
					background: #F5F7FA;
				}

				.el-input {
					width: 237px;
					height: 40px;
					border-radius: 6px;
					margin-bottom: 24px;

					.el-input__prefix {
						left: 13px;
					}

					.el-input__inner {
						font-size: 14px;
						height: 40px;
						line-height: 40px;
						border: 1px solid #CDCDD5;
						padding-left: 46px;
					}

					.el-input__icon {
						font-size: 20px;
						line-height: 40px;
						color: #9596AB;
					}
				}
			}

			.table-list {
				width: 1192px;

				.iconfont {
					display: inline-block;
					width: 8px;
					height: 8px;
					background: #21D487;
					border-radius: 50%;
					margin-right: 10px;
				}
			}
		}

		.search {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.el-input {
				width: 240px;
				height: 32px;

				.el-input__inner {
					font-size: 14px;
					height: 32px;
					line-height: 32px;
					border: 1px solid #CDCDD5;
				}

				&.account {
					margin-right: 15px;
				}
			}
		}

		.foot {
			.el-button {
				width: 96px;
				height: 40px;
				background: #0079FE;
				border-radius: 6px;
			}
		}

		section {
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
				margin-bottom: 14px;
			}

			.el-select {
				width: 181px;
				height: 32px;
				border-radius: 4px;
				margin-right: 15px;

				>>>.el-input__inner {
					font-size: 14px;
					padding-left: 8px;
					height: 32px;
					line-height: 32px;
				}
			}

			.el-input {
				width: 440px;
				height: 32px;
				border-radius: 4px;

				>>>.el-input__inner {
					font-size: 14px;
					padding-left: 8px;
					height: 32px;
					line-height: 32px;
				}
			}
		}

		.percent {
			display: flex;
			align-items: center;

			span {
				margin-left: 6px;
			}

			.dot {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: #CDCDD5;

				&.green {
					background-color: #21D487;
				}
			}
		}
	}
</style>
