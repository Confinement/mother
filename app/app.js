import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import{ BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import MyCenter from './pages/MyCenter'

const App=() =>(
	<BrowserRouter>
		<Switch>
			<Route path='/' component={Home} />
			<Route path='/mycenter' component={MyCenter} />
		</Switch>
	</BrowserRouter>
)


ReactDOM.render(<App/>, document.getElementById('root'))
