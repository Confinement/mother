import React from 'react'
import {NavBar, Icon} from 'antd-mobile'


export default ({history}) => {
  return (
    <section className="page">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >功能未上线</NavBar>
      <div style={{marginTop: 200, textAlign: "center", fontSize: 24, color: "#ccc"}}>敬请期待</div>
      <div style={{marginTop: 20, textAlign: "center", fontSize: 18, color: "#ccc"}}>（提示下载APP页面）</div>
    </section>
  )
}
