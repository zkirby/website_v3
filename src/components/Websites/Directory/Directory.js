import React from 'react';
import uuidv1 from 'uuid/v1';
import { connect } from 'react-redux';

import master_list from '../WebsiteMasterList';

import './Directory.css';

const Directory = (props) => {

	props.setDisplayUrl();

	let list_of_webnames = [];

	for (let key in master_list) {
		if (key !== "undefined") {
			list_of_webnames.push(<div className="directory-web-list-item" 
				 					   onClick={ ()=>{ props.search_request(key) } } 
				 					   key={ uuidv1() }> 
				 					   		<i className={ master_list[key]["styles"]["tab"]["favicon"]["name"] + " directory-favicon" } 
				 					   		   aria-hidden='true'></i> 
				 					   		{ key } 
				 				  </div>);
		}
	}

	return (
	  <div className="directory-body" style={{height: "100%", width: "100%"}}>
	  	<div className="directory-header-text">Website Directory</div>
	  	<div className="directory-body-text">
	  		Every website currently accessible by 
	  		this browser is listed below. To visit the 
	  		website simply click on the name.
	  	</div>
	  	<div className="directory-web-list">{ list_of_webnames }</div>
	  </div>
  )
}	

const mapDispatchToProps = dispatch => {
  return {
    search_request: (request) => {
    	dispatch({
        	type: "SEARCH-REQUEST", 
        	payload: request
      	});
    },
    setDisplayUrl: () => {
    	dispatch({
			type:"SET-DISPLAY-URL",
			payload: "https://directory.edu"
		});
	}
  }
};

export default connect(()=>({}), mapDispatchToProps)(Directory);
