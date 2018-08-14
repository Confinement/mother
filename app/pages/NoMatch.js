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
    </section>
  )
}
