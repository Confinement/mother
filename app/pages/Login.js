import "../css/login.css"
import React from "react";
import { platform, version,token } from '../../js/config';

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state({
			phValue:'',
			pawdValue:'',
		})
  }
  发送验证码
  type：1.注册;2.登录;3.找回登录密码;4.微信绑定手机;5.找回支付密码;6.绑定手机;7.更改手机
  handleSendSms(event) {
    event.preventDefault();
    let data = {}
    data.Platform = platform;
    data.Version_Code = version;
    data.type = token;
    data.phone = this.state.babysValue.split("-")[1];

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
	render(){
		return (
			<div>
				<input type="text" className="login-ph" placeholder="请输入手机号码"/>
				<input type="text" className="login-pawd"/><button>获取验证码</button>
				<p>未注册的手机号验证后自动创建月亮账号</p>
				<button>登录</button>
			</div>
		)
	}
}

export default Login;