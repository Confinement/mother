import "@css/myCenter.css"
import React from 'react'
import Tabbar from '@common/TabBar'


export default function MyCenter() {
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
