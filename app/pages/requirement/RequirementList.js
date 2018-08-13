import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import NoMatch from '@pages/NoMatch'
import { ListView, Card, WhiteSpace, SwipeAction, List, Button, NavBar, Icon} from 'antd-mobile';
import Cookies from 'js-cookie';
import {fetchPost} from "@common/Fetch";
import RequItem from '@pages/requirement/RequItem'
import AddAddress from '@pages/requirement/AddAddress'
import overscroll from '@common/overscroll'

class RequirementList extends React.Component{
	constructor(props){
		super(props);
		let ds =new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			pageNo:0,
			pageSize:5,
			dataSource:ds,
			isLoading: true,
		}
	}
	getData(){
		var data={}
		data.Token=Cookies.get("token");
		data.pageNo=this.state.pageNo;
		data.pageSize=this.state.pageSize;
		fetchPost("api/tk/demand/queryDemandByMother", data, false).then((content) => {
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows(content.list),
			})
		})
	}
	componentDidMount() {
		this.getData();
		overscroll(document.querySelector('.page-container'));
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
			  <div key={rowID} style={{ padding: '0 15px' }} onClick={() => this.props.history.push("/mycenter/RequirementList/addAddress")}>{/*addressList*/}
			 
				<Card full = {true}>
					<Card.Body>
						<div>预产期:{rowData.dueDate} | {rowData.serviceDay}天</div>
						<div>需求:地区:{rowData.moonAddr}    年龄:{rowData.moonAgeMin}岁-{rowData.moonAgeMax}岁{(rowData.costMax==0 || rowData.costMax=="" || rowData.costMax==null)? '' :'$'+rowData.costMin+'-'+rowData.costMax}</div>
						<div>服务宝宝数:{(rowData.takecareBabyMax==null || rowData.takecareBabyMax==0) ? '不限':(rowData.takecareBabyMax<=10 ? '10个以下' : (rowData.takecareBabyMax<=30 ?'11-30个':'31个以上' )) }    薪资:{(rowData.costMax==null || rowData.costMax==0) ? '不限' : '￥'+ rowData.costMin + ' - ' + rowData.costMax}</div>
						<div size="small" style={{position:'absolute',width:'70px',height:'30px',top:'26px',right:'20px',backgroundColor:'#ffda44',textAlign:'center',borderRadius:'20px',lineHeight:'30px'}}>{rowData.status==="1" ? "应聘中":(rowData.status==="2" ? "暂停中":"已结束")}</div>
						<hr/>
					</Card.Body>
					<Card.Footer  extra={<span>{rowData.joinCount}人投递 {rowData.viewCount}人浏览</span>} />
				</Card>
			  </div>
			);
		  };

		  return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #999"}}>护理需求</NavBar>
				<WhiteSpace size="lg" />
				<div className="page-container">
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

// export default RequirementList;

class MyRouter extends React.Component {
	constructor (props) {
		super(props);
	}

	render() {
		let enterClassName = this.props.history.action=="POP"?"slide-out":"slide-in";
		return (
		<TransitionGroup component={null}>
			<CSSTransition key={this.props.location.key} classNames={{
				appear: enterClassName + '-appear',
				appearActive: enterClassName + '-appear-active',
				enter: enterClassName + '-enter',
				enterActive: enterClassName + '-enter-active',
				enterDone: enterClassName + '-enter-done',
				exit: 'page-exit',
				exitActive: 'page-exit-active',
				exitDone: 'page-exit-done',
			}} timeout={300}>
				<Switch location={this.props.location}>
					<Route exact path='/mycenter/requirementlist' component={withRouter(RequirementList)} />
					<PrivateRoute path='/mycenter/requirementlist/requitem' component={RequItem} />
					<PrivateRoute path='/mycenter/requirementlist/addAddress' component={AddAddress} />
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default withRouter(MyRouter)