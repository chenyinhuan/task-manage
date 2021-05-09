<template>
    <header class="schedule-calendar-hd">
        <!-- <button type="button"
                class="schedule-calendar-arrow double-arrow"
                @click="prevYear">&lt;&lt;</button> -->
        <!-- <button type="button"
                class="schedule-calendar-arrow"
                @click="prevMonth">&lt;</button> -->
        <div class="img" @click="prevMonth"><img src="@/images/my-task/up.png"></div>
        <div class="schedule-calendar-picker"
             ref="picker">
            <div role="button"
                 class="schedule-calendar-display"
                 @click="pickerVisible = !pickerVisible">{{year}}-{{month + 1}}</div>
            <picker :visible="pickerVisible"
                    :year="year"
                    :month="month"></picker>
        </div>
       <!-- <button type="button"
                class="schedule-calendar-arrow"
                @click="nextMonth">&gt;</button> -->
        <div class="img"  @click="nextMonth"><img src="@/images/my-task/down.png"></div>
        <!-- <button type="button"
                class="schedule-calendar-arrow double-arrow"
                @click="nextYear">&gt;&gt;</button> -->
    </header>
</template>
<script>
import { calcPrevMonth, calcNextMonth } from './utils'
import picker from './picker'

export default {
    components: {
        picker
    },
    props: {
        year: Number,
        month: Number
    },
    data() {
        return {
            pickerVisible: true
        }
    },
    computed: {

    },
    methods: {
        updateValue(year, month = this.month) {
            this.$emit('updateValue', year, month)
        },
        prevYear() {
            this.updateValue(this.year - 1)
        },
        nextYear() {
            this.updateValue(this.year + 1)
        },
        prevMonth() {
            const { year, month } = calcPrevMonth(this.year, this.month)
            this.updateValue(year, month)
        },
        nextMonth() {
            const { year, month } = calcNextMonth(this.year, this.month)
            this.updateValue(year, month)
        },
        clickOutSide(e) {
            if (this.pickerVisible && !this.$refs.picker.contains(e.target)) {
                this.pickerVisible = false
            }
        }
    },
    created() {
        document.addEventListener('mouseup', this.clickOutSide)
    },
    destoryed() {
        document.removeEventListener('mouseup', this.clickOutSide)
    }
}
</script>
<style lang="less">
@import "./variables.less";

.schedule-calendar- {
    &hd {
      position: absolute;
      right: 0px;
      margin-top: -68px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        height: @sc-header-height;
        padding: @sc-header-padding 0;
        line-height: @sc-header-height - @sc-header-padding * 2;
        font-size: 16px;
        color: #666777;
        user-select: none;
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
    }
    &arrow {
        font-family: consolas;
        font-size: inherit;
        font-weight: 400;
        padding: 0 10px;
        height: 100%;
        color: @sc-primary-light-color;

        &:active {
            background: darken(@sc-primary-dark-color, 15%);
        }
        &.double-arrow {
            letter-spacing: -3px;
        }
    }
    &picker {
        position: relative;
        z-index: 20;
        padding: 4px 5px;
        height: 100%;
    }
    &arrow,
    &display {
        border-radius: 2px;
        transition: .2s ease-in-out;
        padding: 0 14px;
        line-height: 32px;
        cursor: pointer;
        // &:hover {
        //     color: #fff;
        //     background: @sc-primary-dark-color;
        // }
    }
    &display {

    }

}

</style>
