import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import{ BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import MyCenter from './pages/MyCenter'
import Login from './pages/Login'

const NoMatch = Home;

const App=() =>(
	<BrowserRouter>
		<Switch>
			<Route path='/home' component={Home} />
			<Route path='/mycenter' component={MyCenter} />
			<Route exact path='/login' component={Login} />
			<Route path='/' component={Home} />
			<Route component={NoMatch} />
		</Switch>
	</BrowserRouter>
)


ReactDOM.render(<App/>, document.getElementById('root'))
