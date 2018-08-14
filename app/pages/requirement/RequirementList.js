import React from "react"
import ReactDOM from "react-dom"
import { Switch, Route, Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '@common/PrivateRoute'
import NoMatch from '@pages/NoMatch'
import { ListView, Card, NavBar, Icon, PullToRefresh} from 'antd-mobile';
import Cookies from 'js-cookie';
import {fetchPost} from "@common/Fetch";
import RequItem from '@pages/requirement/RequItem'
import overscroll from '@common/overscroll'

class RequirementList extends React.Component{
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			pageNo: 0,
			pageSize: 5,
			dataSource: ds,
			isLoading: true,
			refreshing: true,
			height: document.documentElement.clientHeight,
			hasMore: true,
		}
	}
	getData(page){
		var data={}
		data.Token=Cookies.get("token");
		data.pageNo=page;
		data.pageSize=this.state.pageSize;
		fetchPost("api/tk/demand/queryDemandByMother", data, false).then((content) => {
			if(page+this.state.pageSize >= content.total){
				this.setState({
					hasMore: false,
					refreshing: false,
					isLoading: false,})
			}
			if (page) {
				this.rData = [...this.rData, ...content.list]
			} else {
				this.rData = content.list
			}
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows(this.rData),
			})
		})
	}

	componentWillMount() {
		this.getData(0);
	}
	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
	}

	onRefresh = () => {
		this.getData(0);
	};

	onEndReached = (event) => {
		if (!this.state.hasMore) {
			return;
		}
		this.setState({ isLoading: false });

		var page = this.state.pageNo + this.state.pageSize;
		this.setState({ pageNo: page });
		this.getData(page);
	};

	render() {

		  const row = (rowData, sectionID, rowID) => {
			return (
			<div key={rowID} onClick={() => this.props.history.push('/mycenter/RequirementList/requitem/' + rowData.id)}>{/*addressList*/}
			
				<Card full = {true}>
					<Card.Body>
						<div>预产期:{rowData.dueDate} | {rowData.serviceDay}天</div>
						<div>需求:地区:{rowData.moonAddr}    年龄:{rowData.moonAgeMin}岁-{rowData.moonAgeMax}岁{(rowData.costMax==0 || rowData.costMax=="" || rowData.costMax==null)? '' :'$'+rowData.costMin+'-'+rowData.costMax}</div>
						<div>服务宝宝数:{(rowData.takecareBabyMax==null || rowData.takecareBabyMax==0) ? '不限':(rowData.takecareBabyMax<=10 ? '10个以下' : (rowData.takecareBabyMax<=30 ?'11-30个':'31个以上' )) }    薪资:{(rowData.costMax==null || rowData.costMax==0) ? '不限' : '￥'+ rowData.costMin + ' - ' + rowData.costMax}</div>
						<div size="small" style={{position:'absolute',width:'70px',height:'30px',top:'26px',right:'20px',backgroundColor:'#ffda44',textAlign:'center',borderRadius:'20px',lineHeight:'30px'}}>{rowData.status==="1" ? "应聘中":(rowData.status==="2" ? "暂停中":"已结束")}</div>
						<hr style={{border: "none", borderBottom: "1px solid #ddd"}} />
					</Card.Body>
					<Card.Footer  extra={<span>{rowData.joinCount}人投递 {rowData.viewCount}人浏览</span>}/>
				</Card>
			</div>
			);
		  };

		  return (
			<div className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} rightContent={<Link to="/home/requirement">发布需求</Link>} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #ccc"}}>护理需求</NavBar>
				<ListView 
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderFooter={() => (<div style={{ padding: 20, textAlign: 'center' }}>
					{this.state.isLoading ? 'Loading...' : (!this.state.hasMore&&'没有更多了~')}
					</div>)}
					renderRow={row}
					className="page-container"
					pullToRefresh={<PullToRefresh
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh}
					/>}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={100}
					pageSize={this.state.pageSize}
					style={{ paddingTop: 60	}}
				/>
			</div>
			)
		}
}

// export default RequirementList;

class RequirementRouter extends React.Component {
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
					<Route exact path='/mycenter/requirementlist' component={RequirementList} />
					<PrivateRoute exact path='/mycenter/requirementlist/requitem' component={RequItem} />
					<PrivateRoute path='/mycenter/requirementlist/requitem/:id' component={RequItem} />
					{/* <PrivateRoute path='/mycenter/requirementlist/addAddress' component={AddAddress} /> */}
					<Route component={NoMatch} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
		)
	}
}

export default RequirementRouter