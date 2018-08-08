import PropTypes from 'prop-types'
// import Header from '@common/Header'
import Footer from '@common/Footer'
import LeftNav from './LeftNav'
import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '@common/pages.css'
import Mobile from './Mobile/index'
import Enterprise from './Enterprise'

export default ({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="slide-in" timeout={300}>
          {/* <ReactCSSTransitionGroup
          component="div"
          className="react-container"
          transitionName="slide-in"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}> */}
              {/* <div key={location.pathname} className={location.pathname} style={{position:"absolute", width: "100%"}}> */}
              <div>
        <header>
          <nav>
            <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/products'>products</Link></li>
                    <li><Link to='/products/ep'>ep</Link></li>
                    <li><Link to='/products/mo'>mo</Link></li>
            </ul>
          </nav>
        </header>
        <Switch location={location}>
          <Route path="/products/ep" component={Enterprise}/>
              <Route path="/products/mo" component={Mobile}/>
              </Switch>
      </div>
              {/* </div> */}
          </CSSTransition>
        </TransitionGroup>

)