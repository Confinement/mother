window.CONFIG || (window.CONFIG={});

const desiginwidth = 750;
const platform=5;
const version="2.0";
// let nickname = window.CONFIG.nickname || "";

export {
	desiginwidth,
	platform,
	version
}

export let setConfig = (key, value) => {
	module.exports[key] = value;
	window.CONFIG[key] = value;
}

export let getConfig = (key) => {
	return module.exports[key];
}