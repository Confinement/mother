import React from "react"
import { List, InputItem, WhiteSpace, Switch, NavBar, Icon, Button, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
import { fetchPost } from '@common/Fetch'


@createForm()
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
			provinceData:[],
			cityDate:[],
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
			phoneValue:value,
		});
	}
	handleSumbit() {
		let data = this.props.form.getFieldsValue();

		data.Token = Cookies.get('token');
		data.phone=this.state.phoneValue.replace(/\s/g,"");
		data.isDefault=this.state.isDefault;
		data.province=this.state.province;
		data.city=this.state.city;
		data.userAddr=data;
		fetchPost("/api/tk/goodsOrder/createOrUpdateAddr", data, false).then((content) => {
			
		})
	}

	componentDidMount() {
		this.getProvince()
	}
	getProvince() {
		let data = {};
		data.Token = Cookies.get('token');
		data.parentId=0;
		let province=[];
		fetchPost("/api/sys/getCity", data, false).then((content) => {
			content.forEach(el =>{
				province.push({label:el.name,value:el.id})
			})
			this.setState({
				provinceData:province,
			})
		})
	}
	getCity(ids){
		console.log(ids);
		let data = {};
		data.Token = Cookies.get('token');
		data.parentId=ids;
		let city=[];

		// let city=this.state.cityData;
		let pdata = this.state.provinceData;
		const asyncValue = [...ids];
		fetchPost("/api/sys/getCity", data, false).then((content) => {
			content.forEach(el =>{
				city.push({label:el.name,value:el.id})
			})
			
			pdata.forEach(i =>{
				if(i.value==asyncValue[0]){
					if(!i.children){
						i.children=city;
						asyncValue.push(i.label);
					}
				}
			})
			this.setState({
				provinceData : pdata,
				selectedCity:asyncValue,
			})
			console.log(this.state.selectedCity)
		})

	}
	render() {
		const { getFieldProps } = this.props.form;
		
		return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{ position: "absolute", width: "100%", zIndex: 100, boxShadow: "0 1px 5px #ccc" }}>添加地址</NavBar>
				<WhiteSpace size="lg" />
				<div className="page-container">
					<form className="addAddress-from">
						<InputItem {...getFieldProps('consignee')} placeholder="请输入您的姓名">收货人</InputItem>
						<InputItem 
							type="phone"
							placeholder="请输入联系电话"
							error={this.state.hasError}
							onErrorClick={this.onErrorClick.bind(this)}
							onChange={this.onChange.bind(this)}
            				value={this.state.phoneValue}
						>联系电话</InputItem>
						<Picker
							data={this.state.provinceData}
							title="地区"
							{...getFieldProps(this.state.provinceData, {
								initialValue: ['500', '508'],
							  })}
							// cascade={false}
							// cols={1}
							extra="请选择"
							value={this.state.selectedCity}
							onPickerChange={v => this.getCity(v)}
							onChange={v => this.setState({ province:this.state.selectedCity[0] ,city: this.state.selectedCity[1]})}
						>
							<List.Item arrow="horizontal">所在地区</List.Item>
						</Picker>
						<InputItem {...getFieldProps('addr')} placeholder="请输入详细地址信息" >详细地址</InputItem>
						<List.Item
							extra={<Switch
								{...getFieldProps('isDefault2', {
									initialValue: false,
									valuePropName: 'checked',
								})}
								onClick={(checked) => { checked ? this.setState({isDefault:0}) :this.setState({isDefault:1})}}
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

