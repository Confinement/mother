import React from "react"
import { platform, version,token } from '../../js/config';
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';

class AddAddress extends React.component{
	constructor(){
		super(props)
		
	}
	handleSumbit(){
		let url='http://api.topyuezi.cn/pretty-api/api/tk/goodsOrder/createOrUpdateOrder';
		fetch(url, {
			method: 'POST',
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"
			},
			body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
		}).then(response => response.json()).then(function(res) {
			console.log(res)
			if(res.code==="10000"){
			}else{
				alert(res.desc)
			}
		});
	}
	render(){
		return(
			<div>
				<form className="addAddress" onSubmit={this.handleSumbit.bind(this)}>
					<input type="text" name="name" id="name"/>
					<input type="text" name="phone" id="phone"/>
					<select name="city" id="city"></select>
					<input type="text" name="phone" id="phone"/>
					<List.Item
						extra={<Switch
						{...getFieldProps('Switch', {
							initialValue: true,
							valuePropName: 'checked',
						})}
						onClick={(checked) => { console.log(checked); }}
						/>}
					>默认地址</List.Item>
					<input type="submit" value="提交" />
				</form>
			</div>
		)
	}
}
export default AddAddress;

