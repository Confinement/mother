import "../css/about.css"
import React from 'react'
import { HashRouter, BrowserRouter, MemoryRouter, Route, Control } from 'react-keeper'
import AppCompent from '../js/AppCompent';

export default function AboutUs() {
 

  return (
    <div className='page'>
      {/* <div className='container-fluid'>
        <h1>AboutUs</h1>
      </div> */}
     <div className="banner"><img src="../images/2017/1.jpg" alt=""/></div>
     <div className="home-bnt">
        <div className="left-btn" >找月嫂</div>
        <div className="right-btn">
          <div className="btn bnt1">bnt1</div>
          <div className="btn bnt2">bnt1</div>
          <div className="btn bnt3">bnt1</div>
          <div className="btn bnt4">bnt1</div>
        </div>
     </div>
    </div>
  )
}
