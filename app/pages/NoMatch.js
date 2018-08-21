import React from 'react'
import { appStore } from '@common/config';
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
      <div style={{marginTop: 100, textAlign: "center", fontSize: 18, color: "#ccc"}}>下载APP获得更多功能</div>
      <iframe src={appStore} width={0} height={0} frameBorder={0}></iframe>
    </section>
  )
}
