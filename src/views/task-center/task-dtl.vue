<template>
	<div id="taskDtl">
		<section class="hd">
			<p>查看任务</p>
		</section>
		<section class="container">
			<div class="field">
				<div class="field-item" v-for="(item,index) in fieldList" :key="index"><span class="tit">{{item.name}}</span><span class="des">{{item.des}}</span></div>
			</div>
			<div class="content">
				<div class="content-item"><span class="tit">商品ID</span><span class="des">sp8976546789</span></div>
				<div class="content-item"><span class="tit">直播日期</span><span class="des">2020/10/19</span></div>
				<div class="content-item"><span class="tit">店铺</span><span class="des">杭州哈哈哈旗舰店</span></div>
				<div class="content-item"><span class="tit">主播</span><span class="des">小白</span></div>
				<div class="content-item"><span class="tit">是否付费</span><span class="des">是</span></div>
				<div class="content-item"><span class="tit">付款账户</span><span class="des">27137371371741334</span></div>
				<div class="content-item"><span class="tit">付款名</span><span class="des">张三</span></div>
				<div class="content-item"><span class="tit">开票公司</span><span class="des">杭州哈哈哈科技有限公司</span></div>
				<div class="content-item"><span class="tit">链接ID</span><a class="des" style="color: #9596AB;">http://taobao.com…</a></div>
				<div class="content-item"><span class="tit">合同进度</span><span class="des">商家填写</span></div>
				<div class="content-item"><span class="tit">合同单号</span><span class="des">HJK3787748844</span></div>
				<div class="content-item"><span class="tit">合同编号</span><span class="des">318840114</span></div>
				<div class="content-item"><span class="tit">快递单号</span><span class="des">SF3737330303</span></div>
				<div class="content-item"><span class="tit">任务费用</span><span class="des">56.85</span></div>
				<div class="content-item"><span class="tit">已收佣金</span><span class="des">67.98</span></div>
				<div class="content-item"><span class="tit">需补佣金</span><span class="des">12.13</span></div>
				<div class="content-item"><span class="tit">已补佣金截图</span><span class="des"><el-button type="text">查看</el-button></span></div>
				<div class="content-item"><span class="tit">佣金备注</span><span class="des" style="color: #9596AB;">无备注</span></div>
			</div>
		</section>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				fieldList: [{name: '衍生字段名称',des: '已付款'},{name: '衍生字段名称1',des: '已付佣金'}],

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
					}
					.des {
						font-size: 14px;
						color: #34335B;
						margin-top: 8px;
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
						font-size: 14px;
						color: #34335B;
						margin-top: 4px;
					}
				}

			}
		}
	}
</style>
