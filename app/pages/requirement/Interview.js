import "@css/postre.css"
import React from "react"
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '@common/PrivateRoute'
import { Checkbox,  WhiteSpace, WingBlank, DatePicker, List, Button, NavBar, Icon, Tabs } from 'antd-mobile';
import Cookies from 'js-cookie';
import { fetchPost } from "@common/Fetch";
import overscroll from '@common/overscroll'
import NoMatch from '@pages/NoMatch'

class Interview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// id:this.props.match.params.id,//月嫂id
			areaValue:'',
		}
	}

	handleSumbit() {
		let data = {};
		data.Token = Cookies.get("token");
		var urlData = this.props.location.state;
		var {...applies} = urlData;
		data.demandId = applies.demandId;
		data.moonId = applies.moonId;
		data.auditionTime = "";
		data.auditionType = "";// "/api/tk/demand/inviteMoon2View"
	}

	render() {
		const CheckboxItem = Checkbox.CheckboxItem;
		return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{ position: "absolute", width: "100%", zIndex: 100, boxShadow: "0 1px 5px #ccc" }}>面试</NavBar>
				<div className="page-container">
					<form className="mom-interview">
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
							<WhiteSpace />
							<label htmlFor="" style={{fontSize:'17px', height: '0.8rem',padding: '10px'}} >面试方式:</label>
							<Tabs tabs={[
									{ title: "现场面试" },
									{ title: "视频面试"}
									]}
								initialPage={0}
								onChange={(tab, index) => { console.log('onChange', index, tab); }}
								onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
								>
								<div style={{ height: '300px', backgroundColor: '#fff' }}>
									<CheckboxItem key="康法漫厦大店" checked={this.state.areaValue=="康法漫厦大店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫厦大店"})}>康法漫厦大店</CheckboxItem>
									{/* <hr style={{width: '80%'}} /> */}
									<CheckboxItem key="康法漫泛天平洋店" checked={this.state.areaValue=="康法漫泛天平洋店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫泛天平洋店"})}>康法漫泛天平洋店</CheckboxItem>
									<hr style={{width: '80%', border: "none", borderBottom: "1px solid #ddd"}} />
									<CheckboxItem key="康法漫会展店" checked={this.state.areaValue=="康法漫会展店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫会展店"})}>康法漫会展店</CheckboxItem>
									<hr style={{width: '80%', border: "none", borderBottom: "1px solid #ddd"}} />
									<CheckboxItem key="康法漫前埔店" checked={this.state.areaValue=="康法漫前埔店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫前埔店"})}>康法漫前埔店</CheckboxItem>
									<hr style={{width: '80%', border: "none", borderBottom: "1px solid #ddd"}} />
									<CheckboxItem key="其他">
										其他<input placeholder="请填写"  />
									</CheckboxItem>
								</div>
								<div style={{  height: '50px', backgroundColor: '#fff' }}>
									<input placeholder="请填写"  />
								</div>
							</Tabs>
							
							
							<WhiteSpace />
							<Button type="primary" >发布</Button>
						</WingBlank>
					</form>
					<WhiteSpace />
				</div>
			</section>
		)
	}
}

class InterviewRouter extends React.Component {
	constructor (props) {
		super(props);
	}
	render() {
		let enterClassName = this.props.history.action=="POP"?"slide-out":"slide-in";
		return (
			<Switch location={this.props.location}>
				<PrivateRoute path='/mycenter/interview' component={Interview} />
				<PrivateRoute exact path='/mycenter/interview/:id' component={Interview} />
				<Route component={NoMatch} />
			</Switch>
		)
	}
}

export default InterviewRouter