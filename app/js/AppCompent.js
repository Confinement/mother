import "../css/index.css"
import React from "react";
import { Radio ,InputNumber} from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


class AppCompent extends React.Component{
	constructor(porps){
		super(porps);
		
		this.state = {
			value:'',
			arearValue:'',
		}
	}
	
	onChange = (e) => {
		console.log('radio checked', e.target.value);
		this.setState({
		  value: e.target.value,
		});
	  }
	render(){
		return(
			<section className="page">
				<p>您的信息</p>
				<form className="mom-requirement">
					
					<p>预产期：</p>
					
					<div className="ser-days">服务天数
						<RadioGroup onChange={this.onChange.bind(this)} defaultValue="a">
							<RadioButton value="c">不限</RadioButton>
							<RadioButton value="a">29以下</RadioButton>
							<RadioButton value="b">30-45岁</RadioButton>
							<RadioButton value="d"> 
								<InputNumber min={1} max={100} defaultValue={3}/></RadioButton>
						</RadioGroup>
					</div>
					<section className='baby-num'>
						<span>胎儿数量</span>
							<RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
								<Radio value={1}>单胞胎</Radio>
								<Radio value={2}>多胞胎</Radio>
							</RadioGroup>
						</section>
					{/* <section className='arear'><span>服务地址</span><input type="text" name='address' value={this.state.arearValue} placeholder="思明南路XXX" onChange={this.handleChangeInput}/></section> */}
					<section className='sister-requirements'>
						<p>月嫂要求</p>
						<div className="age">月嫂年龄
							<RadioGroup onChange={this.onChange.bind(this)} defaultValue="a">
								<RadioButton value="c">不限</RadioButton>
								<RadioButton value="a">29以下</RadioButton>
								<RadioButton value="b">30-45岁</RadioButton>
								<RadioButton value="d">46以上</RadioButton>
							</RadioGroup>
						</div>
						<div className="home-address">家乡
							<RadioGroup onChange={this.onChange.bind(this)} defaultValue="a">
								<RadioButton value="c">不限</RadioButton>
								<RadioButton value="a">闽南</RadioButton>
								<RadioButton value="b">闽西</RadioButton>
								<RadioButton value="d">闽东</RadioButton>
								<RadioButton value="d">闽北</RadioButton>
							</RadioGroup>
						</div>
						<div className="serbaby-num">服务宝宝数
							<RadioGroup onChange={this.onChange.bind(this)} defaultValue="a">
								<RadioButton value="c">不限</RadioButton>
								<RadioButton value="a">10个以下</RadioButton>
								<RadioButton value="b">11-30个</RadioButton>
								<RadioButton value="d">31个以上</RadioButton>
							</RadioGroup>
						</div>
						<div className="money">薪资
							<RadioGroup onChange={this.onChange.bind(this)} defaultValue="a">
								<RadioButton value="c">面议</RadioButton>
							</RadioGroup>
						</div>
					</section>
					
					
				</form>
			</section>
			
		)
	}
	
}
export default AppCompent;