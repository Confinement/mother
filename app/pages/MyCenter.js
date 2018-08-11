import "@css/myCenter.css"
import React from 'react'
import { Link, Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import { List, Radio, Flex, WhiteSpace, WingBlank, DatePicker, NavBar, Icon } from 'antd-mobile';
import NoMatch from '@pages/NoMatch'
import Tabbar from '@common/TabBar'


const MyCenter = () => {
  return (
	<div className='page'>

		<div className="infor">
			<div className="attar"></div>
			<div className="name">XXX</div>
			<button className="update-btn">XXX</button>
		</div>
		<div className="pay-btn">

		</div>
		{/* <div className="wallet ">

		</div> */}
		<List className="my-list">
			<Link to="/mycenter/re"><List.Item
				arrow="horizontal"
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				multipleLine
				onClick={() => {}}
			>我的钱包<List.Item.Brief>subtitle</List.Item.Brief>
			</List.Item></Link>
			<Link to="/mycenter/re"><List.Item
				arrow="horizontal"
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				multipleLine
				onClick={() => {}}
			>我的需求<List.Item.Brief>subtitle</List.Item.Brief>
			</List.Item></Link>
			<Link to="/mycenter/re"><List.Item
				arrow="horizontal"
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				multipleLine
				onClick={() => {}}
			>我的面试<List.Item.Brief>subtitle</List.Item.Brief>
			</List.Item></Link>
			<Link to="/mycenter/re"><List.Item
				arrow="horizontal"
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				multipleLine
				onClick={() => {}}
			>收藏月嫂<List.Item.Brief>subtitle</List.Item.Brief>
			</List.Item></Link>
			<Link to="/mycenter/re"><List.Item
				arrow="horizontal"
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				multipleLine
				onClick={() => {}}
			>我的课堂<List.Item.Brief>subtitle</List.Item.Brief>
			</List.Item></Link>
			<Link to="/mycenter/re"><List.Item
				arrow="horizontal"
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				multipleLine
				onClick={() => {}}
			>我的优惠券<List.Item.Brief>subtitle</List.Item.Brief>
			</List.Item></Link>
			<Link to="/mycenter/re"><List.Item
				arrow="horizontal"
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				multipleLine
				onClick={() => {}}
			>设置<List.Item.Brief>subtitle</List.Item.Brief>
			</List.Item></Link>
		</List>

	  	<Tabbar />
	</div>
  )
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
					<Route exact path='/mycenter' component={MyCenter} />
					<PrivateRoute path='/mycenter/requirements' component={MyCenter} />
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default withRouter(MyRouter)