import React from "react"
import { platform, version,token } from '../../js/config';

arryAddress = function initAddress(){
	var data={};
	ata.Platform = platform;
	data.Version_Code = version;
	data.Token = token;
	let arryAddress=[];
	let url='http://api.topyuezi.cn/pretty-api//api/tk/goodsOrder/getUserAddrList';
	fetch(url, {
		method: 'POST',
		headers: {
				"Content-Type": "application/x-www-form-urlencoded"
		},
		body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
	}).then(response => response.json()).then(function(res) {
		
		if(res.code==="100000"){
			// 地址为空要跳转到新增加地址。
			addressList=res.content
		}else{
			alert(res.desc)
		}
	});

	return addressList;
}();

class Address extends React.component{
	constructor(){
		super(props)
		this.state({
			addressList:arryAddress,
		})
	}

	render(){
		return(
			<div></div>
		)
	}
}
export default Address;

