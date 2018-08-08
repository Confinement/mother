import React from 'react'
import { Link } from 'react-router'

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// import  "./Container.css";

// export default React.createClass({
//   render() {
//     return (
//       <ReactCSSTransitionGroup
//         transitionName="transitionWrapper"
//         component="div"
//         className={style.transitionWrapper}
//         transitionEnterTimeout={300}
//         transitionLeaveTimeout={300}>
//         <div key={this.props.pathname}
//              style={{position:"absolute", width: "100%"}}>
//           {
//             this.props.children
//           }
//         </div>
//       </ReactCSSTransitionGroup>
//       // <div>
//       //   <h1>React Router Tutorial</h1>
//       //   <ul role="nav">
//       //     <li><Link to="/about">About</Link></li>
//       //     <li><Link to="/repos">Repos</Link></li>
//       //   </ul>
//       //   {this.props.children}
//       // </div>
//     )
//   }
// })

class Layout extends React.Component {
  render () {
    console.log(this.props);
    
      return (
          <ReactCSSTransitionGroup
          component="div"
          className="react-container"
          transitionName="slide-in"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
              <div key={this.props.location.pathname} className={this.props.location.pathname} style={{position:"absolute", width: "100%"}}>
              <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
        {this.props.children}
      </div>
              </div>
          </ReactCSSTransitionGroup>
      )
  }
}
export default Layout