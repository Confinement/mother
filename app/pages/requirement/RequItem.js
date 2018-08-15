import "@css/postre.css"
import React from "react"
import { ListView, Card, WhiteSpace, SwipeAction, List, Button, NavBar, Icon} from 'antd-mobile';
import Cookies from 'js-cookie';
import {fetchPost} from "@common/Fetch";
import overscroll from '@common/overscroll'
import { Switch, Route, Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import NoMatch from '@pages/NoMatch'
import Interview from '@pages/requirement/Interview'

class RequItem extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			applies:'',//月嫂应聘信息
			monData:[],//妈妈信息
			reqId:this.props.match.params.id,//妈妈发布需求信息id
			demandStatus:1,//3结束 2暂停 1应聘中
		}
	}

	componentDidMount() {
		var redata={}
		redata.Token=Cookies.get("token");
		redata.demandId=this.state.reqId;
		fetchPost("/api/tk/demand/queryDemandApplyByMother", redata, false).then((content) => {
			this.setState({
				applies: content.applies,
				monData: content,
				demandStatus:content.status,
			})
		})
		overscroll(document.querySelector('.page-container'));
	}

	stopReq = (type) => {
		var redata={}
		redata.Token=Cookies.get("token");
		let data = this.props.location.state;
		redata.demandId=this.state.reqId;
		let uri="";
		if(type==="1"){
			uri="/api/tk/demand/resumeDemand";
		}else if(type==="2"){
			uri="/api/tk/demand/suspendDemand";
		}else{
			uri="/api/tk/demand/stopDemand";
		}
		fetchPost(uri, redata, false).then((content) => {
			this.setState({
				demandStatus: type,
			})
		})
	}
	
	render(){
		var MoonList=[];
		for (var i = 0, j = this.state.applies.length; i < j; i++) {
			let moon=this.state.applies[i].moon;
			MoonList.push(<MoonItem key={i} demandStatus={this.state.demandStatus} applies ={this.state.applies[i]} moon={this.state.applies[i].moon} headurl={moon.headUrl} name={moon.name} cityName={moon.cityName} takecareBabies={moon.takecareBabies} phone={moon.phone}></MoonItem>);
		};
		  return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #999"}}>护理详情</NavBar>
				<div className="page-container">
				<Card full = {true}>
					<Card.Body>
						<div>预产期:{this.state.monData.dueDate} | {this.state.monData.serviceDay}天</div>
						<div>需求:地区:{this.state.monData.moonAddr}    年龄:{this.state.monData.moonAgeMin}岁-{this.state.monData.moonAgeMax}岁{(this.state.monData.costMax==0 || this.state.monData.costMax=="" || this.state.monData.costMax==null)? '' :'$'+this.state.monData.costMin+'-'+this.state.monData.costMax}</div>
						<div>服务宝宝数:{(this.state.monData.takecareBabyMax==null || this.state.monData.takecareBabyMax==0) ? '不限':(this.state.monData.takecareBabyMax<=10 ? '10个以下' : (this.state.monData.takecareBabyMax<=30 ?'11-30个':'31个以上' )) }    薪资:{(this.state.monData.costMax==null || this.state.monData.costMax==0) ? '不限' : '￥'+ this.state.monData.costMin + ' - ' + this.state.monData.costMax}</div>
						<hr/>
					</Card.Body>
					<Card.Footer  extra={<span>{this.state.monData.joinCount}人投递 {this.state.monData.viewCount}人浏览</span>} />
				</Card>
				{this.state.demandStatus==="3" &&
					<div className="status-mana">
						<span className="status-btn"></span>
						<Button size="small" type="primary" disabled className="status-btn">已结束</Button>
					</div>}
				{this.state.demandStatus==="1" &&
					<div className="status-mana">
						<Button size="small" type="primary" className="status-btn" onClick={()=>this.stopReq("2")}>暂停</Button>
						<Button size="small" type="primary" className="status-btn" onClick={()=>this.stopReq("3")} >结束</Button> 
					</div>}
				{this.state.demandStatus==="2" &&
					<div className="status-mana">
						<Button size="small" type="primary" className="status-btn" onClick={()=>this.stopReq("1")}>恢复</Button>
						<Button size="small" type="primary" className="status-btn" onClick={()=>this.stopReq("3")}>结束</Button> 
					</div>}

				<div className="apply-bar">全部应聘</div>
					{MoonList}
				</div>
			</section>
		  )}
		  

}

// export default RequItem;

class MoonItem extends React.Component{
	constructor(props){
		super(props);
		this.state={
		}
	}
	render(){

		let data={demandId: this.props.applies, moonId: this.props.moonId}
		const path={
			pathname : "/mycenter/RequirementList/requitem/interview",
			state: data,
		}
		return (
			<div style={{display: "flex",position: "relative", backgroundColor: "#fff", with:" 100%", height: "1.5rem", padding: "0.2rem 0px"}}>
				<img className="avatar" style={{ width: '1.28rem', height: '1.28rem', borderRadius: "50%", margin: '0 .3rem' }} src={this.props.headurl} alt="" />
				<div style={{ lineHeight: 1, padding: ".3rem 0" }}>
					<div className="name" style={{ fontSize: 18 }}>{this.props.name}</div>
					<div className="info" style={{ color: '#888', fontSize: 14, marginTop: ".1rem" }}>{this.props.cityName}人 带过{this.props.takecareBabies}个宝宝</div>
				</div>
				{this.props.demandStatus==="1" || this.props.demandStatus==="2" || this.props.demandStatus==="3" &&
					<div>
						<Button  onClick={() => this.props.history.push(path)} type="primary" size="small" style={{position: "absolute", right: ".3rem", top: ".2rem", backgroundColor: "#ffda44",borderRadius: "20px"}}>邀请面试</Button>
						<a href={`tel:${this.props.telphone}`}  style={{display: "block", position: "absolute", right: ".3rem", top: "1rem", backgroundColor: "#ffda44",borderRadius: "20px", fontSize: "13px", height: "30px",lineHeight: "30px",padding: "0 15px"}}>马上联系</a>
					</div>
				}
				{/* {this.props.demandStatus==="2" || this.props.demandStatus==="3" &&
					<div>
						<Button size="small" type="primary" disabled style={{position: "absolute", right: ".3rem", top: ".2rem", backgroundColor: "#ffda44",borderRadius: "20px"}}>邀请面试</Button>
						<Button Button size="small" type="primary" disabled style={{position: "absolute", right: ".3rem", top: "1rem", backgroundColor: "#ffda44",borderRadius: "20px"}}>马上联系</Button>
					</div>
				} */}
			</div>
		)
	}
}




class RequItemRoute extends React.Component {
	constructor (props) {
		super(props);
	}

	render() {
		let enterClassName = this.props.history.action=="POP"?"slide-out":"slide-in";
		return (
		<TransitionGroup component={null}>
			<CSSTransition key={this.props.location.key} classNames={{
				appear: enterClassName + '-appear',
				appearActive: enterClassName + '-appear-active',
				enter: enterClassName + '-enter',
				enterActive: enterClassName + '-enter-active',
				enterDone: enterClassName + '-enter-done',
				exit: 'page-exit',
				exitActive: 'page-exit-active',
				exitDone: 'page-exit-done',
			}} timeout={300}>
				<Switch location={this.props.location}>
					<PrivateRoute exact path='/mycenter/requirementlist/requitem/:id' component={RequItem} />
					<PrivateRoute exact path='/mycenter/requirementlist/requitem/interview' component={Interview} />
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default RequItemRoute