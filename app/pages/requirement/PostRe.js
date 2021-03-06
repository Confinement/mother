import "@css/common.css"
import "@css/postre.css"
import React from "react";
import { Toast, List, Radio, Flex, WhiteSpace, WingBlank, DatePicker, NavBar, Icon, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
import {fetchPost} from '@common/Fetch'
import overscroll from '@common/overscroll'


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
	}

	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
	}

	handleSumbit() {
		let data = {} ;
		data.Token = Cookies.get("token");;
		let dueDate = new Date(this.state.date);
		var m = "0" + (dueDate.getMonth() + 1);
		var d = "0" + dueDate.getDate();
		data.dueDate = dueDate.getFullYear() + '-' + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
		
		data.babyType = this.state.babyN;
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

		fetchPost("api/tk/demand/saveOrUpdateDemand", data, true).then(res => {
			console.log(res)
			this.props.history.replace("/mycenter/requirementlist");
			// jump to requirements management page
		}).catch(({desc}) => {
			Toast.info(desc, 2);
		})
	}


	render() {
		const { getFieldProps } = this.props.form;
		return (
			<section className="page with-navbar postre" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #ccc"}}>发布需求</NavBar>
				<div className="page-container">
					<form className="mom-requirement">
					<WingBlank size="md">
						<DatePicker
							mode="date"
							title="预产期："
							extra=""
							minDate={new Date()}
							maxDate={new Date(new Date().getTime()+ 1000*3600*24*365)}
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
								<Flex.Item><div className={this.state.daysValue==this.state.daysValueCustom?'flex-item selected':'flex-item'}><input type='number' placeholder="其他天数" onChange={(e)=>this.setState({daysValue:e.target.value, daysValueCustom:e.target.value})} onClick={(e)=>this.setState({daysValue:e.target.value, daysValueCustom:e.target.value})}/></div></Flex.Item>
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
								<Flex.Item><div className={this.state.babyN==3?'flex-item selected':'flex-item'} onClick={()=>this.setState({babyN:3})}>多胞胎</div></Flex.Item>
								{/* <Flex.Item><div className={this.state.babyN==this.state.babyNCustom?'flex-item selected':'flex-item'}><input placeholder="其他数量" type='number' onChange={(e)=>this.setState({babyN:e.target.value, babyNCustom:e.target.value})} onClick={(e)=>this.setState({babyN:e.target.value, babyNCustom:e.target.value})}/></div></Flex.Item> */}
								<Flex.Item></Flex.Item>
							</Flex>
						</div>
						<WhiteSpace />
						<section className='arear'>
							<span>服务地址</span>
							<WhiteSpace />
							<InputItem
								{...getFieldProps('input3')}
								placeholder="请输入地址"
								value={this.state.addressValue}
								extra={<Button type="ghost" size="small" inline onClick={() => this.props.history.push("/mycenter/requirementlist/post/address")}>+</Button>}
								onChange={v=>this.setState({addressValue:v})}
							/>
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
									<Flex.Item><div className={this.state.babysValue=="-"?'flex-item selected':'flex-item'}  onClick={()=>this.setState({babysValue:"-"})}>不限</div></Flex.Item>
									<Flex.Item><div className={this.state.babysValue=="0-10"?'flex-item selected':'flex-item'} onClick={()=>this.setState({babysValue:"0-10"})}>10个以下</div></Flex.Item>
									<Flex.Item><div className={this.state.babysValue=="11-30"?'flex-item selected':'flex-item'} onClick={()=>this.setState({babysValue:"11-30"})}>11-30个</div></Flex.Item>
									<Flex.Item><div className={this.state.babysValue=="31-1000"?'flex-item selected':'flex-item'} onClick={()=>this.setState({babysValue:"31-1000"})}>31个以上</div></Flex.Item>
								</Flex>
							</div>
							<WhiteSpace />
							<div className="money">
								<span>薪资</span>
								<WhiteSpace />
								<Flex>
									<Flex.Item><div className={this.state.costMin==""&&this.state.costMax==""?'flex-item selected':'flex-item'} onClick={()=>this.setState({costMin:"", costMax:""})}>面议</div></Flex.Item>
									<Flex.Item><div className={this.state.costMin!=""||this.state.costMax!=""?'flex-item selected':'flex-item'}><input placeholder="最低价" type='number' ref="costMin" onChange={(e)=>this.setState({costMin:e.target.value})} onClick={(e)=>this.setState({costMin:e.target.value, costMax:this.refs.costMax.value})}/></div></Flex.Item>
									&nbsp; - &nbsp;
									<Flex.Item><div className={this.state.costMin!=""||this.state.costMax!=""?'flex-item selected':'flex-item'}><input placeholder="最高价" type='number' ref="costMax" onChange={(e)=>this.setState({costMax:e.target.value})} onClick={(e)=>this.setState({costMax:e.target.value, costMin:this.refs.costMin.value})}/></div></Flex.Item>
									<Flex.Item></Flex.Item>
								</Flex>
							</div>
						</section>
						<WhiteSpace size="xl" />
						<Button type="primary" onClick={this.handleSumbit.bind(this)}>发布</Button>
					</WingBlank>
					</form>
					<WhiteSpace />
				</div>
			</section>
		)
	}

}
export default createForm()(PostRe);