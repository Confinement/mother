import "@css/myCenter.css"
import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import { List, Button, WhiteSpace, WingBlank, Icon, Grid } from 'antd-mobile';
import NoMatch from '@pages/NoMatch'
import Tabbar from '@common/TabBar'
import {fetchGet} from "@common/Fetch";
import Cookies from 'js-cookie';
import RequirementList from '@pages/requirement/RequirementList'


class MyCenter extends React.Component {
	constructor(props) {
		super(props);
		fetchGet("api/user/getUserData", {Token: Cookies.get('token')}, true).then((data) => {
			console.log(data)
		})
	}

	render() {
		return (
			<div className='page with-tabbar'>

				<div className="infor">
						<div className="logined" style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
							<img className="avatar" style={{ width: '64px', height: '64px', borderRadius: "50%", margin: '0 15px' }} src="http://pic97.huitu.com/res/20170629/799232_20170629034947597040_1.jpg" alt="" />
							<div style={{ lineHeight: 1, padding: "15px 0" }}>
								<div className="name" style={{  fontSize: 18 }}>昵称</div>
								<div className="info" style={{ color: '#888', fontSize: 14, marginTop: 5 }}>...</div>
							</div>
							<Button onClick={() => this.props.history.push("/mycenter/re")} type="primary" size="small" style={{position: "absolute", right: 15, top: 35, backgroundColor: "#fff"}}>个人信息</Button>
						</div>
						<div className="nologin">
						</div>
				</div>
				<Grid data={[{
						icon: "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
						text: "待付款"
					}, {
						icon: "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
						text: "待发货"
					}, {
						icon: "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
						text: "待收货"
					}, {
						icon: "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
						text: "已完成"
					}, {
						icon: "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
						text: "全部订单"
					}]}
					square={false}
					className="not-square-grid"
					columnNum={5}
					hasLine={false}
					onClick={(_el, index) => {
						switch (index) {
							case 0:
							this.props.history.push("/mycenter/re")
								break;
							case 1:
							this.props.history.push("/mycenter/re")
								break;
							case 2:
							this.props.history.push("/mycenter/re")
								break;
							case 3:
							this.props.history.push("/mycenter/re")
								break;
							case 4:
							this.props.history.push("/mycenter/re")
								break;
						}
					}}
				/>
				<WhiteSpace />
				<List className="my-list">
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						extra="更多"
						onClick={() => this.props.history.push("/mycenter/re")}
					>服务订单
					</List.Item>
					<div style={{ padding: '0 15px' }}>
						<div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
							<img style={{ height: '64px', marginRight: '15px' }} src="http://pic97.huitu.com/res/20170629/799232_20170629034947597040_1.jpg" alt="" />
							<div style={{ lineHeight: 1 }}>
								<div style={{  fontSize: 18 }}>月嫂大礼包</div>
								<div style={{ color: '#888', fontSize: 14, marginTop: 5 }}>优质月嫂服务</div>
							</div>
						</div>
						<div
							style={{
								lineHeight: '50px',
								color: '#888',
								fontSize: 18,
								borderBottom: '1px solid #F6F6F6',
								textAlign: 'right'
							}}
						>
							<Button onClick={() => this.props.history.push("/mycenter/re")} type="ghost" size="small" inline style={{ marginLeft: '10px' }}>取消订单</Button>
							<Button onClick={() => this.props.history.push("/mycenter/re")} type="primary" size="small" inline style={{ marginLeft: '10px' }}>立即支付</Button>
						</div>
					</div>
				</List>
				<WhiteSpace />
				<List className="my-list">
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						multipleLine
						onClick={() => this.props.history.push("/mycenter/re")}
					>我的钱包<List.Item.Brief>提供余额、银行卡、微信、支付宝绑定等金融服务</List.Item.Brief>
					</List.Item>
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						multipleLine
						onClick={() => this.props.history.push("/mycenter/requirementlist")}
					>护理需求<List.Item.Brief>我发起的护理需求</List.Item.Brief>
					</List.Item>
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						multipleLine
						extra={<span>今日 <i>0</i> | 明日 <i>1</i></span>}
						onClick={() => this.props.history.push("/mycenter/re")}
					>我的面试<List.Item.Brief>月嫂面试管理</List.Item.Brief>
					</List.Item>
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						multipleLine
						onClick={() => this.props.history.push("/mycenter/re")}
					>收藏月嫂<List.Item.Brief>提供收藏的月嫂</List.Item.Brief>
					</List.Item>
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						multipleLine
						onClick={() => this.props.history.push("/mycenter/re")}
					>我的课堂<List.Item.Brief>提供报名过的课堂</List.Item.Brief>
					</List.Item>
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						multipleLine
						onClick={() => this.props.history.push("/mycenter/re")}
					>我的优惠券<List.Item.Brief>提供平台发放的优惠券信息</List.Item.Brief>
					</List.Item>
					<List.Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						multipleLine
						onClick={() => this.props.history.push("/mycenter/re")}
					>设置<List.Item.Brief>提供登录密码设置、支付密码设置等功能</List.Item.Brief>
					</List.Item>
				</List>

				<Tabbar />
			</div>
		)
	}
}

class MyRouter extends React.Component {
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
					<Route exact path='/mycenter' component={withRouter(MyCenter)} />
					<PrivateRoute path='/mycenter/requirementlist' component={RequirementList} />
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default withRouter(MyRouter)