window.CONFIG || (window.CONFIG={});

const desiginwidth = 750;
const platform=5;
const version="2.0";
/* build:start */
const preUrl="http://api.topyuezi.cn/pretty-api/"
/* build:end */
/* debug:start */
const preUrl="http://47.96.103.86:8080/pretty-api/"
/* debug:end */
const appStore="http://a.app.qq.com/o/simple.jsp?pkgname=com.pretty.mom"

export {
	desiginwidth,
	platform,
	version,
	preUrl,
	appStore
}

export let setConfig = (key, value) => {
	module.exports[key] = value;
	window.CONFIG[key] = value;
}

export let getConfig = (key) => {
	return module.exports[key];
}