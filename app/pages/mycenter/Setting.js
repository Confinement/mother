import React from "react";
import { List, Radio, Flex, WhiteSpace, WingBlank, DatePicker, NavBar, Icon, InputItem, Button } from 'antd-mobile';
import Cookies from 'js-cookie';
import overscroll from '@common/overscroll'


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
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/changepwd")}>登录密码设置</List.Item>}
						{Cookies.get('token') &&
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/changepaypwd")}>支付密码设置</List.Item>}
						{Cookies.get('token') &&
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/changephone")}>更换绑定手机号</List.Item>}
						<List.Item arrow="horizontal" onClick={() => this.props.history.push("/mycenter/setting/about")}>关于</List.Item>
					</List>
					<WhiteSpace size="xl" />
					<WingBlank size="lg">
						{Cookies.get('token') &&
							<Button onClick={() => {
								Cookies.remove('token')
								Cookies.remove('phone')
								Cookies.remove('userId')
								this.props.history.push("/mycenter")
							}} type="primary">退出登录</Button>
						}
					</WingBlank>
				</div>
			</section>
		)
	}
}

export default Setting