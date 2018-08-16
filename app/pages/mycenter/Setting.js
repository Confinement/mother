import React from "react";
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '@common/PrivateRoute'
import { List, Radio, Flex, WhiteSpace, WingBlank, Toast, NavBar, Icon, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie';
import overscroll from '@common/overscroll'
import Store, {resetStore} from '@common/Store';
import NoMatch from '@pages/NoMatch'
import { fetchPost } from '@common/Fetch'


const Logout = (history) => {
	Cookies.remove('token')
	Cookies.remove('phone')
	Cookies.remove('userId')
	resetStore()
	history.push("/mycenter")
}

class Setting extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
	}
	
	render() {
		return (
			<section className='page with-navbar'>
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #ccc"}}>设置</NavBar>
				<div className="page-container">
					<WhiteSpace size="lg" />
					<List className="my-list">
						{Cookies.get('token') &&
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/setpwd/change")}>登录密码设置</List.Item>}
						{Cookies.get('token') &&
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/changepaypwd")}>支付密码设置</List.Item>}
						{Cookies.get('token') &&
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/changephone")}>更换绑定手机号</List.Item>}
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/about")}>关于</List.Item>
					</List>
					<WhiteSpace size="xl" />
					<WingBlank size="lg">
						{Cookies.get('token') &&
							<Button onClick={() => Logout(this.props.history)} type="primary">退出登录</Button>
						}
					</WingBlank>
				</div>
			</section>
		)
	}
}

@createForm()
class Setpwd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	save() {
		if (this.state.nosame) {
			Toast.fail('两次密码不一致！', 2)
			return false
		}
		let data = this.props.form.getFieldsValue();
		data.Token = Cookies.get('token');
		fetchPost('/api/user/setPassword', data).then(content => {
			Toast.success('密码设置成功！')
			setTimeout(() => this.props.history.push("/mycenter"), 2);
		}).catch(({desc}) => {
			Toast.fail(desc, 2)
		})
	}
	
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<section className='page with-navbar'>
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #ccc"}}>设置用户密码</NavBar>
				<div className="page-container">
					<WhiteSpace size="lg" />
					<List>
					{this.props.match.params.change &&
					<InputItem placeholder="旧密码" type="password" {...getFieldProps("oldPassword")}
						extra={<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-biyanjing"></use>
						</svg>} />}
					<InputItem placeholder="新密码（6-20位数字和密码组合）" type="password" {...getFieldProps("password")} onBlur={v => this.setState({nosame: v!=this.props.form.getFieldValue('password2')})}
						extra={<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-biyanjing"></use>
						</svg>} />
					<InputItem placeholder="请再次输入新密码" type="password" {...getFieldProps("password2")} error={this.state.nosame} onBlur={v => this.setState({nosame: v!=this.props.form.getFieldValue('password')})} onErrorClick={e => Toast.info('两次输入的密码不一致！',2, null, false)}
						extra={<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-biyanjing"></use>
						</svg>} />
					</List>
					<WhiteSpace size="xl" />
					<WingBlank size="lg">
						{Cookies.get('token') &&
							<Button onClick={this.save.bind(this)} type="primary">保存新密码</Button>
						}
					</WingBlank>
				</div>
			</section>
		);
	}
}

const SettingRouter = () => (
	<Switch>
		<Route exact path='/mycenter/setting' component={Setting} />
		<PrivateRoute path='/mycenter/setting/setpwd/:change' component={Setpwd} />
		<Route component={NoMatch} />
	</Switch>
)

export default SettingRouter