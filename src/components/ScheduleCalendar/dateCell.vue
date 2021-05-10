<template>
  <div class="schedule-calendar-date" :class="[type,{'current-first':date.getDate() == 1 && type=='current'} , { today: isToday, dragged: draggedIndex === index }]"
    @dragover.prevent="" @dragenter.prevent="dragenter" @drop="onDrop" @click="cellClick">
    <div class="schedule-calendar-date-hd">
      <div class="schedule-calendar-date-label">{{type != 'prev' && type != 'next' ?date.getDate():''}}</div>
      <!-- <button type="button"
                    class="schedule-calendar-counter"
                    v-if="details.length > volume"
                    @click.stop.prevent="expandAll">共 {{details.length}} 项</button> -->
    </div>
    <div class="schedule-calendar-details" :class="{ expanded }" :style="detailsPost" ref="details">
      <div v-if="isToday" class="today-des">进行中任务数:5</div>
      <el-popover
      :visible-arrow="false"
        popper-class="detail-info"
        placement="bottom-start"
        width="215"
        trigger="hover">
        <ul class="task-info">
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
        <div v-if="!isToday && type != 'prev' && type != 'next'" class="progress" slot="reference">
          <el-progress type="circle" color="#FF8C00" :stroke-width="4" :width="40" :percentage="70"></el-progress>
          <span class="des">进行中任务数:5</span>
        </div>
      </el-popover>
      <!-- <div v-show="expanded" class="schedule-calendar-details-hd">{{ dateString }}</div>
      <div class="schedule-calendar-details-bd">
        <event-item v-if="details.length" v-for="item in displayDetails" :item="item" :date="date" :type="type"
          :itemRender="itemRender" @item-dragstart="dragItem" :key="item.id"></event-item>
      </div> -->
    </div>
  </div>
</template>
<script>
  import {
    EventBus,
    isSameDay,
    format,
    Store
  } from './utils'
  import eventItem from './eventItem'

  export default {
    components: {
      eventItem
    },
    props: {
      date: Date,
      type: String,
      data: Array,
      index: Number,
      draggedIndex: Number,
      itemRender: Function
    },
    data() {
      return {
        volume: 0,
        expanded: false
      }
    },
    computed: {
      isToday() {
        return isSameDay(new Date(), this.date)
      },
      details() {
        return this.data.length ? this.data.filter(item => isSameDay(item.date, this.date)) : []
      },
      displayDetails() {
        return this.expanded ? this.details : this.details.slice(0, this.volume)
      },
      dateString() {
        return format(this.date)
      },
      detailsPost() {
        const post = {}

        if (this.index >= 35) {
          post.bottom = 0
        } else {
          post.top = 0
        }

        if ((this.index + 1) % 7 === 0) {
          post.right = 0
        } else {
          post.left = 0
        }

        return post
      }
    },
    methods: {
      calcVolume() {
        this.volume = Math.floor(this.$refs.details.clientHeight / 27)
      },
      expandAll() {
        this.expanded = true
        document.addEventListener('mouseup', this.reduceAll)
      },
      reduceAll(e) {
        if (!this.$refs.details.contains(e.target)) {
          this.expanded = false
          Store.hasExpand = true // 设为 true，当前点击仅仅是为了收缩单元格
          document.removeEventListener('mouseup', this.reduceAll)
        }
      },
      dragenter(e) {
        if (this.$el.contains(e.target)) {
          this.$emit('highlight', this.index)

          if (this.$el === e.target) {
            EventBus.$emit('cell-dragenter', e, format(this.date, 'yyyy-MM-dd'), this.type, this.index)
          }
        }
      },
      dragItem(e, item, date, type) {
        this.$emit('highlight', this.index)
        EventBus.$emit('item-dragstart', e, item, format(date, 'yyyy-MM-dd'), type)
      },
      onDrop(e) {
        this.$emit('highlight', -1)
        EventBus.$emit('item-drop', e, format(this.date, 'yyyy-MM-dd'), this.type, this.index)
      },
      cellClick(e) {
        if(this.type != 'current') return 
        // 此时为收缩单页格，不触发 date-click
        if (Store.hasExpand) {
          // 设为 false，下次正常触发 date-click
          Store.hasExpand = false
          return
        }
        EventBus.$emit('date-click', e, format(this.date, 'yyyy-MM-dd'))
      },
    },
    mounted() {
      this.calcVolume()
      window.addEventListener('resize', this.calcVolume)
    },
    destroyed() {
      window.removeEventListener('resize', this.calcVolume)
    },

  }
</script>
<style lang="less">
  @import "./variables.less";
  .progress {
    display: inline-flex;
    align-items: center;
    margin-top: 9px;
    cursor: pointer;
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
    display: block;
  	width: 100%;
  	padding: 12px 0px 11px 23px;
  	background-color: #FFFFFF;
  	border-radius: 4px;
  	>li {
  		display: flex;
  		align-items: center;
  		margin-bottom: 2px;
      cursor: pointer;
  		.dot {
  			width: 8px;
  			height: 8px;
  			border-radius: 50%;
  		}
  		p {
  			font-size: 14px;
  			line-height: 20px;
  			margin-left: 12px;
        flex: 1;
  		}
  	}

  }
  .detail-info {
    padding: 12px;

  }
  .schedule-calendar- {
    &date {
      position: relative;
      display: flex;
      flex-direction: column;
      width: ~'calc(100% / 7)';
      height: ~'calc(100% / 6)';
      min-width: 94px;
      height: 124px;
      padding: 16px 17px 13px 30px;
      border-top: 1px solid @sc-border-color;
      border-right: 1px solid @sc-border-color;
      user-select: none;
      &.current-first {
        border-left: 1px solid @sc-border-color;
      }
      &:nth-child(7n+1) {
        border-left: none;
      }
      &:nth-child(7n) {
        border-right: none;
      }
      &.prev,
      &.next {
        color: #FFFFFF;
        background: #FFFFFF;
      }
       &.prev {
        border-top: 0px;
        border-right: 0px;
      }
      &.next {
        border-right: 0px solid @sc-border-color;
      }
      &-label {
        width: @sc-data-label-size;
        height: @sc-data-label-size;
        font-size: 19.2px;
        line-height: @sc-data-label-size;
        text-align: center;
        border-radius: 50%;
      }
      
      &.today {
        .schedule-calendar-date-label {
          color: @sc-body-color;
          background: @sc-primary-color;
        }
      }

      &.dragged {
        background: @sc-primary-light-color;

        .schedule-calendar-details {
          background: @sc-primary-light-color;
        }
      }
    }

    &date-hd {
      display: flex;
      // flex-direction: column;
      justify-content: center;
      align-content: center;
    }

    &details {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-content: center;

      &.expanded {
        position: absolute;
        z-index: 2;
        width: @sc-details-width;
        min-width: 100%;
        padding: 0 6px 10px;
        background: @sc-body-color;
        box-shadow: @sc-box-shadow;

        .schedule-calendar-details-bd {
          overflow-y: auto;
          max-height: @sc-details-height - @sc-details-hd-height;
        }
      }

    }

    &details-hd {
      height: @sc-details-hd-height;
      line-height: @sc-details-hd-height;
      font-size: 13px;
      color: @sc-gray-color;
      text-align: center;
    }

    &counter {
      font-size: 13px;
      color: @sc-primary-color;
    }


  }
</style>
