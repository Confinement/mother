import "@css/myCenter.css"
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '@common/PrivateRoute'
import { List, Button, WhiteSpace, Grid } from 'antd-mobile';
import overscroll from '@common/overscroll'
import NoMatch from '@pages/NoMatch'
import Setting from '@pages/mycenter/Setting'
import Tabbar from '@common/TabBar'
import {fetchGet} from "@common/Fetch";
import Cookies from 'js-cookie';
import RequirementList from '@pages/requirement/RequirementList'
import Interview from '@pages/requirement/Interview'


class MyCenter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nickName: "",
			username: "昵称加载中...",
			stage: "...",
		}
		Cookies.get('token') &&
		fetchGet("api/user/getUserData", {Token: Cookies.get('token')}, true).then((data) => {
			this.setState({
				...data
			})
			!data.password && this.props.history.push("/mycenter/setting/setpwd")
		})
	}

	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
	}

	render() {
		return (
			<section className='page with-tabbar'>
				<div className="page-container">
					<div className="infor">
						{Cookies.get('token') ?
							<div className="logined" style={{ display: '-webkit-box', display: 'flex', padding: '.5rem 0' }}>
								<img className="avatar" style={{ width: '1.28rem', height: '1.28rem', borderRadius: "50%", margin: '0 .3rem' }} src={require('@images/mycenter/no_avatar.jpeg')} alt="" />
								<div style={{ lineHeight: 1, padding: ".3rem 0" }}>
									<div className="name" style={{  fontSize: 18 }}>{this.state.nickName || this.state.username}</div>
									<div className="info" style={{ color: '#888', fontSize: 14, marginTop: ".1rem" }}>人生阶段：{this.state.stage}</div>
								</div>
								{this.state.identity ?
								<Button onClick={() => this.props.history.push("/mycenter/userinfo")} type="primary" size="small" style={{position: "absolute", right: ".3rem", top: ".9rem", backgroundColor: "#fff"}}>个人信息</Button> :
								<Button onClick={() => this.props.history.push("/mycenter/identity")} type="primary" size="small" style={{position: "absolute", right: ".3rem", top: ".9rem", backgroundColor: "#fff"}}>未认证</Button>
								}
							</div>
						:
							<div className="nologin" style={{width: "2rem", margin: "0 auto", paddingTop: ".8rem"}}>
								<Button onClick={() => this.props.history.push("/login")} type="primary" style={{backgroundColor: "#fff"}}>登录</Button>
							</div>
						}
					</div>
					<Grid data={[{
							icon: require("../images/mycenter/payment_icon.png"),
							text: "待付款"
						}, {
							icon: require("../images/mycenter/received_icon.png"),
							text: "待发货"
						}, {
							icon: require("../images/mycenter/tobereceived_icon.png"),
							text: "待收货"
						}, {
							icon: require("../images/mycenter/completed_icon.png"),
							text: "已完成"
						}, {
							icon: require("../images/mycenter/allorder_icon.png"),
							text: "全部订单"
						}]}
						square={false}
						className="not-square-grid"
						columnNum={5}
						hasLine={false}
						onClick={(_el, index) => {
							switch (index) {
								case 0:
								this.props.history.push("/mycenter/orders/topay")
									break;
								case 1:
								this.props.history.push("/mycenter/orders/todepart")
									break;
								case 2:
								this.props.history.push("/mycenter/orders/toarrive")
									break;
								case 3:
								this.props.history.push("/mycenter/orders/done")
									break;
								case 4:
								this.props.history.push("/mycenter/orders")
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
							onClick={() => this.props.history.push("/mycenter/orders")}
						>服务订单
						</List.Item>
						{Cookies.get('token') &&
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
									<Button onClick={() => this.props.history.push("/mycenter/orders/order/0/cancel")} type="ghost" size="small" inline style={{ marginLeft: '10px' }}>取消订单</Button>
									<Button onClick={() => this.props.history.push("/mycenter/orders/order/0/pay")} type="primary" size="small" inline style={{ marginLeft: '10px' }}>立即支付</Button>
								</div>
							</div>
						}
					</List>
					<WhiteSpace />
					<List className="my-list">
						<List.Item
							arrow="horizontal"
							thumb={require("../images/mycenter/wallet_icon.png")}
							multipleLine
							onClick={() => this.props.history.push("/mycenter/wallet")}
						>我的钱包<List.Item.Brief>提供余额、银行卡、微信、支付宝绑定等金融服务</List.Item.Brief>
						</List.Item>
						<List.Item
							arrow="horizontal"
							thumb={require("../images/home/sister_icon.png")}
							multipleLine
							onClick={() => this.props.history.push("/mycenter/requirementlist")}
						>找月嫂<List.Item.Brief>我发布的护理需求</List.Item.Brief>
						</List.Item>
						<List.Item
							arrow="horizontal"
							thumb={require("../images/mycenter/interview_icon.png")}
							multipleLine
							extra={Cookies.get('token') && <span>今日 <i>0</i> | 明日 <i>0</i></span>}
							onClick={() => this.props.history.push("/mycenter/interviews")}
						>我的面试<List.Item.Brief>月嫂面试管理</List.Item.Brief>
						</List.Item>
						<List.Item
							arrow="horizontal"
							thumb={require("../images/mycenter/nurse_icon.png")}
							multipleLine
							onClick={() => this.props.history.push("/mycenter/favorates")}
						>收藏月嫂<List.Item.Brief>提供收藏的月嫂</List.Item.Brief>
						</List.Item>
						<List.Item
							arrow="horizontal"
							thumb={require("../images/mycenter/school_icon.png")}
							multipleLine
							onClick={() => this.props.history.push("/mycenter/mycoures")}
						>我的课堂<List.Item.Brief>提供报名过的课堂</List.Item.Brief>
						</List.Item>
						<List.Item
							arrow="horizontal"
							thumb={require("../images/mycenter/coupon_icon.png")}
							multipleLine
							onClick={() => this.props.history.push("/mycenter/discounts")}
						>我的优惠券<List.Item.Brief>提供平台发放的优惠券信息</List.Item.Brief>
						</List.Item>
						<List.Item
							arrow="horizontal"
							thumb={require("../images/mycenter/setup_icon.png")}
							multipleLine
							onClick={() => this.props.history.push("/mycenter/setting")}
						>设置<List.Item.Brief>提供登录密码设置、支付密码设置等功能</List.Item.Brief>
						</List.Item>
					</List>
				</div>
				<Tabbar />
			</section>
		)
	}
}

const MyRouter = () => (
	<Switch>
		<Route exact path='/mycenter' component={MyCenter} />
		<PrivateRoute path='/mycenter/requirementlist' component={RequirementList} />
		<PrivateRoute path='/mycenter/interview' component={Interview} />
		<Route path='/mycenter/setting' component={Setting} />
		<Route component={NoMatch} />
	</Switch>
)

export default MyRouter