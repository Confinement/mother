import "@css/common.css"
import "@css/mycard.css"
import React from "react";
import { List, Radio, Flex, WhiteSpace } from 'antd-mobile';
import { platform, version ,preUrl} from '@common/config';
import { DatePicker } from 'antd-mobile';
import Cookies from 'js-cookie';


const RadioItem = Radio.RadioItem;


class myCard extends React.Component {
	constructor(porps) {
		super(porps);
		this.state = {
		}
		
	}
	
	render(){
		return(
			<section className = "page">	
			</section>
			
		)
	}

}
export default myCard;