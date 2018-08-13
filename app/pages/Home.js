import React from 'react'
import { Link, Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import overscroll from '@common/overscroll'
import NoMatch from '@pages/NoMatch'
import Tabbar from '@common/TabBar'
import PostRe from '@pages/requirement/PostRe'
import "@css/common.css"
import "@css/home.css"

const Home = () => (
	<section className='page with-tabbar'>
		<div className="page-container">
			<div className="banner"><img src={require('../images/home/1.png')} alt="" /></div>
			<div className="home-bnt">
				<Link className="left-btn" to='/home/requirement'>
					<img className="sister" src={require('../images/home/sister_icon.png')} alt="" />
					<span>找月嫂</span>
				</Link>
				<div className="right-btn">
					<Link className="btn bnt1" to='/home/procreate'>
						<img className="ness" src={require('../images/home/ness_icon.png')} alt="" />
						<span>生产必备</span>
					</Link>
					<Link className="btn bnt2" to='/home/room'>
						<img className="houser" src={require('../images/home/houser_icon.png')} alt="" />
						<span>健康月子房</span>
					</Link>
					<Link className="btn bnt3" to='/home/prolactin'>
						<img className="server" src={require('../images/home/server_icon.png')} alt="" />
						<span>催乳服务</span>
					</Link>
					<Link className="btn bnt4" to='/home/recovery'>
						<img className="repair" src={require('../images/home/repair_icon.png')} alt="" />
						<span>产后康复</span>
					</Link>
				</div>
				<Link className="btn bnt4" to='/home/services'><div className="all-btn">全部服务</div></Link>
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
					<Route exact path='/' component={Home} />
					<Route exact path='/home' component={Home} />
					<PrivateRoute path='/home/requirement' component={PostRe} />
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default withRouter(HomeRouter)