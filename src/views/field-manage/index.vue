<template>
	<div id="fieldManage">
		<section class="hd">
      <div class="left">
        <div class="item" :class="[index == 0?'active':'']" @click="changeTab(0)"><span>原生字段</span></div>
        <div class="item-add" :class="[index == 1?'active':'']" @click="changeTab(1)"><span>衍生字段</span></div>
      </div>
      <div class="right">
        <el-button type="primary">新增</el-button>
        <el-input v-model="keyword" placeholder="考核批次" @keyup.enter.native="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
      </div>
		</section>
    <div style="margin-top: 16px;">
      <!-- 原生字段 -->
      <origin-field v-show="index==0"></origin-field>
      <!-- 衍生字段 -->
      <add-field v-show="index==1"></add-field>
    </div>
	</div>
</template>
<script>
  import originField from '@/views/field-manage/group/original.vue';
  import addField from '@/views/field-manage/group/add.vue';
	export default {
    components: {
      originField,
      addField
    },
		data() {
			return {
				index: 0,
        keyword: ''
			}
		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {
      changeTab(index) {
        this.index = index;
      },
      search() {
      	console.log(this.keyword)
      }
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/styles/var.scss';

	#fieldManage {
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
