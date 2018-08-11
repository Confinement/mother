import "@css/common.css"
import "@css/postre.css"
import 'antd-mobile/dist/antd-mobile.css'
import React from "react";
import { List, Radio, Flex, WhiteSpace, WingBlank, DatePicker, NavBar, Icon } from 'antd-mobile';
import { platform, version, preUrl } from '@common/config';
import Cookies from 'js-cookie';
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
			ageValue: '0-100',
			babysValue: '0-1000',
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
		var m = "0" + (dueDate.getMonth() + 1);
		var d = "0" + dueDate.getDate();
		data.dueDate = dueDate.getFullYear() + '-' + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
		data.babyType = this.state.babyTypeValue;
		data.addr = this.state.addressValue;
		data.serviceDay = this.state.daysValue;

		data.moonAddr = this.state.arearValue,
			data.moonExp = "112",

			data.costMin = this.state.costMin;
		data.costMax = this.state.costMax;

		data.moonAgeMin = this.state.ageValue.split("-")[0];
		data.moonAgeMax = this.state.ageValue.split("-")[1];
		data.takecareBabyMin = this.state.babysValue.split("-")[0];
		data.takecareBabyMax = this.state.babysValue.split("-")[1];

		let url = preUrl + '/api/tk/demand/saveOrUpdateDemand';
		fetch(url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
		}).then(response => response.json()).then(function (res) {
			console.log(res)
			if (res.code === "10000") {
			} else {
				alert(res.desc)
			}
		});
	}


	render() {
		
		return (
			<section className="page postre" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>发布需求</NavBar>
				<form className="mom-requirement" onSubmit={this.handleSumbit.bind(this)}>
				<WingBlank size="md">
					<DatePicker
						mode="date"
						title="预产期："
						extra=""
						value={this.state.date}
						onChange={date => this.setState({ date })}
					>
						<List.Item arrow="horizontal">预产期：</List.Item>
					</DatePicker>
					<WhiteSpace />
					<div className="ser-days">
						<span>服务天数</span>
						{/* <select name="serdays" id="serdays" defaultValue='' value={this.state.daysValue} onChange={this.daysOnChange}> */}
						<WhiteSpace />
						<Flex>
							<Flex.Item><div className={this.state.daysValue==1?'flex-item selected':'flex-item'}  onClick={()=>this.setState({daysValue:1})}>1天</div></Flex.Item>
							<Flex.Item><div className={this.state.daysValue==3?'flex-item selected':'flex-item'} onClick={()=>this.setState({daysValue:3})}>3天</div></Flex.Item>
							<Flex.Item><div className={this.state.daysValue==7?'flex-item selected':'flex-item'} onClick={()=>this.setState({daysValue:7})}>7天</div></Flex.Item>
							<Flex.Item><div className={this.state.daysValue==14?'flex-item selected':'flex-item'} onClick={()=>this.setState({daysValue:14})}>14天</div></Flex.Item>
						</Flex>
						<WhiteSpace />
						<Flex>
							<Flex.Item><div className={this.state.daysValue==26?'flex-item selected':'flex-item'} onClick={()=>this.setState({daysValue:26})}>26天</div></Flex.Item>
							<Flex.Item><div className={this.state.daysValue==42?'flex-item selected':'flex-item'} onClick={()=>this.setState({daysValue:42})}>42天</div></Flex.Item>
							<Flex.Item><div className={this.state.daysValue==52?'flex-item selected':'flex-item'} onClick={()=>this.setState({daysValue:52})}>52天</div></Flex.Item>
							<Flex.Item><div className={this.state.daysValue==this.state.daysValueCustom?'flex-item selected':'flex-item'}><input placeholder="其他天数" onChange={(e)=>this.setState({daysValue:e.target.value, daysValueCustom:e.target.value})}onClick={(e)=>this.setState({daysValue:e.target.value, daysValueCustom:e.target.value})}/></div></Flex.Item>
						</Flex>
						{/* </select> */}
					</div>
					<WhiteSpace />
					<div className="ser-days">
						<span>胎儿数量</span>
						<WhiteSpace />
						<Flex>
							<Flex.Item><div className={this.state.babyN==1?'flex-item selected':'flex-item'} onClick={()=>this.setState({babyN:1})}>单胞胎</div></Flex.Item>
							<Flex.Item><div className={this.state.babyN==2?'flex-item selected':'flex-item'} onClick={()=>this.setState({babyN:2})}>双胞胎</div></Flex.Item>
							<Flex.Item><div className={this.state.babyN==this.state.babyNCustom?'flex-item selected':'flex-item'}><input placeholder="其他数量" onChange={(e)=>this.setState({babyN:e.target.value, babyNCustom:e.target.value})}onClick={(e)=>this.setState({babyN:e.target.value, babyNCustom:e.target.value})}/></div></Flex.Item>
							<Flex.Item></Flex.Item>
						</Flex>
					</div>
					{/* <section className='baby-num'>
						<span>胎儿数量</span>
						<input type="radio" value={1} name="babynum" className="babyinput" defaultChecked={this.state.babyN==1} onChange={this.babyTypeonChange} id="babylabel1"/><label className="babylabel" htmlFor="babylabel1">单胞胎</label>
						<input type="radio" value={2} name="babynum" className="babyinput" defaultChecked={this.state.babyTwo} onChange={this.babyTypeonChange} id="babylabel2"/><label className="babylabel" htmlFor="babylabel2">双胞胎</label>
						<input type="radio" value={3} name="babynum" className="babyinput" defaultChecked={this.state.babythree} onChange={this.babyTypeonChange} id="babylabel3"/><label className="babylabel" htmlFor="babylabel3">多胞胎</label>
						</section> */}
					<WhiteSpace />
					<section className='arear'>
						<span>服务地址</span>
						<WingBlank>
							<input type="text" className="address" name='address' value={this.state.addressValue} placeholder="思明南路XXX" onChange={this.onChange} />
						</WingBlank>
					</section>
					<WhiteSpace />
					<section className='sister-requirements'>
						<div className="age">
							<span>月嫂年龄</span>
							<WhiteSpace />
							<Flex>
								<Flex.Item><div className={this.state.ageValue=="0-100"?'flex-item selected':'flex-item'}  onClick={()=>this.setState({ageValue:"0-100"})}>不限</div></Flex.Item>
								<Flex.Item><div className={this.state.ageValue=="0-29"?'flex-item selected':'flex-item'} onClick={()=>this.setState({ageValue:"0-29"})}>29以下</div></Flex.Item>
								<Flex.Item><div className={this.state.ageValue=="30-45"?'flex-item selected':'flex-item'} onClick={()=>this.setState({ageValue:"30-45"})}>30-45岁</div></Flex.Item>
								<Flex.Item><div className={this.state.ageValue=="46-100"?'flex-item selected':'flex-item'} onClick={()=>this.setState({ageValue:"46-100"})}>46以上</div></Flex.Item>
							</Flex>
						</div>
						<WhiteSpace />
						<div className="home-arear">
							<span>家乡</span>
							<WhiteSpace />
							<Flex>
								<Flex.Item><div className={this.state.arearValue=="不限"?'flex-item selected':'flex-item'} onClick={()=>this.setState({arearValue:"不限"})}>不限</div></Flex.Item>
								<Flex.Item><div className={this.state.arearValue=="闽南"?'flex-item selected':'flex-item'} onClick={()=>this.setState({arearValue:"闽南"})}>闽南</div></Flex.Item>
								<Flex.Item><div className={this.state.arearValue=="闽西"?'flex-item selected':'flex-item'} onClick={()=>this.setState({arearValue:"闽西"})}>闽西</div></Flex.Item>
								<Flex.Item><div className={this.state.arearValue=="闽东"?'flex-item selected':'flex-item'} onClick={()=>this.setState({arearValue:"闽东"})}>闽东</div></Flex.Item>
							</Flex>
							<WhiteSpace />
							<Flex>
								<Flex.Item><div className={this.state.arearValue=="闽北"?'flex-item selected':'flex-item'} onClick={()=>this.setState({arearValue:"闽北"})}>闽北</div></Flex.Item>
								<Flex.Item><div className={this.state.arearValue==this.state.arearValueCustom?'flex-item selected':'flex-item'}><input placeholder="其他地区" onChange={(e)=>this.setState({arearValue:e.target.value, arearValueCustom:e.target.value})}onClick={(e)=>this.setState({arearValue:e.target.value, arearValueCustom:e.target.value})}/></div></Flex.Item>
								<Flex.Item></Flex.Item>
								<Flex.Item></Flex.Item>
							</Flex>
						</div>
						<WhiteSpace />
						<div className="serbaby-num">服务宝宝数
							<span>服务宝宝数</span>
							<WhiteSpace />
							<Flex>
								<Flex.Item><div className={this.state.babysValue=="0-1000"?'flex-item selected':'flex-item'}  onClick={()=>this.setState({babysValue:"0-1000"})}>不限</div></Flex.Item>
								<Flex.Item><div className={this.state.babysValue=="0-10"?'flex-item selected':'flex-item'} onClick={()=>this.setState({babysValue:"0-10"})}>10个以下</div></Flex.Item>
								<Flex.Item><div className={this.state.babysValue=="11-30"?'flex-item selected':'flex-item'} onClick={()=>this.setState({babysValue:"11-30"})}>11-30个</div></Flex.Item>
								<Flex.Item><div className={this.state.babysValue=="31-1000"?'flex-item selected':'flex-item'} onClick={()=>this.setState({babysValue:"31-1000"})}>31个以上</div></Flex.Item>
							</Flex>
						</div>
						<div className="money">
							<span>薪资</span>
							<WhiteSpace />
							<Flex>
								<Flex.Item><div className={this.state.costMin==""&&this.state.costMax==""?'flex-item selected':'flex-item'} onClick={()=>this.setState({costMin:"", costMax:""})}>不限</div></Flex.Item>
								<Flex.Item><div className={this.state.costMin!=""||this.state.costMax!=""?'flex-item selected':'flex-item'}><input placeholder="请填写" ref="costMin" onChange={(e)=>this.setState({costMin:e.target.value})} onClick={(e)=>this.setState({costMin:e.target.value, costMax:this.refs.costMax.value})}/></div></Flex.Item>
								&nbsp; - &nbsp;
								<Flex.Item><div className={this.state.costMin!=""||this.state.costMax!=""?'flex-item selected':'flex-item'}><input placeholder="请填写" ref="costMax" onChange={(e)=>this.setState({costMax:e.target.value})} onClick={(e)=>this.setState({costMax:e.target.value, costMin:this.refs.costMin.value})}/></div></Flex.Item>
								<Flex.Item></Flex.Item>
							</Flex>
						</div>
					</section>
					<input type="submit" value="发布" className="post-btn" />
				</WingBlank>
				</form>
			</section>

		)
	}

}
export default PostRe;