import React from 'react'
import { Link, Switch, Route, withRouter } from 'react-router-dom'
import PrivateRoute from '@common/PrivateRoute'
import overscroll from '@common/overscroll'
import NoMatch from '@pages/NoMatch'
import Tabbar from '@common/TabBar'
import RequirementList from '@pages/requirement/RequirementList'
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

const HomeRouter = () => (
	<Switch>
		<Route exact path='/' component={Home} />
		<Route exact path='/home' component={Home} />
		<PrivateRoute path='/home/requirement' component={RequirementList} />
		<Route component={NoMatch} />
	</Switch>
)

export default HomeRouter