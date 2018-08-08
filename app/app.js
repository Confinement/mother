import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import{ BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import MyCenter from './pages/MyCenter'

const App=() =>(
	<BrowserRouter>
		<Switch>
			<Route path='/home' component={Home} />
			<Route exact path='/mycenter' component={MyCenter} />
			<Route component={Home} />
		</Switch>
	</BrowserRouter>
)


ReactDOM.render(<App/>, document.getElementById('root'))
