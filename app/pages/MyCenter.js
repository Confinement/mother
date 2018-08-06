import "../css/myCenter.css"
import React from 'react'
import { HashRouter, BrowserRouter, MemoryRouter, Route, Control } from 'react-keeper'


export default function MyCenter() {
  return (
    <div className='page'>
      {/* <div className='container-fluid'>
        <h1>AboutUs</h1>
      </div> */}
     <div className="infor">
	 	<div className="attar"></div>
		<div className="name">XXX</div>
		<btn className="update-btn">XXX</btn>
	 </div>
     <div className="home-bnt">
        <div className="left-btn">找月嫂</div>
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
