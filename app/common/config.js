window.CONFIG || (window.CONFIG={});

const desiginwidth = 750;
const platform=5;
const version="2.0";
const token='b9999554b3e749df8e68e765de2549f6';
// let nickname = window.CONFIG.nickname || "";
const preUrl="http://47.96.103.86:8080/pretty-api"

export {
	desiginwidth,
	platform,
	version,
	token,
	preUrl
}

export let setConfig = (key, value) => {
	module.exports[key] = value;
	window.CONFIG[key] = value;
}

export let getConfig = (key) => {
	return module.exports[key];
}