
import React from "react"
import ReactDOM from "react-dom"
// import AppCompent from "./AppCompent"
import 'antd/dist/antd.css';
import {Tag} from 'antd'



const App = ()=> {
	return (
	  <HashRouter>
		<div>
		  <Route cache component={ Home } path="/"/>
		  <Route component={ Products } path="/products"/>
		</div>
	  </HashRouter>
	)
  }
  
  const Products = ()=> {
	return (
	  <div>
		<Route component={ ScienceProducts } path="/sci" />
		<Route component={ DailiUseProducts } path="/dai" />
	  </div>
	)
  }
  
  ReactDOM.render(<App/>, document.getElementById('root'))