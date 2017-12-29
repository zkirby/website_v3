import React, { Component } from 'react';
import { connect } from 'react-redux';

import './WindowTab.css';
import store from '../../../reducers/store';

class WindowTab extends Component {

	constructor(props) {
		super(props);
		this.name = props.name;

    this.state = { is_active_tab: this.props.active_id === this.props.tid };
	}

  componentDidMount() {
    this.subscription = store.subscribe(() => {
      let new_id = store.getState().active_tab[this.props.wid][0];
      let is_active_tab = new_id === this.props.tid; 
      this.setState({is_active_tab});
    });
  }

  componentWillUnmount() {
    this.subscription();
  }

  // Kill tab and Stop Bubbling (Propagation)
  killTabSP(e) {
    e.stopPropagation();
    this.props.killTab();
  }


	render() {

    let full_opacity = '';

    if (this.state.is_active_tab) {
      full_opacity = ' full_opacity';
    }

		return (
			  <div className={"tab" + full_opacity} onClick={this.props.focusTab}>
      			<div className="icon-tab"></div>
      			<div className="name-tab">{this.name}</div>
      			<div className="exit-tab" onClick={(e)=>{this.killTabSP(e)}}>X</div>
		    </div>
    	);
  	}
}

/*

Need to make a function if someone manually kills a tab and how to 
handle what happens to the current active tab.

add new state event that is flipped to a 1 if the tab for 
that window was killed 

*/

const mapStateToProps = (state, ownProps) => ({
  active_id: state.active_tab[ownProps.wid][0]
});
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
    },
    focusTab: () => {
      dispatch({
        type:"NEW-ACTIVE-TAB",
        payload: {
          window_id: ownProps.wid,
          tab: [ownProps.tid, ownProps.tab_url]
        }
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowTab);