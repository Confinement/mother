import {desiginwidth} from "@common/config"

// 清除html缓存
if(window.location.search.indexOf('clearCache=')==-1)
	location.href = location.href + (location.href.indexOf('?')!=-1?'&':'?') + 'clearCache='+Math.random();

// REM布局
var windowResize =function() {
	var devicePixelRatio = window.devicePixelRatio;
	var documentWidth = document.documentElement.clientWidth;
	var rem = documentWidth / desiginwidth * 100;// * devicePixelRatio;
	document.documentElement.style.fontSize=rem +"px";
};
windowResize();
window.onresize=windowResize;


