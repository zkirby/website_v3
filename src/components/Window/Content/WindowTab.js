import React, { Component } from 'react';
import { connect } from 'react-redux';

import './WindowTab.css';
import store from '../../../reducers/store';
import contentList from '../../Websites/WebsiteMasterList';

class WindowTab extends Component {

	constructor(props) {
		super(props);

    this.state = { is_active_tab: this.props.active_id === this.props.tid,
                   tab_title: contentList[this.props.my_url][1] };
	}

  componentDidMount() {
    this.subscription = store.subscribe(() => {
      let new_id = store.getState().active_tab[this.props.wid];
      let is_active_tab = new_id === this.props.tid; 

      let new_url = store.getState().tabURL[this.props.tid];
      let tab_title = contentList[new_url] === undefined ? "" : contentList[new_url][1]; // The tab.kill() didn't propagate fast enough

      this.setState({is_active_tab, tab_title});
    });
  }

  componentWillUnmount() {
    this.subscription();
    this.props.removeURL();
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
            <div className="tab-detail-spine">
        			<div className="icon-tab"></div>
        			<div className="name-tab">{this.state.tab_title}</div>
        			<div className="exit-tab" onClick={(e)=>{this.killTabSP(e)}}>X</div>
            </div>
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
  active_id: state.active_tab[ownProps.wid],
  my_url: state.tabURL[ownProps.tid]
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
    removeURL: () => {
      dispatch({
        type:"REMOVE-URL",
        payload: ownProps.tid
      })
    },
    focusTab: () => {
      dispatch({
        type:"NEW-ACTIVE-TAB",
        payload: {
          window_id: ownProps.wid,
          tab: ownProps.tid
        }
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowTab);