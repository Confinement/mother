import React from "react"
import overscroll from '@common/overscroll'


class Address extends React.Component{
	constructor(){
		super(props)
		this.state({
			addressList:[],
		})
	}

	componentDidMount() {
		overscroll(document.querySelector('.page-container'));
	}

	render(){
		return(
			<div></div>
		)
	}
}
export default Address;

class AddressItem extends React.Component(){
	render(){
		<div>
			<input className='address-name' value={this.props.name}/>
			<ipuut className='address-phon' value={this.props.phone}/>
			<ipuut className='address-addr' value={this.props.addr}/>
			<input type="rideo"/>
			
		</div>
	}
}