import React from "react"
import { ListView, Card, WhiteSpace, SwipeAction, List, Button, NavBar, Icon} from 'antd-mobile';
import Cookies from 'js-cookie';
import {fetchPost} from "@common/Fetch";

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
		}
	}
	getData(){
		var data={}
		data.Token=Cookies.get("token");
		data.pageNo=this.state.pageNo;
		data.pageSize=this.state.pageSize;
		fetchPost("/api/tk/demand/queryDemandApplyByMother", data, false).then((content) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(content.applies),
				monData: content,
			})
		})
	}
	componentDidMount() {
		this.getData();
	}

	onLoadMore() {//加载更多函数
        var page = this.state.page + 1;
        console.log(page)
		this.setState({page: page});
		//var isTotal=this.state.total/5===page;
        this.getData(page,this.state.searchkeyword);
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
			<section className="page" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"fixed", width:"100%", zIndex:100, boxShadow: "0 1px 5px #999"}}>护理详情</NavBar>
				<div className="page-container with-navbar">
				<Card full = {true}>
					<Card.Body>
						<div>预产期:{this.state.monData.dueDate} | {this.state.monData.serviceDay}天</div>
						<div>需求:地区:{this.state.monData.moonAddr}    年龄:{this.state.monData.moonAgeMin}岁-{this.state.monData.moonAgeMax}岁{(this.state.monData.costMax==0 || this.state.monData.costMax=="" || this.state.monData.costMax==null)? '' :'$'+this.state.monData.costMin+'-'+this.state.monData.costMax}</div>
						<div>服务宝宝数:{(this.state.monData.takecareBabyMax==null || this.state.monData.takecareBabyMax==0) ? '不限':(this.state.monData.takecareBabyMax<=10 ? '10个以下' : (this.state.monData.takecareBabyMax<=30 ?'11-30个':'31个以上' )) }    薪资:{(this.state.monData.costMax==null || this.state.monData.costMax==0) ? '不限' : '￥'+ this.state.monData.costMin + ' - ' + this.state.monData.costMax}</div>
						<div  style={{position:'absolute',width:'70px',height:'30px',top:'26px',right:'20px',backgroundColor:'#ffda44',textAlign:'center',borderRadius:'20px',lineHeight:'30px'}}>{this.state.monData.status==="1" ? "应聘中":(this.state.monData.status==="2" ? "暂停中":"已结束")}</div>
						<hr/>
					</Card.Body>
					<Card.Footer  extra={<span>{this.state.monData.joinCount}人投递 {this.state.monData.viewCount}人浏览</span>} />
				</Card>
				
				<ListView 
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
				/>
				</div>
			</section>
		  )}
		  

}

export default RequItem;
