import React from "react"
import overscroll from '@common/overscroll'
import { Switch, Route, withRouter } from 'react-router-dom'
import PrivateRoute from '@common/PrivateRoute'
import NoMatch from '@pages/NoMatch'
import AddAddress from '@pages/requirement/AddAddress'
import {  Card, SwipeAction,  Button, NavBar, Icon } from 'antd-mobile'
import Cookies from 'js-cookie'
import { fetchPost } from "@common/Fetch"



class Address extends React.Component {
	constructor(props) {
		super(props);
		
	}
	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
		var data = {}
		data.Token = Cookies.get("token");
		fetchPost("/api/tk/goodsOrder/getUserAddrList", data, false).then((content) => {
			if(content.length==0 ){
				this.props.history.replace("/mycenter/requirementlist/post/address/addaddress")
			}
			this.setState({
				addressList: content,
			})
		})
	}

	render() {
		return (
			<section className="page with-navbar" >
				<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} style={{position:"absolute", width:"100%", zIndex:100, boxShadow: "0 1px 5px #999"}}>地址列表</NavBar>
				<div className="page-container">
				<AddressItem/>
				</div>
				<Button size="large" type="primary" onClick={() => this.props.history.push("/mycenter/requirementlist/post/address/addaddress")} style={{position:"absolute", bottom:"0",width:"100%", zIndex:100,}}>新增地址</Button>
			</section>
		)
	}
}
export default Address;


const AddresserRoute = () => (
	<Switch>
		{/* <Route  exact path='/mycenter/requirementlist/post/address' component={Address} /> */}
		{/* <Route  exact path='/mycenter/requirementlist/post/address/addaddress' component={AddAddress} />
		<Route  path='/mycenter/requirementlist/post/address/addaddress:id' component={AddAddress} /> */}
	</Switch>
)

// export default AddresserRoute


class AddressItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<SwipeAction
					style={{ backgroundColor: 'gray' }}
					autoClose
					left={[
						{
							text: 'Reply',
							onPress: () => console.log('reply'),
							style: { backgroundColor: '#108ee9', color: 'white' },
						},
						{
							text: 'Cancel',
							onPress: () => console.log('cancel'),
							style: { backgroundColor: '#ddd', color: 'white' },
						},
					]}
					onOpen={() => console.log('global open')}
					onClose={() => console.log('global close')}
				>
					<Card full>
						<Card.Header
							title={this.props.name}
							extra={this.props.phone}
						/>
						<Card.Body>
							<div>{this.props.address}</div>
						</Card.Body>
						<Card.Footer content={this.props.address} />
					</Card>
				</SwipeAction>
			</div>
		)
	}
}