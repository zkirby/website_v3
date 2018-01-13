import React from 'react';
import { connect } from 'react-redux';


import './404.css';

const FOF = (props) => {

	props.setDisplayUrl();

	return (
	  <div style={{height: "100%", width: "100%"}}>
	  	<div className="FOF-text-large">404</div>
	  	<div className="FOF-text-small">Oh no! That webpage doesn’t exist or isn’t accessible by this web browser. </div>
	  	<div className="FOF-text-small">Click <div onClick={props.search_dir} className="FOF-directory">here</div> to view all accessible webpages.</div>
	  </div>
	)
}	

const mapDispatchToProps = (dispatch) => {
	return {
		setDisplayUrl: () => {
			dispatch({
				type:"SET-DISPLAY-URL",
				payload: "https://404.com"
			})
		},
		search_dir: () => {
	      dispatch(
	      {
	        type: "SEARCH-REQUEST", 
	        payload: "directory"
	      });
	    }
	}
} 

export default connect(()=>({}), mapDispatchToProps)(FOF);
