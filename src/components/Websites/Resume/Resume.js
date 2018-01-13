import React from 'react';
import { connect } from 'react-redux';

import './Resume.css';

const Resume = (props) => {

	props.setDisplayUrl();

	return (
	  <div style={{height: "100%", width: "100%"}}>
	    <iframe title="resume" src="https://zkirby.github.io/v2/assets/resources/resume/resume.pdf" width="100%" height="100%">
	        <a href="https://zkirby.github.io/v2/assets/resources/resume/resume.pdf"> Resume.pdf </a>
	    </iframe>
	  </div>
	)
}	

const mapDispatchToProps = (dispatch) => {
	return {
		setDisplayUrl: () => {
			dispatch({
				type:"SET-DISPLAY-URL",
				payload: "https://resume.pdf"
			})
		}
	}
} 

export default connect(()=>{}, mapDispatchToProps)(Resume);
