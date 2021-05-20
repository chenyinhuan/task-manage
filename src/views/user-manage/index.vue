<template>
	<div id="accountConfig">
		<div class="main">
			<div class="tree">
				<el-input prefix-icon="el-icon-search" placeholder="请输入" v-model="filterText"></el-input>
				<el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all
					:filter-node-method="filterNode" ref="tree">
				</el-tree>
			</div>
			<div class="table-list">
				<section>
					<p>业务三部</p>
				</section>
				<div class="foot search">
					<el-button type="primary" @click="addAccount()">添加账号</el-button>
					<div>
						<el-input class="account" v-model="form.username" placeholder="请输入账号名" @keyup.enter.native="search"></el-input>
						<el-input v-model="form.mobile" placeholder="请输入登录账号" @keyup.enter.native="search"></el-input>
					</div>
				</div>
				<el-table :data="tableData" style="width: 100%;margin-top: 10px;" v-if="tableData.length>0">
					<el-table-column :prop="item.prop" :label="item.label" :width="item.width"
						v-for="(item,index) in tableColumn" :key="index">
						<template slot-scope="scope">
              <div v-if="item.slot && item.prop=='username'">
              {{scope.row.username}}<br/>{{scope.row.mobile}}</div>
							<div v-if="item.slot && item.prop=='status'" class="percent">
								<div class="dot" :class="[scope.row.status == 1?'green':'']">
								</div><span> {{scope.row.status == 1?'正常':'禁用'}}</span>
							</div>
							<div v-if="item.slot && item.prop=='related'">
								<el-button type="text" @click="assocoated(scope.row)">关联</el-button>
							</div>
							<div v-if="item.slot && item.prop=='opt'">
								<el-button type="text" @click="addAccount(scope.row)">编辑</el-button>
								<el-button type="text" @click="del(scope.row)">删除</el-button>
							</div>
							<div v-if="!item.slot">{{ scope.row[item.prop] }}</div>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					v-if="tableData.length>0" :current-page.sync="currentPage" :page-size="limit"
					layout="prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getAccountList,
    delAccount
	} from '@/api/user-manage/account';
	export default {
		data() {
			return {
				filterText: '',
				data: [{
					id: 1,
					label: '一级 2',
					children: [{
						id: 3,
						label: '二级 2-1',
						children: [{
							id: 4,
							label: '三级 3-1-1'
						}, {
							id: 5,
							label: '三级 3-1-2',
							disabled: true
						}]
					}, {
						id: 2,
						label: '二级 2-2',
						disabled: true,
						children: [{
							id: 6,
							label: '三级 3-2-1'
						}, {
							id: 7,
							label: '三级 3-2-2',
							disabled: true
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				currentPage: 1,
				total: 0,
        limit: 10,
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
				}
			}
		},
		created() {
      this.init();
		},
		mounted() {

		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		methods: {
      search() {
        console.log('search')
        this.currentPage = 1;
        this.init();
      },
			init() {
        let params = {
          page: this.currentPage,
          limit: this.limit,
          username: this.form.username,
          // order: 'asc',
          // _search: false
        }
				getAccountList(params).then(res => {
					if (res.code != 0) return this.$message.warning(res.msg);
					this.tableData = res.page.list;
					this.total = res.page.totalCount;
				})
			},
			assocoated(item) {
				this.$router.push('/user-manage/associated-anchor')
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			addAccount(item) {
        this.$router.push(`/user-manage/add-account?isEdit=${item?1:0}&id=${item.userId}`)
			},
			handleSizeChange(val) {
				this.currentPage = 1;
        this.init();
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
        this.init();
				console.log(`当前页: ${val}`);
			},
      del(item){
        this.$confirm('确定删除该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = [item.userId]
          delAccount(params).then(res => {
            if(res.code == 500) return this.$message.warning(res.msg);
            else this.$message.success('删除成功！')
          })
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
