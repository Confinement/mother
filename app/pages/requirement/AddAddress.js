import React from "react"
import { List, InputItem, WhiteSpace, Switch, NavBar, Icon, Button, Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
import {fetchPost} from '@common/Fetch'

const seasons = [
	[
	  {
		label: '2013',
		value: '2013',
	  },
	  {
		label: '2014',
		value: '2014',
	  },
	],
	[
	  {
		label: '春',
		value: '春',
	  },
	  {
		label: '夏',
		value: '夏',
	  },
	],
  ];

class AddAddress extends React.Component{
	constructor(props){
		super(props);
		this.state={
			hasError: false,
			nameValue:'',
			phoneValue:'',
			addrValue:'',
			isDefault:0,

		}
	}
	  onErrorClick = () => {
		if (this.state.hasError) {
		  Toast.info('Please enter 11 digits');
		}
	  }
	  onChange = (value) => {
		if (value.replace(/\s/g, '').length < 11) {
		  this.setState({
			hasError: true,
		  });
		} else {
		  this.setState({
			hasError: false,
		  });
		}
		this.setState({
			phoneValue
		});
	  }
	handleSumbit(){
		let data = {};
		data.Token = Cookies.get("token");
		data.consignee =this.state.nameValue;
		data.phone =this.state.phoneValue;
		data.phone =this.state.phoneValue;
		data.isDefault=this.state.isDefault;//是否默认地址（0：否；1：是)
		data.addr=this.state.addrValue;
		data.province=this.state.addrValue;
		data.city=this.state.addrValue;

		fetchPost("/api/tk/goodsOrder/createOrUpdateAddr", data, false).then((content) => {
			
			
		  })
	}
	render(){
		const { getFieldProps } = this.props.form;
		return(
			<div>
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"fixed", width:"100%", zIndex:100, boxShadow: "0 1px 5px #999"}}>添加地址</NavBar>
				<WhiteSpace size="lg" />
				<form className="addAddress">
					<InputItem
						{...getFieldProps('autofocus')}
						clear
						placeholder="请输入您的姓名"
						value={this.state.nameValue}
					>收货人</InputItem>
					<InputItem
						type="phone"
						placeholder="请输入联系电话"
						error={this.state.hasError}
						onErrorClick={this.onErrorClick.bind(this)}
						onChange={this.onChange.bind(this)}
						value={this.state.phoneValue}
					>联系电话</InputItem>
					 <Picker
						data={seasons}
						title="地区"
						cascade={false}
						extra="请选择"
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
						onOk={v => this.setState({ sValue: v })}
						>
					<List.Item arrow="horizontal">所在地区</List.Item>
					</Picker>
					<InputItem
						{...getFieldProps('autofocus')}
						clear
						placeholder="请输入详细地址信息"
						value={this.state.addrValue}
					>详细地址</InputItem>
					<List.Item
						extra={<Switch
						{...getFieldProps('Switch', {
							initialValue: false,
							valuePropName: 'checked',
						})}
						onClick={(checked) => { checked ? this.setState({isDefault:1}) :this.setState({isDefault:0}) }}
						/>}
					>默认地址</List.Item>
					<Button type="primary" onClick={this.handleSumbit.bind(this)}>保存</Button>
				</form>
			</div>
		)
	}
}
export default createForm()(AddAddress);

