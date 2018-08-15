import React from "react"
import { List, InputItem, WhiteSpace, Switch, NavBar, Icon, Button, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
import { fetchPost } from '@common/Fetch'

class AddAddress extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			nameValue: '',
			phoneValue: '',
			addrValue: '',
			isDefault: 0,
			city:'',
		}
		let data={};
		data.parentId=0;
		fetchPost("/api/sys/getCity", data, false).then((content) => {
			this.setState({city:content})
		})
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
	handleSumbit() {
		let data = {};
		data.Token = Cookies.get("token");
		data.consignee = this.state.nameValue;
		data.phone = this.state.phoneValue;
		data.phone = this.state.phoneValue;
		data.isDefault = this.state.isDefault;//是否默认地址（0：否；1：是)
		data.addr = this.state.addrValue;
		data.province = this.state.addrValue;
		data.city = this.state.addrValue;

		fetchPost("/api/tk/goodsOrder/createOrUpdateAddr", data, false).then((content) => {

		})
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{ position: "absolute", width: "100%", zIndex: 100, boxShadow: "0 1px 5px #ccc" }}>添加地址</NavBar>
				<WhiteSpace size="lg" />
				<div className="page-container">
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
						{/* <Picker
							data={this.city}
							title="地区"
							cascade={false}
							extra="请选择"
							value={this.state.sValue}
							onChange={v => this.setState({ sValue: v })}
							onOk={v => this.setState({ sValue: v })}
						>
							<List.Item arrow="horizontal">所在地区</List.Item>
						</Picker> */}
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
								onClick={(checked) => { checked ? this.setState({ isDefault: 1 }) : this.setState({ isDefault: 0 }) }}
							/>}
						>默认地址</List.Item>
						<Button type="primary" onClick={this.handleSumbit.bind(this)}>保存</Button>
					</form>
				</div>
			</section>
		)
	}
}
export default createForm()(AddAddress);

