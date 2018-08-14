import "@css/login.css"
import React from "react";
import { fetchPost } from "@common/Fetch";
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Tabs, NavBar, Icon } from 'antd-mobile';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phValue: '',
      pawValue: '',
      smsValue:'',
      telError: '',
      passwordError: '',
      method: 0,
      dealCkeck:true,
      isLook:true,
      isGoing:true,
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
  smsChange = (event) => {
    this.setState({
      smsValue: event.target.value,
    });
  }
  //手机号判断
  telCheck(event) {
    this.tel = event.target.value
    if(this.tel==""){
      return false;
    }
    console.log(this.tel)
    var reg = /^1[34578]\d{9}$/;
    if (reg.test(this.tel) == false) {
      this.setState({
        telError: "请输入正确的手机号"
      })
    } else {
      this.setState({
        telError: ""
      })
    }

  }
  //密码判断
  passwordCheck(event) {
    this.password = event.target.value
    if(this.password==""){
      return false;
    }
    var reg = /^\w{6,20}$/;
    if (reg.test(this.password) == false) {
      this.setState({
        passwordError: "密码为6-20位数字或字母或下划线!"
      })
    } else {
      this.setState({
        passwordError: ""
      })
    }

  }
  // 改变dom
  loginpawd(page) {
    this.setState({ method: page })
  }
  // 明密文转换
  isLookpwd(){
    // this.state.isLook ? this.setState({ pawValue: this.state.pawValue}) :this.setState({ pawValue: this.state.pawValue });
    this.setState({ isLook: !this.state.isLook })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      isGoing: value
    });
  }
	/**
		发送验证码
		Platform:1.月嫂-Android;2.月嫂-Ios;3.妈妈-Android;4.妈妈-Ios;5.月嫂-微信小程序;
		type：1.注册;2.登录;3.找回登录密码;4.微信绑定手机;5.找回支付密码;6.绑定手机;7.更改手机
	**/

  handleSendSms(event, typeCode) {
    event.preventDefault();
    let data = {}
    data.type = typeCode;
    data.phone = this.state.phValue;
    
    fetchPost("api/sys/sendSms", data, false).then(({content}) => {
      document.querySelector(".sms-btn").innerHTML="已发送";
      setTimeout(()=>{
        document.querySelector(".sms-btn").innerHTML="获取验证码";
      },30000)
    })
  }

  handleLogin(event) {
    event.preventDefault();
    let data = {}
    data.phone = this.state.phValue;
    this.state.method ? data.code = this.state.smsValue : data.password = this.state.pawValue;
    if(!this.state.isGoing ){
      alert("请同意用户协议及隐私政策！");
      return false;
    }
    
    fetchPost("api/user/login", data, false).then((content) => {
      let expires = (content.expiresTime - new Date().getTime()) / 1000 / 3600 / 24;
      Cookies.set("phone", content.phone, {expires});
      Cookies.set("token", content.token, {expires});
      Cookies.set("userId", content.userId, {expires});
      let jumpURL = this.props.location.state && this.props.location.state.from ? this.props.location.state.from.pathname : "/mycenter";
      this.props.history.replace(jumpURL);
    })
  }
  /**
     注册
     type：1.月嫂;2.妈妈)
   **/
  // handleRegister(event, typeCode) {
  //   event.preventDefault();
  //   let data = {}
  //   data.Platform = platform;
  //   data.Version_Code = version;
  //   data.type = typeCode;
  //   data.phone = this.state.phValue;
  //   data.password = this.state.pawValue;

  //   let url = preUrl+'/api/user/register';
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
  //   }).then(response => response.json()).then(function (res) {
  //     console.log(res)
  //     if (res.code === "100000") {
  //     } else {
  //       alert(res.desc)
  //     }
  //   });
  // }
  render() {
    return (
      <section className="page login">
      	{this.state.method === 0 ?
             <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>密码登录</NavBar>
            :
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>注册登录</NavBar>
          }
        <div className="logo"><img src={require('../images/login/logo.png')} alt=""/></div>
        <Tabs tabs={[
          { title: 1 },
          { title: 2 }
        ]}
          page={this.state.method}
          renderTabBar={false}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
        >
          <div className="pwd"> 
            <div className="login-item login-ph">
              <input type="text" className="ph" placeholder="手机号" onChange={this.phChange.bind(this)} value={this.state.phValue} onBlur={(event) => this.telCheck(event)} />
              <span className="ph-tips">{this.state.telError}</span>
            </div>
            <hr style={{width:'90%'}}/>
            <div className="login-item login-pawd">
              <input type="password" className="pawd" placeholder="密码" onChange={this.pawChange.bind(this)} value={this.state.pawValue} />
              <button className="islook" onClick={this.isLookpwd.bind(this)}>kk</button>
            </div>
            <hr style={{width:'90%'}}/>
          </div>
          <div className="sms">
            <div className="login-item login-ph">
              <input type="text" className="ph" placeholder="手机号" onChange={this.phChange.bind(this)} value={this.state.phValue} onBlur={(event) => this.telCheck(event)} />
              <span className="ph-tips">{this.state.telError}</span>
            </div>
            <hr style={{width:'90%'}}/>
            <div className="login-item login-pawd">
              <input type="text" className="pawd" placeholder="验证码" onChange={this.smsChange.bind(this)} value={this.state.smsValue} />
              <button className="sms-btn" onClick={(event) => this.handleSendSms(event, 2)}>获取验证码</button>
            </div>
            <hr style={{width:'90%'}}/>
          </div>
        </Tabs>
        <button className="login-btn" onClick={(event) => this.handleLogin(event, 1)}>登录</button>
        <div className="other">
          <div className="deal"><input name="isGoing" type="checkbox" checked={this.state.isGoing}  onChange={this.handleInputChange.bind(this)}/>用户协议及隐私政策</div>
					{this.state.method === 0 ?
            <span className="other-way" onClick={() => this.loginpawd(1)}>短信登录</span>
            :
            <span className="other-way" onClick={() => this.loginpawd(0)}>密码登录</span>
          }

        </div>
      </section>
    )
  }
}

export default withRouter(Login);