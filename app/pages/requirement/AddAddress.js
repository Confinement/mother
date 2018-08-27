import React from "react"
import { List, InputItem, WhiteSpace, Switch, NavBar, Icon, Button, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { platform, version, preUrl } from '@common/config';
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
		let data = {};
		data = this.props.form.getFieldsValue();

		data.Token = Cookies.get('token');
		data.phone=this.state.phoneValue.replace(/\s/g,"");
		data.isDefault=data.isDefault ? 1 : 0;
		data.province=this.state.province;
		data.city=this.state.city;
		data.Platform = platform;
		data.Version_Code = version;
		// data.userAddr={
		// 	addr: 1,
		// 	city: 0,
		// 	cityName: 1,
		// 	consignee: 1,
		// 	county: 1,
		// 	createDate: "2018-08-13T09:37:34.079Z",
		// 	id: 0,
		// 	isDefault: 1,
		// 	modifyDate: "2018-08-13T09:37:34.079Z",
		// 	pageNo: 0,
		// 	pageSize: 0,
		// 	phone: data.phone,
		// 	province: 0,
		// 	provinceName: 0,
		// 	userId: 0,
		// 	zipCode: 0
		//   };

		let url = preUrl + "/api/tk/goodsOrder/createOrUpdateAddr";
		fetch(url, {
			method: "POST",
			headers: { 
				// "Accept": "application/json",
				"Content-Type": "application/json"
			},
			body:  JSON.stringify(data)
		}).then(res => {console.log(res)})
		// }).then((response) => (response.json())).then(((res) => {
		// 	if (res.code == "100000") {
		// 		if(cache) Store[uri]=res.content;
		// 		resolve(res.content);
		// 	} else if (res.code == "100001") {
		// 		// history.push('/login')
		// 	} else {
		// 	//  reject(res);
		// 	console.log(res);
		// 	}
		// }))
		// fetchPost("/api/tk/goodsOrder/createOrUpdateAddr", data).then(data => {
		// 	console.log(data)
		// })
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
		fetchPost("/api/sys/getCity", data, false).then((content) => {
			content.forEach(el =>{
				city.push({label:el.name,value:el.id})
			})
			
			pdata.forEach(i =>{
				if(i.value==ids[0]){
					if(!i.children){
						i.children=city;
						ids.push(i.label);
					}
				}
			})
			this.setState({
				provinceData : pdata,
				selectedCity:ids,
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
							// {...getFieldProps(this.state.provinceData, {
							// 	initialValue: ['500', '508'],
							//   })}
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
								{...getFieldProps('isDefault', {
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

