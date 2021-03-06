import "@css/postre.css"
import React from "react"
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '@common/PrivateRoute'
import { Checkbox,  WhiteSpace, WingBlank, DatePicker, List, Button, NavBar, Icon, Tabs, InputItem, Toast} from 'antd-mobile';
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
			otherAreaValue:'',
			qqValue:'',
			data:this.props.location.state,
			auditionType:10,
		}
	}

	handleSumbit() {
		let data = {};
		data.Token = Cookies.get("token");
		data.demandId = this.state.data.applies.demandId;
		data.moonId = this.state.data.applies.moonId;
		let auditionTime = new Date(this.state.date);
		var m = "0" + (auditionTime.getMonth() + 1);
		var d = "0" + auditionTime.getDate();
		data.auditionTime = auditionTime.getFullYear() + '/' + m.substring(m.length - 2, m.length) + "/" + d.substring(d.length - 2, d.length);
		
		data.auditionType = this.state.auditionType;// 10：现场面试；20：视频面试
		if(data.auditionType==10){
			if(this.state.areaValue==""){
				Toast.info("请输入面试地点", 2);
				return false;
			}
			data.auditionAddr=this.state.areaValue;
		}else{
			data.auditionContact=this.state.qqValue;
		}
		fetchPost("/api/tk/demand/inviteMoon2View",data,false).then(res => {
			this.props.history.goBack();
		}).catch(({desc}) => {
			Toast.fail(desc, 2);
		})

	}

	render() {
		const CheckboxItem = Checkbox.CheckboxItem;
		return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{ position: "absolute", width: "100%", zIndex: 100, boxShadow: "0 1px 5px #ccc" }}>面试</NavBar>
				<div className="page-container">
					<WhiteSpace size="lg" />
					<div style={{ width: '1.28rem', height: '1.28rem', position:"relative", margin:"0 auto" }} >
						<img className="avatar" style={{ width: '1.28rem', height: '1.28rem', borderRadius: "50%", }}  src={this.state.data.applies.moon.headUrl} alt=""/>
					</div>
					<div style={{ width: '3rem', height: '1rem', position:"relative", margin:"0 auto",fontSize:'15px',textAlign:'center',lineHeight:'1rem'}} className="username">{this.state.data.applies.moon.name || this.state.data.applies.moon.nickName}</div>
					
					<WhiteSpace size="lg" />
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
								onChange={(tab, index) => { this.setState({auditionType:(index+1)*10}) }}
								onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
							>
								<List>
									<CheckboxItem key="康法漫厦大店" checked={this.state.areaValue=="康法漫厦大店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫厦大店"})}>康法漫厦大店</CheckboxItem>
									<CheckboxItem key="康法漫泛天平洋店" checked={this.state.areaValue=="康法漫泛天平洋店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫泛天平洋店"})}>康法漫泛天平洋店</CheckboxItem>
									<CheckboxItem key="康法漫会展店" checked={this.state.areaValue=="康法漫会展店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫会展店"})}>康法漫会展店</CheckboxItem>
									<CheckboxItem key="康法漫前埔店" checked={this.state.areaValue=="康法漫前埔店"? true: false}  onChange={()=>this.setState({areaValue:"康法漫前埔店"})}>康法漫前埔店</CheckboxItem>
									<InputItem ref="otherAreaValue" placeholder="请输入" value={this.state.otherAreaValue} onChange={(value)=>this.setState({areaValue:value, otherAreaValue:value})} onFocus={(value)=>this.setState({areaValue:value})}>
										<Checkbox checked={this.state.areaValue==this.state.otherAreaValue? true: false} style={{marginRight:15}} />其他
									</InputItem>
									
								</List>
								<div style={{  height: '50px', backgroundColor: '#fff' }}>
									<InputItem  placeholder="请输入QQ号" value={this.state.qqValue} onChange={(value)=>this.setState({qqValue:value})} >
									</InputItem>
								</div>
							</Tabs>
							
							
							<WhiteSpace size="xl" />
							<div style={{display: "flex"}}>
								<Button type="secondary" style={{flex:1, margin:"0 20px"}} onClick={() => this.props.history.goBack()}>取消</Button>
								<Button type="primary" style={{flex:1, margin:"0 20px"}} onClick={this.handleSumbit.bind(this)}>邀请面试</Button>
							</div>
						</WingBlank>
					</form>
					<WhiteSpace />
				</div>
			</section>
		)
	}
}

const InterviewRouter = () => (
	<Switch>
		<PrivateRoute path='/mycenter/interview' component={Interview} />
		<PrivateRoute exact path='/mycenter/interview/:id' component={Interview} />
		<Route component={NoMatch} />
	</Switch>
)


export default InterviewRouter