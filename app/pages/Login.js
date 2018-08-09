import "../css/login.css"
import React from "react";
import { platform, version,token } from '../../js/config';

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state({
			phValue:'',
			pawValue:'',
		})
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

    let url = 'http://api.topyuezi.cn/pretty-api/api/sys/sendSms';
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
    }).then(response => response.json()).then(function (res) {
      console.log(res)
      if (res.code === "10000") {
      } else {
        alert(res.desc)
      }
    });
  }

  handleLogin(event,type) {
    event.preventDefault();
    let data = {}
    data.Platform = platform;
    data.Version_Code = version;
    data.type = token;
    data.phone = this.state.phValue;
    data.password = this.state.pawValue;

    let url = 'http://api.topyuezi.cn/pretty-api/api/user/login';
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
    }).then(response => response.json()).then(function (res) {
      console.log(res)
      if (res.code === "10000") {
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

    let url = 'http://api.topyuezi.cn/pretty-api/api/user/register';
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
    }).then(response => response.json()).then(function (res) {
      console.log(res)
      if (res.code === "10000") {
      } else {
        alert(res.desc)
      }
    });
  }
	render(){
		return (
			<div>
				<input type="text" className="login-ph" placeholder="请输入手机号码" onChange={this.aw.bind(this)} value={this.state.phValue}/>
				<input type="text" className="login-pawd" onChange={this.pawChange.bind(this)} value={this.state.pawValue}/><button onClick={this.handleSendSms.bind(this)}>获取验证码</button>
				<p>未注册的手机号验证后自动创建月亮账号</p>
				<button >登录</button>
			</div>
		)
	}
}

export default Login;