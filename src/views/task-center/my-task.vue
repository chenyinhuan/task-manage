<template>
	<div id="myTask">
		<ul class="container">
			<li class="container-item" v-for="(item,index) in countList" :key="index"
				:style="{'background-color': item.bgColor}">
				<div class="item-tit"><img :src="item.imageUrl"><span class="tit">{{item.title}}</span></div>
				<div class="count">{{item.number}}</div>
			</li>
		</ul>
		<section class="calendar">
			<p>我的任务</p>
			<ul class="tab-list">
				<li class="tab-item" v-for="(item,index) in tabList" :key="index">
					<span class="tit">{{item.title}}</span><span class="num">{{item.number}}</span>
				</li>
				<!-- <div class="date">
					<div class="img"><img src="@/images/my-task/up.png"></div>
					<div class="des">{{selectDate}}</div>
					<div class="img"><img src="@/images/my-task/down.png"></div>
				</div> -->
			</ul>
			<div class="calendar-list">
				<schedule-calendar :events="events"
				:dateItemRender="itemRender"
				@event-dragend="changeDate"
        @date-click="dateClick"></schedule-calendar>
				<!-- <ul class="week">
					<li v-for="(item,index) in week" :key="index">{{item.name}}</li>
				</ul>
				<ul class="week-date">
					<li v-for="(item,index) in calendarList" :key="index">
						<div :class="[index==16?'today':'day']">{{index+1}}</div>
						<div v-if="index==3" class="progress">
							<el-progress type="circle" color="#FF8C00" :stroke-width="4" :width="40" :percentage="70"></el-progress>
							<span class="des">进行中任务数:5</span>
						</div>
						<div v-if="index==16"class="today-des">进行中任务数:5</div>
						<ul v-if="index == 3" class="task-info">
							<li>
								<div class="dot" style="background-color: #00B043;"></div>
								<p>任务指标今日待考核5</p>
							</li>
							<li>
								<div class="dot" style="background-color: #FF9300;"></div>
								<p>任务指标考核完成4</p>
							</li>
							<li>
								<div class="dot" style="background-color: #FE642B;"></div>
								<p>任务指标考核未完成2</p>
							</li>
						</ul>
					</li>
				</ul> -->
			</div>

		</section>
	</div>
</template>
<script>
	import sending from '@/images/my-task/sending.png';
	import completed from '@/images/my-task/completed.png';
	import taskcomplete from '@/images/my-task/task-complete.png';
	import task from '@/images/my-task/task.png';
	import waite from '@/images/my-task/waite.png';
	export default {
		data() {
			return {
				countList: [{
						imageUrl: sending,
						title: '累计考核任务指标数',
						number: 78,
						bgColor: '#FF9300'
					},
					{
						imageUrl: completed,
						title: '累计完成任务指标数',
						number: 59,
						bgColor: '#00B043'
					},
					{
						imageUrl: taskcomplete,
						title: '任务指标完成率',
						number: '50%',
						bgColor: '#0089FE'
					},
					{
						imageUrl: task,
						title: '考核中的任务指标数',
						number: 45,
						bgColor: '#FE642B'
					},
					{
						imageUrl: waite,
						title: '进行中任务数',
						number: 6,
						bgColor: '#7718A6'
					}
				],
				tabList: [{
						title: '本月应考核任务指标数：',
						number: 6
					},
					{
						title: '本月任务指标完成率：',
						number: '75%'
					},
					{
						title: '当前进行中任务数：',
						number: 6
					}
				],
				calendarList: Array(30),
				selectDate: '2020-04',
				week:[{name: '周一'},{name: '周二'},{name: '周三'},{name: '周四'},
				{name: '周五'},{name: '周六'},{name: '周日'}],
				events: [
				    {
				        id: 111,
				        date: '2017-04-03',
				        text: '老铁，扎心了',
				        status: 1
				    },
				    {
				        id: 222,
				        date: '2017-04-03',
				        text: '来啊，互相伤害',
				        status: 2
				    },
				    {
				        id: 333,
				        date: '2017-04-03',
				        text: '这个人好会装逼',
				        status: 3
				    },
				    {
				        id: 444,
				        date: '2017-04-03',
				        text: '那你很棒哟',
				        status: 4
				    },
				    {
				        id: 555,
				        date: '2017-04-03',
				        text: '我表示很无奈',
				        status: 5
				    },
				    {
				        id: 666,
				        date: '2017-04-09',
				        text: '老铁，扎心了',
				        status: 6
				    },
				    {
				        id: 777,
				        date: '2017-04-09',
				        text: '来啊，互相伤害',
				        status: 7
				    },
				    {
				        id: 888,
				        date: '2017-04-09',
				        text: '这个人好会装逼',
				        status: 8
				    },
				    {
				        id: 999,
				        date: '2017-04-09',
				        text: '那你很棒哟',
				        status: 9
				    },
				    {
				        id: 1010,
				        date: '2017-04-09',
				        text: '我表示很无奈',
				        status: 10
				    }
				],
				itemRender(item) {
				    const h = this.$createElement
				    return h('span', 'CustomRender：' + item.text)
				},
			}
		},
		created() {
      // 显示为当月的数据
      const now = new Date()
      this.events = this.events.map(item => {
          const d = item.date.split('-')[2]
          item.date = `${now.getFullYear()}-${now.getMonth() + 1}-${d}`
          return item
      })
		},
		mounted() {

		},
		computed: {

		},
		methods: {
      changeDate(e, item, date) {
          const updateIndex = this.events.findIndex(ele => ele.id === item.id)
          this.$set(this.events, updateIndex, {
              ...this.events[updateIndex],
              date
          })
      },
      dateClick(e,val) {
        console.log(val)
        this.$router.push({
          path: `/task-center/task-list`,
		  query: {
			  date: val
		  }
        })
      }
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/var.scss';

	#myTask {
		padding: 30px;

		.container {
			display: flex;
			align-items: center;

			&-item {
				width: 256px;
				height: 114px;
				color: #FFFFFF;
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

					.tit {}
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
			width: 1390px;
			height: 897px;
			margin-top: 20px;
			background-color: #FFFFFF;
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
					border: 1px solid #E2E2EA;
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
						color: #34335B;
					}
				}
				.date {
					position: absolute;
					right: 0px;
					display: flex;
					align-items: center;
					.img {
						border: 1px solid #E2E2EA;
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
				border: 0.8px solid #CDCDCD;
				border-radius: 9.6px;
				box-sizing: border-box;
				width: 1296px;
				height: 678px;
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
					color: #34335B;
					font-size: 19.2px;
					line-height: 27px;
					>li {
						position: relative;
						height: 124px;
						width: 184.8px;
						text-align: center;
						box-sizing: border-box;
						border-top: 0.8px solid #CDCDCD;
						border-left: 0.8px solid #CDCDCD;
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
						background-color: #0079FE;
						border-radius: 50%;
						height: 36px;
						line-height: 36px;
						width: 36px;
						color: #FFFFFF;
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
						background-color: #F8FAFB;
						padding: 0px 12px;
					}
					.task-info {
						position: absolute;
						z-index: 2;
						width: 100%;
						width: 215px;
						padding: 25px 0px 23px 30px;
						box-shadow: 0px -2px 8px 0px rgba(0,0,0,0.1);
						background-color: #FFFFFF;
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
