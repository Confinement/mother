import "../../css/index.css"
import 'antd-mobile/dist/antd-mobile.css'
import React from "react";
import { List, Radio, Flex, WhiteSpace } from 'antd-mobile';
import { Switch, Calendar } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

const RadioItem = Radio.RadioItem;
const extra = {
	'2017/07/15': { info: 'Disable', disable: true },
  };
  
  const now = new Date();
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };
  
  Object.keys(extra).forEach((key) => {
	const info = extra[key];
	const date = new Date(key);
	if (!Number.isNaN(+date) && !extra[+date]) {
	  extra[+date] = info;
	}
  });
  


class PostRe extends React.Component{
	constructor(porps){
		super(porps);
		this.state = {
			en: false,
			show: false,
			config: {},
			addressValue:'',
			arearValue:0,
			ageValue:0,
			babysValue:0,
			daysValue:0, 
		}
		this.onChange=this.onChange.bind(this);
		this.ageOnChange=this.ageOnChange.bind(this);
		this.arearOnChange=this.arearOnChange.bind(this);
		this.babysOnChange=this.babysOnChange.bind(this);
	}
	
	onChange = (e) => {
		this.setState({
			addressValue: e.target.value,
		});
	  }

	  ageOnChange = (value) => {
		console.log('checkbox');
		this.setState({
			ageValue: value,
		});
	  };
	  arearOnChange = (value) => {
		console.log('checkbox');
		this.setState({
			arearValue: value,
		});
	  };
	  babysOnChange = (value) => {
		console.log('checkbox');
		this.setState({
			babysValue: value,
		});
	  };
	  daysOnChange = (value) => {
		console.log('checkbox');
		this.setState({
			daysValue: value,
		});
	  };
	  renderBtn(zh, en, config = {}) {
		config.locale = this.state.en ? enUS : zhCN;
	
		return (
		  <List.Item arrow="horizontal"
			onClick={() => {
			  document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
			  this.setState({
				show: true,
				config,
			  });
			}}
		  >
			{this.state.en ? en : zh}
		  </List.Item>
		);
	  }

	  changeLanguage = () => {
		this.setState({
		  en: !this.state.en,
		});
	  }
	
	  onSelectHasDisableDate = (dates) => {
		console.warn('onSelectHasDisableDate', dates);
	  }
	
	  onConfirm = (startTime, endTime) => {
		document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
		this.setState({
		  show: false,
		  startTime,
		  endTime,
		});
	  }
	
	  onCancel = () => {
		document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
		this.setState({
		  show: false,
		  startTime: undefined,
		  endTime: undefined,
		});
	  }
	
	  getDateExtra = date => extra[+date];
	render(){
		const days = [
			{ value: 0, label: '1天', },
			{ value: 1, label: '3天', },
			{ value: 2, label: '5天', },
			{ value: 3, label: '7天', },
			{ value: 4, label: '9天', },
			{ value: 5, label: '11天', },
		  ];
		  const age = [
			{ value: 0, label: '不限', },
			{ value: 1, label: '29以下', },
			{ value: 2, label: '30-45岁', },
			{ value: 3, label: '46以上', },
		  ];
		  const arear = [
			{ value: 0, label: '不限', },
			{ value: 1, label: '闽南', },
			{ value: 2, label: '闽西', },
			{ value: 3, label: '闽东', },
			{ value: 4, label: '闽北', },
		  ];
		  const babys = [
			{ value: 0, label: '不限', },
			{ value: 1, label: '10个以下', },
			{ value: 2, label: '11-30个', },
			{ value: 3, label: '31个以上', }
		  ];
		  const { ageValue,arearValue,babysValue,daysValue} = this.state;
		return(
			<section className="page">
				<p>您的信息</p>
				<form className="mom-requirement">
					{/* <p>预产期：</p> */}
					<List className="calendar-list" style={{ backgroundColor: 'white' }}>
          			{this.renderBtn('预产期：', 'Select Date', { type: 'one' })}
						{
							this.state.startTime &&
							<List.Item>Time1: {this.state.startTime.toLocaleString()}</List.Item>
						}
						{
							this.state.endTime &&
							<List.Item>Time2: {this.state.endTime.toLocaleString()}</List.Item>
						}
					</List>
					<Calendar
					{...this.state.config}
					visible={this.state.show}
					onCancel={this.onCancel}
					onConfirm={this.onConfirm}
					onSelectHasDisableDate={this.onSelectHasDisableDate}
					getDateExtra={this.getDateExtra}
					defaultDate={now}
					minDate={new Date(+now - 5184000000)}
					maxDate={new Date(+now + 31536000000)}
					/>
   
					<div className="ser-days">服务天数
						<List>
							{days.map(i => (
							<RadioItem key={i.value} checked={daysValue === i.value} onChange={() => this.daysOnChange(i.value)}>
								{i.label}
							</RadioItem>
							))}
						</List>
					</div>
					<section className='baby-num'>
						<span>胎儿数量</span>
						{/* <input type="radio" value={1}>单胞胎
						<input type="radio"  value={2}>多胞胎</> */}
						</section>
					<section className='arear'><span>服务地址</span><input type="text" name='address' value={this.state.addressValue} placeholder="思明南路XXX" onChange={this.onChange}/></section>
					<section className='sister-requirements'>
						<p>月嫂要求</p>
						<div className="age">月嫂年龄
							<List>
								{age.map(i => (
								<RadioItem key={i.value} checked={ageValue === i.value} onChange={() => this.ageOnChange(i.value)}>
									{i.label}
								</RadioItem>
								))}
							</List>
						</div>
						<div className="home-arear">家乡
							<List>
								{arear.map(i => (
								<RadioItem key={i.value} checked={arearValue === i.value} onChange={() => this.arearOnChange(i.value)}>
									{i.label}
								</RadioItem>
								))}
							</List>
						</div>
						<div className="serbaby-num">服务宝宝数
							<List>
								{babys.map(i => (
								<RadioItem key={i.value} checked={babysValue === i.value} onChange={() => this.babysOnChange(i.value)}>
									{i.label}
								</RadioItem>
								))}
							</List>
						</div>
						{/* <div className="money">薪资
							<RadioGroup  defaultValue="a">
								<RadioButton value="c">面议</RadioButton>
							</RadioGroup>
						</div> */}
					</section>
					
					
				</form>
			</section>
			
		)
	}
	
}
export default PostRe;