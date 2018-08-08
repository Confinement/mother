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

class Address extends React.Component{
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

class AddressItem extends React.Component(){
	render(){
		<div>
			<input className='address-name' value={this.props.name}/>
			<ipuut className='address-phon' value={this.props.phone}/>
			<ipuut className='address-addr' value={this.props.addr}/>
			<input type="rideo"/>
			
		</div>
	}
}