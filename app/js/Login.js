
import React from "react";

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state({
			phValue:'',
			pawdValue:'',
		})
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