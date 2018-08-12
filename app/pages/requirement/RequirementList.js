import React from "react"
import { ListView } from 'antd-mobile';
import { platform, version ,preUrl} from '@common/config';
import Cookies from 'js-cookie';

class RequirementList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNo:0,
			pageSize:5,
			dataSource:[],
			isLoading: true,
		}
	}
	getData(){
		var data={}
		data.Platform = platform;
		data.Version_Code = version;
		data.Token=Cookies.get("token");
		data.pageNo=this.state.pageNo;
		data.pageNo=this.state.pageSize;
		let url = preUrl+'/api/tk/demand/queryDemandByMother';
		fetchPost(url, data).then((content) => {
			this.setState({
				dataSource: content
			})
		})
	}
	render(){
		<ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
	}
}