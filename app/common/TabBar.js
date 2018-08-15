import React from "react"
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
				this.state.noContainer ? { position: 'absolute', width: '100%', bottom: 0 ,backgroundColor:'#ffda44'} : { position: 'absolute', height: '100%', width: '100%', top: 0 } )
				: { height: 400 }}>
			<TabBar 
			  unselectedTintColor="#000"
			  tintColor="white"
			  barTintColor="#ffda44"
			  hidden={this.state.hidden}
			  noRenderContent="true"
			>
			  <TabBar.Item
				title="首页"
				key="Home"
				icon={<div style={{
				  width: '22px',
				  height: '22px',
				  background: 'url('+require('../images/home/nav_home.png') +')center center /  21px 21px no-repeat' }}
				/>
				}
				selectedIcon={<div style={{
				  width: '22px',
				  height: '22px',
				  background: 'url('+require('../images/home/nav_home1.png') +')center center /  21px 21px no-repeat' }}
				/>
				}
				selected={this.state.selectedTab === '/' || this.state.selectedTab === '/home'}
				onPress={() => {
				  this.setState({
					selectedTab: '/',
				  });
				  this.props.history.push("/", {transition: "none"})
				}}
				data-seed="logId"
			  ></TabBar.Item>
			  <TabBar.Item
				icon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_huandan.png') +')center center /  21px 21px no-repeat' }}
				  />
				}
				selectedIcon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_huandan.png') +')center center /  21px 21px no-repeat' }}
				  />
				}
				title="黄疸"
				key="Jaundice"
				selected={this.state.selectedTab === '/jaundice'}
				onPress={() => {
				  this.setState({
					selectedTab: '/jaundice',
				  });
				  this.props.history.push("/jaundice", {transition: "none"})
				}}
				data-seed="logId1"
			  ></TabBar.Item>
			  <TabBar.Item
				icon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_circle.png') +')center center /  21px 21px no-repeat' }}
				  />
				}
				selectedIcon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_circle1.png') +')center center /  21px 21px no-repeat' }}
				  />
				}
				title="圈子"
				key="BBS"
				selected={this.state.selectedTab === '/bbs'}
				onPress={() => {
				  this.setState({
					selectedTab: '/bbs',
				  });
				  this.props.history.push("/bbs", {transition: "none"})
				}}
			  ></TabBar.Item>
			  <TabBar.Item
				icon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_school.png') +')center center /  21px 21px no-repeat' }}
				  />
				}
				selectedIcon={
				  <div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_school1.png') +')center center /  21px 21px no-repeat' }}
				  />
				}
				title="学堂"
				key="Learning"
				selected={this.state.selectedTab === '/learning'}
				onPress={() => {
				  this.setState({
					selectedTab: '/learning',
				  });
				  this.props.history.push("/learning", {transition: "none"})
				}}
			  ></TabBar.Item>
			  <TabBar.Item
				icon={<div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_me.png') +')center center /  21px 21px no-repeat' }}
				  />}
				selectedIcon={<div style={{
					width: '22px',
					height: '22px',
					background: 'url('+require('../images/home/nav_me1.png') +')center center /  21px 21px no-repeat' }}
				  />}

				title="我"
				key="my"
				selected={this.state.selectedTab === '/mycenter'}
				onPress={() => {
				  this.setState({
					selectedTab: '/mycenter',
				  });
				  this.props.history.push("mycenter", {transition: "none"});
				}}
			  ></TabBar.Item>
			</TabBar>
		  </nav>
		);
	  }
}

export default withRouter(Tabbar);