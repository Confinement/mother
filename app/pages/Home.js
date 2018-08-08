
import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Tabbar from '@common/TabBar'
import PostRe from './requirement/PostRe'
import "@common/com.css"
import "../css/about.css"

const Home = () => (
	<div className='page'>
		<div className="banner"><img src={require('../images/home/1.png')} alt="" /></div>
		<div className="home-bnt">
			<Link className="left-btn" to='/home/requirement' >
				<img className="sister" src={require('../images/home/sister_icon.png')} alt="" />
				<span>找月嫂</span>
			</Link>
			<div className="right-btn">
				<div className="btn bnt1">
					<img className="ness" src={require('../images/home/ness_icon.png')} alt="" />
					<span>生产必备</span>
				</div>
				<div className="btn bnt2">
					<img className="houser" src={require('../images/home/houser_icon.png')} alt="" />
					<span>健康月子房</span>
				</div>
				<div className="btn bnt3">
					<img className="server" src={require('../images/home/server_icon.png')} alt="" />
					<span>催乳服务</span>
				</div>
				<div className="btn bnt4">
					<img className="repair" src={require('../images/home/repair_icon.png')} alt="" />
					<span>产后康复</span>
				</div>
			</div>
			<div className="all-btn">全部服务</div>
		</div>
		<Tabbar />
	</div>
)

const HomeRouter = ({ location }) => (
	<TransitionGroup component={null}>
		<CSSTransition key={location.key} classNames="slide-in" timeout={300}>
			<Switch location={location}>
				<Route exact path='/' component={Home} />
				<Route exact path='/home' component={Home} />
				<Route path='/home/requirement' component={PostRe} />
			</Switch>
		</CSSTransition>
	</TransitionGroup>
)

export default HomeRouter