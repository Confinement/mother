import "@css/common.css"
import 'antd-mobile/dist/antd-mobile.css'
import React from "react";
import { List, Radio, Flex, WhiteSpace } from 'antd-mobile';
import { platform, version } from '@common/config';
import { DatePicker } from 'antd-mobile';
// import enUs from 'antd-mobile/lib/date-picker/locale/en_US';


const RadioItem = Radio.RadioItem;


class PostRe extends React.Component {
	constructor(porps) {
		super(porps);
		this.state = {
			en: false,
			show: false,
			config: {},
			addressValue: '',
			arearValue: 1,
			ageValue: '',
			babysValue: '',
			daysValue: 1,
			date: '',
			costMin: 0,
			costMax: 0,
			babyTypeValue: 1,
		}
		this.onChange = this.onChange.bind(this);
		this.ageOnChange = this.ageOnChange.bind(this);
		this.arearOnChange = this.arearOnChange.bind(this);
		this.babysOnChange = this.babysOnChange.bind(this);
		this.costMinOnChange = this.costMinOnChange.bind(this);
		this.costMaxOnChange = this.costMaxOnChange.bind(this);
	}
	babyTypeonChange = (event) => {
		this.setState({
			babyTypeValue: event.target.value,
		});
	}
	onChange = (event) => {
		this.setState({
			addressValue: event.target.value,
		});
	}
	costMinOnChange = (event) => {
		this.setState({
			costMin: event.target.value,
		});
	}
	costMaxOnChange = (event) => {
		this.setState({
			costMax: event.target.value,
		});
	}
	ageOnChange = (event) => {
		this.setState({
			ageValue: event.target.value,
		});
	}
	arearOnChange = (event) => {
		this.setState({
			arearValue: event.target.value,
		});
	}
	babysOnChange = (event) => {
		this.setState({
			babysValue: event.target.value,
		});
	}
	daysOnChange = (event) => {
		this.setState({
			daysValue: event.target.value,
		});
	}


	handleSumbit(event) {
		event.preventDefault();
		let data = {}
		data.Platform = platform;
		data.Version_Code = version;
		data.Token = Cookies.get("token");;
		let dueDate = new Date(this.state.date);
		var m = "0"+(dueDate.getMonth()+1);
		var d = "0"+dueDate.getDate();
		data.dueDate = dueDate.getFullYear() + '-' + m.substring(m.length-2,m.length) + "-" + d.substring(d.length-2,d.length);
		data.babyType = this.state.babyTypeValue;
		data.addr = this.state.addressValue;
		data.serviceDay = this.state.daysValue;

		data.moonAddr = this.state.arearValue,
		// data.moonExp = "112",

		data.costMin = this.state.costMin;
		data.costMax = this.state.costMax;

		data.moonAgeMin = this.state.ageValue.split("-")[0];
		data.moonAgeMax = this.state.ageValue.split("-")[1];
		data.takecareBabyMin = this.state.babysValue.split("-")[0];
		data.takecareBabyMax = this.state.babysValue.split("-")[1];
		
		let url='http://api.topyuezi.cn/pretty-api/api/tk/demand/saveOrUpdateDemand';
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
			<section className = "page" >
						<p>您的信息</p>
						<form className="mom-requirement" onSubmit={this.handleSumbit.bind(this)}>
							{/* <p>预产期：</p> */}
							<DatePicker
								mode="date"
								title="预产期："
								extra=""
								value={this.state.date}
								onChange={date => this.setState({ date })}
							>
								<List.Item arrow="horizontal">预产期：</List.Item>
							</DatePicker>

							<div className="ser-days">服务天数
						<select name="serdays" id="serdays" defaultValue='' value={this.state.daysValue} onChange={this.daysOnChange}>
									<option value="1">1天</option>
									<option value="3">3天</option>
									<option value="5">5天</option>
								</select>
							</div>
							<section className='baby-num'>
								<span>胎儿数量</span>
								<input type="radio" value={1} name="babynum" defaultChecked={this.state.babyone} onChange={this.babyTypeonChange} />单胞胎
						<input type="radio" value={2} name="babynum" defaultChecked={this.state.babyTwo} onChange={this.babyTypeonChange} />双胞胎
						<input type="radio" value={3} name="babynum" defaultChecked={this.state.babythree} onChange={this.babyTypeonChange} />多胞胎
						</section>
							<section className='arear'><span>服务地址</span><input type="text" name='address' value={this.state.addressValue} placeholder="思明南路XXX" onChange={this.onChange} /></section>
							<section className='sister-requirements'>
								<p>月嫂要求</p>
								<div className="age">月嫂年龄
						<select name="age" id="age" defaultValue='' value={this.state.ageValue} onChange={this.ageOnChange}>
										<option value="0-100">不限</option>
										<option value="0-29">29以下</option>
										<option value="30-45">30-45岁</option>
										<option value="46-100">46以上</option>
									</select>
								</div>
								<div className="home-arear">家乡
							<select name="arear" id="arear" defaultValue='' value={this.state.arearValue} onChange={this.arearOnChange}>
										<option value="不限">不限</option>
										<option value="闽南">闽南</option>
										<option value="闽西">闽西</option>
										<option value="闽东">闽东</option>
										<option value="闽北">闽北</option>
									</select>
								</div>
								<div className="serbaby-num">服务宝宝数
							<select name="baby" id="baby" defaultValue='' value={this.state.babysValue} onChange={this.babysOnChange}>
										<option value="0-1000">不限</option>
										<option value="0-10">10个以下</option>
										<option value="11-31">11-30个</option>
										<option value="31-1000">31个以上</option>
									</select>
								</div>
								<div className="money">薪资
							<input className="costMin" value={this.state.costMin} onChange={this.costMinOnChange} type="number" />~<input type="number" value={this.state.costMax} onChange={this.costMaxOnChange} />
								</div>
							</section>
							<input type="submit" value="发布" />

						</form>
			</section>
			
		)
	}

}
export default PostRe;