import React from 'react';
import { connect } from 'react-redux';

import './Game.css';

const Game = (props) => {

	props.setDisplayUrl();

	return (
	  <div style={{height: "100%", width: "100%"}}>
	  	<iframe title="game" src="https://zkirby.github.io/v2/playground/question4.html" width="100%" height="100%">
	        <a href="https://zkirby.github.io/v2/playground/question4.html"> Game </a>
	    </iframe>
	  </div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		setDisplayUrl: () => {
			dispatch({
				type:"SET-DISPLAY-URL",
				payload: "https://game.io"
			})
		}
	}
} 

export default connect(()=>({}), mapDispatchToProps)(Game);

