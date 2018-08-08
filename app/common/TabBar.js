import React from "react"
import 'antd-mobile/dist/antd-mobile.css'
import {TabBar} from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class Tabbar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		  selectedTab: this.props.location.pathname,
		  hidden: false,
			fullScreen: true,
			noContainer: true
		};
	  }
	
	  render() {
		return (
			<nav style={this.state.fullScreen ? (
				this.state.noContainer ? { position: 'absolute', width: '100%', bottom: 0 ,backgroundColor:'#ffda44'} : { position: 'fixed', height: '100%', width: '100%', top: 0 } )
				: { height: 400 }}>
			<TabBar 
			  unselectedTintColor="#949494"
			  tintColor="#33A3F4"
			  barTintColor="white"
			  hidden={this.state.hidden}
			  noRenderContent="true"
			>
			  <TabBar.Item
				title="首页"
				key="Home"
				icon={<div style={{
				  width: '22px',
				  height: '22px',
				  background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
				/>
				}
				selectedIcon={<div style={{
				  width: '22px',
				  height: '22px',
				  background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
				/>
				}
				selected={this.state.selectedTab === '/'}
				badge={1}
				onPress={() => {
				  this.setState({
					selectedTab: '/',
				  });
				  this.props.history.push("/")
				}}
				data-seed="logId"
			  ></TabBar.Item>
			  <TabBar.Item
				icon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
				  />
				}
				selectedIcon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
				  />
				}
				title="黄疸"
				key="Jaundice"
				badge={'new'}
				selected={this.state.selectedTab === '/jaundice'}
				onPress={() => {
				  this.setState({
					selectedTab: '/jaundice',
				  });
				  this.props.history.push("/jaundice")
				}}
				data-seed="logId1"
			  ></TabBar.Item>
			  <TabBar.Item
				icon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
				  />
				}
				selectedIcon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
				  />
				}
				title="圈子"
				key="BBS"
				dot
				selected={this.state.selectedTab === '/bbs'}
				onPress={() => {
				  this.setState({
					selectedTab: '/bbs',
				  });
				  this.props.history.push("/bbs")
				}}
			  ></TabBar.Item>
			  <TabBar.Item
				icon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
				  />
				}
				selectedIcon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
				  />
				}
				title="学堂"
				key="Learning"
				dot
				selected={this.state.selectedTab === '/learning'}
				onPress={() => {
				  this.setState({
					selectedTab: '/learning',
				  });
				  this.props.history.push("/learning")
				}}
			  ></TabBar.Item>
			  <TabBar.Item
				icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
				selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
				title="我的"
				key="my"
				selected={this.state.selectedTab === '/mycenter'}
				onPress={() => {
				  this.setState({
					selectedTab: '/mycenter',
				  });
				  this.props.history.push("/mycenter");
				}}
			  ></TabBar.Item>
			</TabBar>
		  </nav>
		);
	  }
}

export default withRouter(Tabbar);