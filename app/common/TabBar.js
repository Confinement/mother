import React from "react"
import 'antd-mobile/dist/antd-mobile.css'
import {TabBar} from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class Nav extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		  selectedTab: 'redTab',
		  hidden: false,
			fullScreen: true,
			noContainer: true
		};
	  }
	
	  render() {
		return (
			<div style={this.state.fullScreen ? (
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
				title="Life"
				key="Life"
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
				selected={this.state.selectedTab === 'blueTab'}
				badge={1}
				onPress={() => {
				  this.setState({
					selectedTab: 'blueTab',
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
				title="Koubei"
				key="Koubei"
				badge={'new'}
				selected={this.state.selectedTab === 'redTab'}
				onPress={() => {
				  this.setState({
					selectedTab: 'redTab',
				  });
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
				title="Friend"
				key="Friend"
				dot
				selected={this.state.selectedTab === 'greenTab'}
				onPress={() => {
				  this.setState({
					selectedTab: 'greenTab',
				  });
				}}
			  ></TabBar.Item>
			  <TabBar.Item
				icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
				selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
				title="My"
				key="my"
				selected={this.state.selectedTab === 'yellowTab'}
				onPress={() => {
				  this.setState({
					selectedTab: 'yellowTab',
				  });
				  this.props.history.push("/mycenter");
				}}
			  ></TabBar.Item>
			</TabBar>
		  </div>
		);
	  }
}

export default withRouter(Nav);