import 'antd-mobile/dist/antd-mobile.css'
import "@css/login.css"
import React from "react";
import { withRouter } from 'react-router-dom'
import { platform, version } from '@common/config';
import Cookies from 'js-cookie';
import {Tabs, NavBar, Icon} from 'antd-mobile'

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state={
			phValue:'',
			pawValue:'',
			telError:'',
			passwordError:'',
			method:1
		}
	}
	phChange = (event) => {
		this.setState({
			phValue: event.target.value,
		});
	}
	pawChange = (event) => {
		this.setState({
			pawValue: event.target.value,
		});
	}
	//手机号判断
	telCheck(event){
		this.tel=event.target.value
		console.log(this.tel)
		var reg=/^1[34578]\d{9}$/;
		if(reg.test(this.tel)==false){
				this.setState({
					 telError:"请输入正确的手机号"
				})
		}else{
				this.setState({
						telError:""
				})
		}

	}
	//密码判断
	passwordCheck(event){
			this.password=event.target.value
			var reg=/^\w{6,20}$/;
			if(reg.test(this.password)==false){
					this.setState({
							passwordError:"密码为6-20位数字或字母或下划线!"
					})
			}else{
					this.setState({
							passwordError:""
					})
					}

	}
	// 改变dom
	loginpawd(page){
		this.setState({method:page})
	}

	/**
		发送验证码
		Platform:1.月嫂-Android;2.月嫂-Ios;3.妈妈-Android;4.妈妈-Ios;5.月嫂-微信小程序;
		type：1.注册;2.登录;3.找回登录密码;4.微信绑定手机;5.找回支付密码;6.绑定手机;7.更改手机
	**/

	handleSendSms(event,typeCode) {
		event.preventDefault();
		let data = {}
		data.Platform = platform;
		data.Version_Code = version;
		data.type = typeCode;
		data.phone = this.state.phValue;

		let url = 'http://47.96.103.86:8080/pretty-api/api/sys/sendSms';
		fetch(url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
		}).then(response => response.json()).then(function (res) {
			console.log(res)
			if (res.code === "100000") {
			} else {
				alert(res.desc)
			}
		});
	}

	handleLogin(event) {
		event.preventDefault();
		let data = {}
		data.Platform = platform;
		data.Version_Code = version;
		data.phone = this.state.phValue;
		data.code = this.state.pawValue;
		// data.password = this.state.pawValue;

		let url = 'http://47.96.103.86:8080/pretty-api/api/user/login';
		fetch(url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
		}).then(response => response.json()).then((res) => {
			console.log(res)
			if (res.code === "100000") {
				Cookies.set("phone",res.content.phone);
				Cookies.set("token",res.content.token);
				Cookies.set("userId",res.content.userId);
				let jumpURL = this.props.location.state&&this.props.location.state.from ? this.props.location.state.from.pathname : "/";
				this.props.history.push(jumpURL);
			} else {
				alert(res.desc)
			}
		});
	}
 /**
		注册
		type：1.月嫂;2.妈妈)
	**/
	handleRegister(event,typeCode) {
		event.preventDefault();
		let data = {}
		data.Platform = platform;
		data.Version_Code = version;
		data.type = typeCode;
		data.phone = this.state.phValue;
		data.password = this.state.pawValue;

		let url = 'http://47.96.103.86:8080/pretty-api/api/user/register';
		fetch(url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
		}).then(response => response.json()).then(function (res) {
			console.log(res)
			if (res.code === "100000") {
			} else {
				alert(res.desc)
			}
		});
	}
	render(){
		return (
			<section className="page login">
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>登录</NavBar>
				<div className="logo"></div>
				<Tabs tabs={[
						{title:1},
						{title:2}
					]}
					page={this.state.method}
					renderTabBar={false}
					onChange={(tab, index) => { console.log('onChange', index, tab); }}
				>
					<div>
						<div className="login-item login-ph">
							<input type="text" className="ph" placeholder="手机号" onChange={this.phChange.bind(this)} value={this.state.phValue} onBlur={(event) => this.telCheck(event)} />
							<span className="ph-tips">{this.state.telError}</span>
						</div>
						<div className="login-item login-pawd">
							<input type="text" className="pawd" placeholder="密码" onChange={this.pawChange.bind(this)} value={this.state.pawValue} />
						</div>
					</div>
					<div>
						<div className="login-item login-ph">
							<input type="text" className="ph" placeholder="手机号" onChange={this.phChange.bind(this)} value={this.state.phValue} onBlur={(event) => this.telCheck(event)} />
							<span className="ph-tips">{this.state.telError}</span>
						</div>
						<div className="login-item login-pawd">
							<input type="text" className="pawd" placeholder="验证码" onChange={this.pawChange.bind(this)} value={this.state.pawValue} />
							<button className="sms-btn" onClick={(event) => this.handleSendSms(event, 2)}>获取验证码</button>
						</div>
					</div>
				</Tabs>
				<button className="login-btn" onClick={(event) => this.handleLogin(event, 1)}>登录</button>
				<div className="other">
					<input type="checkBox" className="" />协议
					{this.state.method === 0 ?
						<span className="other-way" onClick={() => this.loginpawd(1)}>验证码登录</span>
					:
						<span className="other-way" onClick={() => this.loginpawd(0)}>密码登录</span>
					}
					
				</div>
			</section>
		)
	}
}

export default withRouter(Login);