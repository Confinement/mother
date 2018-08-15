
import { platform, version, preUrl } from '@common/config';
import Store from '@common/Store';
import createBrowserHistory from "history/createBrowserHistory"
const history = createBrowserHistory()


let _fetch = (uri, data, cache, type) => new Promise((resolve, reject) => {
	if(Store[uri]){
		resolve(Store[uri]);
		return;
	}
	data = data || {};
	data.Platform = data.Platform || platform;
	data.Version_Code = data.Version_Code || version;
	let url = preUrl + uri;
	let options = {
		method: type,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	};
	if(type==="GET"){
		url += (url.search(/\?/) === -1 ? '?' : '&') + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
	}else{
		options.body = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
	}
	fetch(url, options).then((response) => (response.json())).then(((res) => {
		if (res.code == "100000") {
			if(cache) Store[uri]=res.content;
			resolve(res.content);
		} else if (res.code == "100001") {
			history.push('/login')
		} else {
			reject(res.code, res.desc);
		}
	}))
})

export let fetchGet = (uri, data, cache) => _fetch(uri, data, cache, "GET")
export let fetchPost = (uri, data, cache) => _fetch(uri, data, cache, "POST")
export default {
	get: fetchGet,
	post: fetchPost
}