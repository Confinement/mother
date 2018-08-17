import "@css/login.css"
import React from "react";
import { fetchPost } from "@common/Fetch";
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Tabs, NavBar, Icon, Button, Toast, List ,InputItem} from 'antd-mobile';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phValue: '',
      pawValue: '',
      hasError:false,
      smsValue: '',
      method: 0,
      dealCkeck: true,
      isGoing: true,
    }
  }
 
  pawChange = (value) => {
    this.setState({
      pawValue: value,
    });
  }
  smsChange = (value) => {
    this.setState({
      smsValue: value,
    });
  }

  // 改变dom
  loginpawd(page) {
    this.setState({ method: page })
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
    data.phone = this.state.phValue.replace(/\s/g,"");

    fetchPost("api/sys/sendSms", data, false).then(({ content }) => {
      document.querySelector(".sms-btn").innerHTML = "已发送";
      document.querySelector(".sms-btn").className = "sms-btn wait";
      setTimeout(() => {
        document.querySelector(".sms-btn").innerHTML = "获取验证码";
        document.querySelector(".sms-btn").className = "sms-btn";
      }, 30000)
    })
  }

  handleLogin(event) {
    event.preventDefault();
    let data = {}
    data.phone = this.state.phValue.replace(/\s/g,"");
    this.state.method ? data.code = this.state.smsValue : data.password = this.state.pawValue;
    if (!this.state.isGoing) {
      alert("请同意用户协议及隐私政策！");
      return false;
    }

    fetchPost("api/user/login", data, false).then((content) => {
      let expires = (content.expiresTime - new Date().getTime()) / 1000 / 3600 / 24;
      Cookies.set("phone", content.phone, { expires });
      Cookies.set("token", content.token, { expires });
      Cookies.set("userId", content.userId, { expires });
      let jumpURL = this.props.location.state && this.props.location.state.from ? this.props.location.state.from.pathname : "/mycenter";
      this.props.history.replace(jumpURL);
    }).catch(({ desc }) => {
      Toast.fail(desc, 2)
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

    onErrorClick = () => {
      if (this.state.hasError) {
        Toast.info('请输入正确的手机号');
      }
    }
    onChange = (value) => {
      if (value.replace(/\s/g, '').length < 11) {
        this.setState({
          hasError: true,
        });
      } else {
        this.setState({
          hasError: false,
        });
      }
      this.setState({
        phValue: value,
      });
    }
  render() {
    return (
      <section className="page login">
        {this.state.method === 0 ?
          <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>密码登录</NavBar>
          :
          <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>注册登录</NavBar>
        }
        <div className="logo"><img src={require('../images/login/logo.png')} alt="" /></div>
        <Tabs tabs={[
          { title: 1 },
          { title: 2 }
        ]}
          page={this.state.method}
          renderTabBar={false}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
        >
          <div className="pwd">
            <InputItem className='login-input'
                type="phone"
                placeholder="手机号"
                error={this.state.hasError}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange}
                value={this.state.phValue}/>
                <hr style={{ width: '90%' }} />
              <InputItem className='login-input' placeholder="密码" type="password" onChange={this.pawChange}
                value={this.state.pawValue}
                extra={<svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-biyanjing"></use>
              </svg>} />
              <hr style={{ width: '90%' }} />
            
          </div>
          <div className="sms">
            
            <InputItem className='login-input'
                type="phone"
                placeholder="手机号"
                error={this.state.hasError}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange}
                value={this.state.phValue}
              />
               <hr style={{ width: '90%' }} />
              <InputItem  className='login-input' placeholder="验证码" type="password" onChange={this.smsChange}
                value={this.state.smsValue}/>
              <hr style={{ width: '90%' }} />
              <Button size="small" style={{ position: "absolute", right: ".4rem", top: "1.4rem", borderRadius: "20px" }} className="sms-btn" onClick={(event) => this.handleSendSms(event, 2)}>获取验证码</Button>
        
          </div>
        </Tabs>
        <button className="login-btn" onClick={(event) => this.handleLogin(event, 1)}>登录</button>
        <div className="other">
          <div className="deal"><input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange.bind(this)} />用户协议及隐私政策</div>
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