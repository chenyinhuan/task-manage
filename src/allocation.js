import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueLazyload from 'vue-lazyload';
// 富文本编辑
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import gather from '@/utils/utils';
import echarts from "echarts" // 图表工具
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueLazyload,{
    error: require('./images/default.png'),                        //报错需要的图片
	loading: require('./images/loading.gif'),				// 替换需要的图片
	dispatchEvent: true,
	attempt: 1
})

Vue.use(VueClipboard)

Vue.prototype.$dealingwithadult = gather.dealingwithadult;
Vue.prototype.$dealingwithMenu = gather.dealingwithMenu;
Vue.prototype.$transformDeptUser = gather.transformDeptUser;
Vue.prototype.$dealingDeptUser = gather.dealingDeptUser;
Vue.prototype.$aggregateFun = [
  {value: 1,label: '求和'},
  {value: 2,label: '平均值'},
  {value: 3,label: '最大值'},
  {value: 4,label: '最小值'},
  {value: 5,label: '计数'}
]
Vue.prototype.$logicAction = [{value: 1,label: '加法'},
{value: 2,label: '减法'},
{value: 3,label: '除'},
{value: 4,label: '乘'},
{value: 5,label: '等于'},
{value: 6,label: '不等于'},
{value: 7,label: '包含'},
{value: 8,label: '不包含'},
{value: 9,label: '为空'},
{value: 10,label: '不为空'},
]
Vue.prototype.$fieldContent = [
  {value: 1,label: '所有记录'},
  {value: 2,label: '为空'},
  {value: 3,label: '不为空'},
  {value: 4,label: '自定义内容'}
]
Vue.prototype.$fieldSelectContent = [
  {value: 1,label: '所有记录'},
  {value: 2,label: '为空'},
  {value: 3,label: '不为空'},
  {value: 4,label: '按选择项'}
]
Vue.prototype.$dataTypeList = [{value: 1,label: '字符串string'},
// {value: 2,label: '整数数值init'},
{value: 3,label: '小数数值float'},
{value: 4,label: '日期date'},
{value: 5,label: '时间time'}]
Vue.prototype.$formTypeList = [
{value: 1,label: '输入'},
{value: 2,label: '单选'},
{value: 3,label: '多选'},
{value: 4,label: '文件'}]
Vue.prototype.$targetShowType = [
  {value: 1,label: '百分数'},
  {value: 2,label: '数值'}]
Vue.prototype.$targetLogicAction = [{value: 1,label: '加'},
  {value: 2,label: '减'},
  {value: 3,label: '乘'},
  {value: 4,label: '除'},
]
Vue.prototype.$testTimeTypeList = [{value: 1,label: '任务派发后固定时间'},
  {value: 2,label: '指定日期'},
  {value: 3,label: '周期性任务'},
]
Vue.prototype.$testCycleList = [
  {value: 1,label: '每日考核'},
  {value: 2,label: '每周考核'},
  {value: 3,label: '每月考核'},

]
Vue.prototype.$logicAction = [
  {value: 1,label: '<小于'},
  {value: 2,label: '<=小于等于'},
  {value: 3,label: '>大于'},
  {value: 4,label: '>=大于等于'},
  {value: 5,label: '=等于'},
  {value: 6,label: '!=不等于'},
]
Vue.prototype.$taskTargetState = [
  {value: 1,label: '待开始'},
  {value: 2,label: '进行中'},
  {value: 3,label: '已结束'},
  {value: 4,label: '已取消'},
]
Vue.prototype.getPlatform = function (){
	var ua = window.navigator.userAgent.toLowerCase();
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	    return "WeChat";
	}
	if (isAndroid) {
	    return "Android-APP";
	}
	if (isIOS) {
	    return "iOS-APP";
	}
	return "";
}
Vue.prototype.IEversion = function() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if(isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if(fIEVersion == 7) {
			return 7;
		} else if(fIEVersion == 8) {
			return 8;
		} else if(fIEVersion == 9) {
			return 9;
		} else if(fIEVersion == 10) {
			return 10;
		} else {
			return 6;//IE版本<=7
		}
	} else if(isEdge) {
		return 'edge';//edge
	} else if(isIE11) {
		return 11; //IE11
	}else{
		return -1;//不是ie浏览器
	}
}
