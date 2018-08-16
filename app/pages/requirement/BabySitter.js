import React from "react"
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import overscroll from '@common/overscroll'
import {fetchGet, fetchPost} from "@common/Fetch";
import NoMatch from '@pages/NoMatch'
import { ListView, Card, WhiteSpace, SwipeAction, List, Button, NavBar, Icon} from 'antd-mobile';
import Store from '@common/Store';

class BabySitter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			moon: {},
			independent: false,
		};
	}

	componentWillMount() {
		if (Store.moon && Store.moon[this.props.match.params.id]) {
			this.setState({
				moon: Store.moon[this.props.match.params.id]
			})
		} else {
			// fetchPost("/api/tk/demand/queryDemandApplyByMother", {demandId: 1}, false).then((content) => {
			// 	console.log(content)
			// })
			this.setState({
				independent: true
			})
		}
	}

	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
	}

	render() {
		return (
			<section className="page with-navbar" >
				{!this.state.independent &&
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #999"}}>月嫂名片</NavBar>}
				<div className="page-container" style={this.state.independent ? {paddingTop:0} : ""}>
					<div className="infor">
						<div className="logined" style={{ display: '-webkit-box', display: 'flex', padding: '.5rem 0' }}>
							<img className="avatar" style={{ width: '1.28rem', height: '1.28rem', borderRadius: "50%", margin: '0 .3rem' }} src={this.state.moon.headUrl || require('@images/mycenter/no_avatar.jpeg')} alt="" />
							<div style={{ lineHeight: 1, padding: ".3rem 0" }}>
								<div className="name" style={{  fontSize: 18 }}>{this.state.moon.name || this.state.moon.nickName}</div>
								<div className="info" style={{ color: '#888', fontSize: 14, marginTop: ".1rem" }}>{this.state.moon.cityName} | 带过{this.state.moon.takecareBabies}个宝宝</div>
							</div>
							<Button onClick={() => this.props.history.push("/mycenter/re")} type="primary" size="small" style={{position: "absolute", right: ".3rem", top: ".9rem", backgroundColor: "#fff"}}>个人信息</Button>
						</div>
					</div>
				</div>
			</section>
		);
	}
}


const SitterRoute = () => (
	<Switch>
		<Route exact path='/babysitter/:id' component={BabySitter} />
		<Route component={NoMatch} />
	</Switch>
)

export default SitterRoute