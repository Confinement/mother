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
     <div className="banner"><img src={require('../images/home/1.png')} alt=""/></div>
     <div className="home-bnt">
        <div className="left-btn" >
          <img className="sister" src= {require('../images/home/sister_icon.png')} alt=""/>
          <span>找月嫂</span>
        </div>
        <div className="right-btn">
          <div className="btn bnt1"> 
            <img className="ness" src= {require('../images/home/ness_icon.png')} alt=""/>
            <span>生产必备</span>
          </div>
          <div className="btn bnt2">
            <img className="houser" src= {require('../images/home/houser_icon.png')} alt=""/>
            <span>健康月子房</span>
          </div>
          <div className="btn bnt3">
            <img className="server" src= {require('../images/home/server_icon.png')} alt=""/>
            <span>催乳服务</span>
          </div>
          <div className="btn bnt4">
            <img className="repair" src= {require('../images/home/repair_icon.png')} alt=""/>
            <span>产后康复</span>
          </div>
        </div>
        <div className="all-btn">全部服务</div>
     </div>
    </div>
  )
}
