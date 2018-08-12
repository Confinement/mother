import "@css/antd-theme.less"
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import{ Router, Switch, Route} from 'react-router-dom'
import createBrowserHistory from "history/createBrowserHistory"
import Home from '@pages/Home'
import Jaundice from '@pages/Jaundice'
import BBS from '@pages/BBS'
import Learning from '@pages/Learning'
import MyCenter from '@pages/MyCenter'
import Login from '@pages/Login'
import NoMatch from '@pages/NoMatch'
import overscroll from '@common/overscroll'

const history = createBrowserHistory()
const App=() =>(
	<Router history={history}>
		<Switch>
			<Route path='/home' component={Home} />
			<Route path='/jaundice' component={Jaundice} />
			<Route path='/bbs' component={BBS} />
			<Route path='/learning' component={Learning} />
			<Route path='/mycenter' component={MyCenter} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/' component={Home} />
			<Route component={NoMatch} />
		</Switch>
	</Router>
)

ReactDOM.render(<App/>, document.getElementById('root'))

overscroll(document.getElementById('root'))
