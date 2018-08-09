
import React from 'react'
import { Link, Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import Tabbar from '@common/TabBar'
import PostRe from '@pages/requirement/PostRe'
import "@css/common.css"
import "@css/home.css"

const Home = () => (
	<section className='page'>
		<div className="page-container">
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
		</div>
		<Tabbar />
	</section>
)

let popState = false;
window.onpopstate=function(event){ 
	popState = true;
}

class HomeRouter extends React.Component {
	constructor (props) {
		super(props);
	}

	render() {
		return (
		<TransitionGroup component={null}>
			<CSSTransition key={this.props.location.key} classNames={this.props.history.action=="POP"?"slide-out":"slide-in"} timeout={300}>
				<Switch location={this.props.location}>
		
					<Route exact path='/' component={Home} />
					<Route exact path='/home' component={Home} />
					<PrivateRoute path='/home/requirement' component={PostRe} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default withRouter(HomeRouter)