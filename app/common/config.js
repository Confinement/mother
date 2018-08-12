window.CONFIG || (window.CONFIG={});

const desiginwidth = 750;
const platform=5;
const version="2.0";
const preUrl="http://47.96.103.86:8080/pretty-api/"

export {
	desiginwidth,
	platform,
	version,
	preUrl
}

export let setConfig = (key, value) => {
	module.exports[key] = value;
	window.CONFIG[key] = value;
}

export let getConfig = (key) => {
	return module.exports[key];
}