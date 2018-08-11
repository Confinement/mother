import "@css/myCenter.css"
import React from 'react'
import { Link, Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import NoMatch from '@pages/NoMatch'
import Tabbar from '@common/TabBar'


const MyCenter = () => {
  return (
    <div className='page'>

      <div className="infor">
        <div className="attar"></div>
        <div className="name">XXX</div>
        <button className="update-btn">XXX</button>
      </div>
      <div className="pay-btn">

      </div>
      <div className="wallet ">

      </div>

      <Tabbar />
    </div>
  )
}

class MyRouter extends React.Component {
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
					<Route exact path='/mycenter' component={MyCenter} />
					<PrivateRoute path='/mycenter/requirements' component={MyCenter} />
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default withRouter(MyRouter)