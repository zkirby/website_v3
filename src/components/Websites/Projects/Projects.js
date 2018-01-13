import React from 'react';
import { connect } from 'react-redux';

import './Projects.css';

const Projects = (props) => {

	props.setDisplayUrl();

	return (
	  <div style={{height: "100%", width: "100%", background: "green"}}>

	  </div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		setDisplayUrl: () => {
			dispatch({
				type:"SET-DISPLAY-URL",
				payload: "https://projects.com"
			})
		}
	}
} 

export default connect(()=>{}, mapDispatchToProps)(Projects);
