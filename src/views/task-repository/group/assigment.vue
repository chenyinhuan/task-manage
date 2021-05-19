<template>
	<div id="assigment">
		<el-dialog title="提示" :visible.sync="visibleDialog" width="782px" :before-close="handleClose">
			<section class="add-assigment">
				<div class="header">
					<span>直接派发</span>
					<span>由下级派发</span>
				</div>
				<div>
					<tree-transfer :title="title" :from_data='fromData' :to_data='toData'
						:defaultProps="{label:'label'}" @add-btn='add' @remove-btn='remove' :mode='mode' height='540px'
						filter openAll>
					</tree-transfer>
				</div>
			</section>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import treeTransfer from 'el-tree-transfer' // 引入
	export default {
		name: 'assigment',
		components: {
			treeTransfer
		},
		data() {
			return {
				taskName: '',
				title: '',
				mode: "transfer", // transfer addressList
				fromData: [{
					id: "1",
					pid: 0,
					label: "一级 1",
					children: [{
							id: "1-1",
							pid: "1",
							label: "二级 1-1",
							children: []
						},
						{
							id: "1-2",
							pid: "1",
							label: "二级 1-2",
							children: [{
									id: "1-2-1",
									pid: "1-2",
									children: [],
									label: "二级 1-2-1"
								},
								{
									id: "1-2-2",
									pid: "1-2",
									children: [],
									label: "二级 1-2-2"
								}
							]
						}
					]
				}, ],
				toData: [],
				visibleDialog: false
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
			open() {
				this.visibleDialog = true;
			},
			handleClose() {
				this.visibleDialog = false;
			},
			confirm() {
				this.$emit('confirm', this.$data)
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

	#assigment {}
</style>
