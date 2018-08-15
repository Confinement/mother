import "@css/postre.css"
import React from "react"
import { ListView, Card, WhiteSpace, SwipeAction, List, Button, NavBar, Icon } from 'antd-mobile';
import Cookies from 'js-cookie';
import { fetchPost } from "@common/Fetch";
import overscroll from '@common/overscroll'

class Interview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	handleSumbit() {
		let data = {};
		data.Token = Cookies.get("token");;

		data.demandId = this.state.babyTypeValue;
		data.moonId = this.state.addressValue;
		data.auditionTime = this.state.daysValue;

		data.auditionType = this.state.arearValue,

		fetchPost("/api/tk/demand/inviteMoon2View", data, true).then(res => {


		})
	}
	render() {
		const data = [
			{ value: '康法漫厦大店', label: '康法漫厦大店' },
			{ value: '康法漫前铺店', label: '康法漫前铺店' },
			{ value: '康法漫厦大店', label: '康法漫厦大店' },
			{ value: '其他', label: '其他' },

		];
		return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{ position: "absolute", width: "100%", zIndex: 100, boxShadow: "0 1px 5px #ccc" }}>面试</NavBar>
				<div className="page-container">
					<form className="mom-requirement">
						<WingBlank size="md">
							<DatePicker
								mode="date"
								title="面试时间:"
								extra=""
								value={this.state.date}
								onChange={date => this.setState({ date })}
							>
								<List.Item arrow="horizontal">面试时间:</List.Item>
							</DatePicker>
							{data.map(i => (
								<CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
									{i.label}
								</CheckboxItem>
							))}
							<WhiteSpace />
							<Button type="primary" onClick={this.handleSumbit.bind(this)}>发布</Button>
						</WingBlank>
					</form>
					<WhiteSpace />
				</div>
			</section>
		)
	}
}
export default Interview;