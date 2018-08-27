import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import PrivateRoute from '@common/PrivateRoute'
import overscroll from '@common/overscroll'
import Cookies from 'js-cookie';
import { fetchGet } from "@common/Fetch";
import NoMatch from '@pages/NoMatch'
import Tabbar from '@common/TabBar'
import RequirementList from '@pages/requirement/RequirementList'
import { Carousel, WhiteSpace, ListView, WingBlank, PullToRefresh } from 'antd-mobile';
import "@css/common.css"
import "@css/home.css"


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageNo: 0,
			pageSize: 3,
			news: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			noMore: false
		};
	}

	componentWillMount() {
		Cookies.get('token') &&
		fetchGet('/api/home/getAppMotherHome', {Token: Cookies.get('token')}, true).then(data => {
			this.setState({ ...data })
		}) &&
		this.getNews(this.state.pageNo);
	}

	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
	}

	getNews(pageNo = 0) {
		this.setState({refreshing: true})
		fetchGet('/api/info/get', {Token: Cookies.get('token'), offset: pageNo, limit: this.state.pageSize}).then(data => {
			this.setState({refreshing: false})
			if (data.list.length <= 0) {
				this.setState({noMore: true})
			}
			this.newsData = [...this.newsData||[], ...data.list]
			this.setState({
				pageNo: pageNo,
				news: this.state.news.cloneWithRows(this.newsData)
			})
		})
	}

	onEndReached() {
		if (this.state.noMore) return false;
		this.getNews(this.state.pageNo + this.state.pageSize);
	}

	render() {
		const Row = (rowData) => (
			<WingBlank size="lg">
				<dl>{console.log(rowData.title)}
					<dd><img src={rowData.url} alt={rowData.title} /></dd>
					<dt>
						<h5>{rowData.title}</h5>
						<span>{rowData.content}</span>
					</dt>
				</dl>
			</WingBlank>
		)

		return (
			<section className='page'>
				<ListView
					className="news page-container"
					dataSource={this.state.news}
					renderRow={Row}
					onEndReached={this.onEndReached.bind(this)}
					onEndReachedThreshold={20}
					contentContainerStyle={{width:"100%", paddingBottom:55}}
					renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
						{this.state.refreshing ? 'Loading...' : (this.state.noMore&&'没有更多了~')}
					</div>)}
					renderHeader={() => (
						<div style={{width:"100%"}}>
							<div className="banner">
								<Carousel
									autoplay={true}
									infinite
									beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
									afterChange={index => console.log('slide to', index)}
								>
									{this.state.banners ? this.state.banners.map(v => (
										<a
											key={v.id}
											style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
										>
											<img
												src={v.content}
												alt={v.title}
												style={{ width: '100%', verticalAlign: 'top' }}
											/>
										</a>
									)) : <img src={require('../images/home/1.png')} style={{ width: '100%', verticalAlign: 'top' }} />
									}
								</Carousel>
							</div>
							<div className="home-bnt">
								<Link className="left-btn" to='/home/requirement'>
									<img className="sister" src={require('../images/home/sister_icon.png')} alt="" />
									<span>找月嫂</span>
								</Link>
								<div className="right-btn">
									<Link className="btn bnt1" to='/home/procreate'>
										<img className="ness" src={require('../images/home/ness_icon.png')} alt="" />
										<span>生产必备</span>
									</Link>
									<Link className="btn bnt2" to='/home/room'>
										<img className="houser" src={require('../images/home/houser_icon.png')} alt="" />
										<span>健康月子房</span>
									</Link>
									<Link className="btn bnt3" to='/home/prolactin'>
										<img className="server" src={require('../images/home/server_icon.png')} alt="" />
										<span>催乳服务</span>
									</Link>
									<Link className="btn bnt4" to='/home/recovery'>
										<img className="repair" src={require('../images/home/repair_icon.png')} alt="" />
										<span>产后康复</span>
									</Link>
								</div>
								<Link className="btn bnt4" to='/home/services'><div className="all-btn">全部服务</div></Link>
							</div>
							<WhiteSpace size="lg" />
						</div>
					)}
				/>
				<Tabbar />
			</section>
		);
	}
}

const HomeRouter = () => (
	<Switch>
		<Route exact path='/' component={Home} />
		<Route exact path='/home' component={Home} />
		<PrivateRoute path='/home/requirement' component={RequirementList} />
		<Route component={NoMatch} />
	</Switch>
)

export default HomeRouter