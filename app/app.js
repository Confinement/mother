import "@css/antd-theme.less"
import "@css/common.css"
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import{ Router, Switch, Route} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import createBrowserHistory from "history/createBrowserHistory"
import Home from '@pages/Home'
import Jaundice from '@pages/Jaundice'
import BBS from '@pages/BBS'
import Learning from '@pages/Learning'
import MyCenter from '@pages/MyCenter'
import BabySitter from '@pages/requirement/BabySitter'
import Login from '@pages/Login'
import NoMatch from '@pages/NoMatch'


class AppRouter extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			enterClassName: 'none',
			timeout: 1
		}
	}

	render() {
		let enterClassName = this.props.history.action=="POP"?"slide-out":"slide-in";
		if (this.props.location.state && this.props.location.state.transition && this.props.history.action=="PUSH") {
			enterClassName = this.props.location.state.transition;
		}
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
					<Route path='/home' component={Home} />
					<Route path='/jaundice' component={Jaundice} />
					<Route path='/bbs' component={BBS} />
					<Route path='/learning' component={Learning} />
					<Route path='/mycenter' component={MyCenter} />
					<Route path='/babysitter' component={BabySitter} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/' component={Home} />
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

const App=() =>(
	<Router history={createBrowserHistory()}>
		<Switch>
			<Route component={AppRouter} />
		</Switch>
	</Router>
)

ReactDOM.render(<App/>, document.getElementById('root'))
