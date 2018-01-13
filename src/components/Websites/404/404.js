import React from 'react';
import { connect } from 'react-redux';


import './404.css';

const F0F = (props) => {

	props.setDisplayUrl();

	return (
	  <div style={{height: "100%", width: "100%", background:"red"}}>
	  	<div>HELLO WORLD</div>
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
		}
	}
} 

export default connect(()=>{}, mapDispatchToProps)(F0F);
