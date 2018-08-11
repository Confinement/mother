import createBrowserHistory from "history/createBrowserHistory"
const history = createBrowserHistory()

let _fetch = (url,data,type) => {
	return	fetch(url,{
		method:type,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
	}).then((response) => (response.json())).then(((res) =>{
		if(res.code=="100000"){
			return res.content;
		}else if(res.code == "100001"){
			history.push('/login')
		}else{
			alert(res.desc);
		}
	}))
}

export let fetchGet = (url,data) => _fetch(url,data,"GET")
export let fetchPost = (url,data) => _fetch(url,data,"POST")
export default {
	get: fetchGet,
	post: fetchPost
}