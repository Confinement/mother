import "@css/postre.css"
import React from "react"
import { ListView, Card, WhiteSpace, SwipeAction, List, Button, NavBar, Icon} from 'antd-mobile';
import Cookies from 'js-cookie';
import {fetchPost} from "@common/Fetch";
import overscroll from '@common/overscroll'

class RequItem extends React.Component{
	constructor(props){
		super(props);
		let ds =new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			pageNo:0,
			pageSize:5,
			dataSource:ds,
			isLoading: true,
			monData:[],
			reqId:0,
			demandStatus:1,//3结束 2暂停 1应聘中
		}
	}

	componentDidMount() {
		var redata={}
		redata.Token=Cookies.get("token");
		let data = this.props.location.state;
		let {id} = data;
		this.setState({reqId:id});
		redata.demandId=id;
		fetchPost("/api/tk/demand/queryDemandApplyByMother", redata, false).then((content) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(content.applies),
				monData: content,
				demandStatus:content.status,
			})
		})
		overscroll(document.querySelector('.page-container'));
	}

	stopReq = (type) => {
		var redata={}
		redata.Token=Cookies.get("token");
		let data = this.props.location.state;
		redata.demandId=this.state.reqId;
		let uri="";
		if(type==="1"){
			uri="/api/tk/demand/resumeDemand";
		}else if(type==="2"){
			uri="/api/tk/demand/suspendDemand";
		}else{
			uri="/api/tk/demand/stopDemand";
		}
		fetchPost(uri, redata, false).then((content) => {
			this.setState({
				demandStatus: type,
			})
		})
	}
	
	render(){
		  const row = (rowData, sectionID, rowID) => {
			return (
			  <div key={rowID} style={{ padding: '0 15px' }} onClick={() => this.props.history.push("/mycenter/RequirementList/requitem")}>
			   <WhiteSpace size="lg" />
				
			  </div>
			);
		  };

		  return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #999"}}>护理详情</NavBar>
				<div className="page-container">
				<Card full = {true}>
					<Card.Body>
						<div>预产期:{this.state.monData.dueDate} | {this.state.monData.serviceDay}天</div>
						<div>需求:地区:{this.state.monData.moonAddr}    年龄:{this.state.monData.moonAgeMin}岁-{this.state.monData.moonAgeMax}岁{(this.state.monData.costMax==0 || this.state.monData.costMax=="" || this.state.monData.costMax==null)? '' :'$'+this.state.monData.costMin+'-'+this.state.monData.costMax}</div>
						<div>服务宝宝数:{(this.state.monData.takecareBabyMax==null || this.state.monData.takecareBabyMax==0) ? '不限':(this.state.monData.takecareBabyMax<=10 ? '10个以下' : (this.state.monData.takecareBabyMax<=30 ?'11-30个':'31个以上' )) }    薪资:{(this.state.monData.costMax==null || this.state.monData.costMax==0) ? '不限' : '￥'+ this.state.monData.costMin + ' - ' + this.state.monData.costMax}</div>
						<hr/>
					</Card.Body>
					<Card.Footer  extra={<span>{this.state.monData.joinCount}人投递 {this.state.monData.viewCount}人浏览</span>} />
				</Card>
				{
					this.state.demandStatus==="3" ? 
					<div className="status-mana">
						<Button size="small" className="status-btn over">已结束</Button>
					</div> : 
						(this.state.demandStatus==="1" ? 
						<div className="status-mana">
							<Button size="small" className="status-btn start" onClick={()=>this.stopReq("2")}>暂停</Button>
							<Button size="small" className="status-btn over" onClick={()=>this.stopReq("3")} >结束</Button> 
						</div>	:
						<div className="status-mana">
							<Button size="small" className="status-btn start" onClick={()=>this.stopReq("1")}>恢复</Button>
							<Button size="small" className="status-btn over" onClick={()=>this.stopReq("3")}>结束</Button> 
						</div>)

				}
				<div className="apply-bar">全部应聘</div>
				{/* <ListView 
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
					{this.state.isLoading ? 'Loading...' : 'Loaded'}
					</div>)}
					renderRow={row}
					// renderSeparator={separator}
					className="am-list"
					pageSize={this.state.pageSize}
					useBodyScroll
					onScroll={() => { console.log('scroll'); }}
					scrollRenderAheadDistance={500}
					// onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
				/> */}
				</div>
			</section>
		  )}
		  

}

export default RequItem;
