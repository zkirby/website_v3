import React, { Component } from 'react';
import { connect } from 'react-redux';

import './WindowTab.css';

class WindowTab extends Component {

	constructor(props) {
		super(props);
		this.name = props.name;
	}

	render() {	
		return (
			<div className="tab">
      			<div className="icon-tab"></div>
      			<div className="name-tab">{this.name}</div>
      			<div className="exit-tab" onClick={this.props.killTab}>X</div>
		    </div>
    	);
  	}
}

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    killTab: () => {
    	dispatch({
    		type:"KILL-TAB",
    		payload: {
          window_id: ownProps.wid,
          tab_id: ownProps.tid
        }
    	})
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowTab);