<template>
	<div id="myTask">
		<ul class="container">
			<li class="container-item" v-for="(item, index) in countList" :key="index"
				:style="{ 'background-color': item.bgColor }">
				<div class="item-tit">
					<img :src="item.imageUrl" /><span class="tit">{{ item.title }}</span>
				</div>
				<div class="count">{{ item.number }}</div>
			</li>
		</ul>
		<section class="calendar">
			<p>我的任务</p>
			<ul class="tab-list">
				<li class="tab-item" v-for="(item, index) in tabList" :key="index">
					<span class="tit">{{ item.title }}</span><span class="num">{{ item.number }}</span>
				</li>
			</ul>
			<div class="calendar-list"
				:style="{ height: calandarNextNum > 0 && calandarNextNum < 7  ? '800px' : '676px' }">
				<schedule-calendar :events="events" :dateItemRender="itemRender"
					@date-click="dateClick" @update-value="updateValue" :calandarNextNum="calandarNextNum">
				</schedule-calendar>
			</div>
		</section>
	</div>
</template>
<script>
	import moment from 'moment';
	import sending from "@/images/my-task/sending.png";
	import completed from "@/images/my-task/completed.png";
	import taskcomplete from "@/images/my-task/task-complete.png";
	import task from "@/images/my-task/task.png";
	import waite from "@/images/my-task/waite.png";
	import {
		monthlyCalendar
	} from "@/components/ScheduleCalendar/utils";
	import {getTaskCenter,countTaskCenter} from '@/api/task-center/my-task/index.js'
	export default {
		data() {
			return {
				countList: [
					{imageUrl: sending,title: "累计考核任务指标数",number: 0,bgColor: "#FF9300"},
					{imageUrl: completed,title: "累计完成任务指标数",number: 0,bgColor: "#00B043"},
					{imageUrl: taskcomplete,title: "任务指标完成率",number: "0%",bgColor: "#0089FE"},
					{imageUrl: task,title: "考核中的任务指标数",number: 0,bgColor: "#FE642B"},
					{imageUrl: waite,title: "进行中任务数",number: 0,bgColor: "#7718A6"}
				],
				tabList: [
					{title: "本月应考核任务指标数：",number: 0},
					{title: "本月任务指标完成率：",number: "0%"},
					{title: "当前进行中任务数：",number: 0}
				],
				selectDate: "2020-04",
				events: [],
				itemRender(item) {
					const h = this.$createElement;
					return h("span", "CustomRender：" + item.text);
				},
				calandarNextNum: 0,
				taskCenterDailyDTOList: []
			};
		},
		created() {
			// 显示为当月的数据
			const now = new Date();
			this.events = this.events.map((item) => {
				const d = item.date.split("-")[2];
				item.date = `${now.getFullYear()}-${now.getMonth() + 1}-${d}`;
				return item;
			});
			this.calandarNextNum = monthlyCalendar(new Date().getFullYear(), new Date().getMonth(), 1).nextNum;
			let date = moment().format('YYYY-MM-DD');
			this.getMothData(date);
			this.getCount();
		},
		mounted() {},
		computed: {},
		methods: {
			getCount() {
				countTaskCenter().then(res => {
					if(res.code ==0) {
						this.countList[0].number = res.taskCenterCount.taskTargetCount;
						this.countList[1].number = res.taskCenterCount.taskCompleteCount;
						this.countList[2].number = res.taskCenterCount.taskCompletePercent;
						this.countList[3].number = res.taskCenterCount.taskTargetInProcess;
						this.countList[4].number = res.taskCenterCount.taskInProcess;
					}
				})
			},
			getMothData(date) {
				let params = {
					startTime: moment(moment(date).startOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss'),
					endTime: moment(moment(date).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss')
				}
				getTaskCenter(params).then(res => {
					if(res.code == 0) {
						this.events = res.taskCenter.taskCenterDailyDTOList;
						this.tabList[0].number = res.taskCenter.taskTargetsCount;
						this.tabList[1].number = res.taskCenter.percentTaskTargetComelete;
						this.tabList[2].number = res.taskCenter.taskTargetWorkingCount;
					}
				})
			},
			updateValue(year, month) {
				this.calandarNextNum = monthlyCalendar(year, month, 1).nextNum;
				this.getMothData(`${year}-${month+1}-1 00:00:00`)
			},
			dateClick(e, val) {
        this.$router.push({
        	path: `/task-center/task-list`,
        	query: {
        		date: val,
        	},
        });
				if(this.events.find(n => n.today == val) && (this.events.find(n => n.today == val).dailyTaskTargetWorkingCout >0 ||
				 this.events.find(n => n.today == val).dailyTaskTargetCompleteCout >0 ||
				 this.events.find(n => n.today == val).dailyTaskTargetUncompleteCout >0)) {
					this.$router.push({
						path: `/task-center/task-list`,
						query: {
							date: val,
						},
					});
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import "@/styles/variables.scss";

	#myTask {
		padding: 30px;

		.container {
			display: flex;
			align-items: center;

			&-item {
				width: 256px;
				height: 114px;
				color: #ffffff;
				font-size: 15px;
				border-radius: 14px;
				padding: 14px 20px 16px 20px;
				margin-left: 20px;

				&:first-child {
					margin-left: 0px;
				}

				.item-tit {
					display: inline-flex;
					align-items: center;

					img {
						width: 36px;
						height: 36px;
						margin-right: 10px;
					}
				}

				.count {
					font-size: 30px;
					line-height: 42px;
					font-weight: bold;
					text-align: center;
				}
			}
		}

		.calendar {
			// width: 1390px;
			height: 100%;
			margin-top: 20px;
			background-color: #ffffff;
			border-radius: 12px;
			box-sizing: border-box;
			box-shadow: 0px 2px 3px 2px rgba(0, 0, 0, 0.03);
			padding: 36px 49px 80px 46px;

			>p {
				font-weight: bold;
				color: #292933;
				font-size: 20px;
				line-height: 28px;
			}

			.tab-list {
				display: flex;
				align-items: center;
				margin-top: 20px;
				position: relative;

				.tab-item {
					border: 1px solid #e2e2ea;
					border-radius: 8px;
					font-size: 15px;
					line-height: 21px;
					padding: 6px 14px;
					margin-right: 20px;

					.tit {
						color: #666777;
					}

					.num {
						font-weight: bold;
						color: #34335b;
					}
				}

				.date {
					position: absolute;
					right: 0px;
					display: flex;
					align-items: center;

					.img {
						border: 1px solid #e2e2ea;
						border-radius: 8px;
						width: 32px;
						height: 32px;
						box-sizing: border-box;
						text-align: center;
						display: inline-flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;

						img {
							width: 12px;
							height: 7px;
						}
					}

					.des {
						font-size: 16px;
						color: #666777;
						line-height: 22px;
						margin: 0px 14px;
					}
				}
			}

			.calendar-list {
				margin-top: 20px;
				border: 0.8px solid #cdcdcd;
				border-radius: 9.6px;
				box-sizing: border-box;
				// width: 1296px;
				height: 678px;
				position: relative;

				.week {
					display: flex;
					align-items: center;
					height: 56px;

					>li {
						width: 185.6px;
						text-align: center;
					}
				}

				.week-date {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					color: #34335b;
					font-size: 19.2px;
					line-height: 27px;

					>li {
						position: relative;
						height: 124px;
						width: 184.8px;
						text-align: center;
						box-sizing: border-box;
						border-top: 0.8px solid #cdcdcd;
						border-left: 0.8px solid #cdcdcd;
						padding: 16px 17px 13px 18px;
					}

					.day {
						height: 36px;
						width: 36px;
						line-height: 36px;
						text-align: center;
						margin: 0 auto;
					}

					.today {
						background-color: #0079fe;
						border-radius: 50%;
						height: 36px;
						line-height: 36px;
						width: 36px;
						color: #ffffff;
						text-align: center;
						margin: 0 auto;
					}

					.today-des {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 151px;
						height: 45px;
						font-size: 12px;
						line-height: 17px;
						border-radius: 22.5px;
						margin-top: 16px;
						background-color: #f8fafb;
						padding: 0px 12px;
					}

					.task-info {
						position: absolute;
						z-index: 2;
						width: 100%;
						width: 215px;
						padding: 25px 0px 23px 30px;
						box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.1);
						background-color: #ffffff;
						border-radius: 4px;
						margin-left: 102px;
						margin-top: 5px;

						>li {
							display: flex;
							align-items: center;
							margin-bottom: 2px;

							.dot {
								width: 8px;
								height: 8px;
								border-radius: 50%;
							}

							p {
								font-size: 14px;
								line-height: 20px;
								margin-left: 12px;
							}
						}
					}

					.progress {
						display: inline-flex;
						align-items: center;
						margin-top: 9px;

						.des {
							font-size: 12px;
							line-height: 17px;
							color: #171725;
							margin-left: 8px;
						}

						.el-progress__text {
							font-size: 12px;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
