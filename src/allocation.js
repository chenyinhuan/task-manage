import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueLazyload from 'vue-lazyload';
// 富文本编辑
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import echarts from "echarts" // 图表工具
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueLazyload,{
    error: require('./images/default.png'),                        //报错需要的图片
	loading: require('./images/loading.gif'),				// 替换需要的图片
	dispatchEvent: true,
	attempt: 1
})

Vue.use(VueClipboard)

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

