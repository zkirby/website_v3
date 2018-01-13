import React, { Component } from 'react';
import { connect } from 'react-redux';

import './WindowTab.css';
import store from '../../../reducers/store';
import contentList from '../../Websites/WebsiteMasterList';

class WindowTab extends Component {

	constructor(props) {
		super(props);

    this.state = { is_active_tab: this.props.active_id === this.props.tid,
                   tab_title: contentList[this.props.my_url]['tab-header'],
                   search_url: this.props.my_url,
                   history: ["home"] };
	}

  componentDidMount() {
    this.subscription = store.subscribe(() => {
      let new_id = store.getState().active_tab[this.props.wid];
      let is_active_tab = new_id === this.props.tid; 

      let search_url = store.getState().tabURL[this.props.tid];
      let tab_title = contentList[search_url]['tab-header']; 
      let history = [...this.state.history];

      // If they went to a new page
      if (search_url !== this.state.search_url) {
        history.unshift(search_url);
      }
      
      this.setState({is_active_tab, tab_title, search_url, history});
    });
  }

  componentWillUnmount() {
    this.subscription();
    this.props.removeURL();
  }

  // Kill tab and Stops Bubbling
  killTabSP(e) {
    e.stopPropagation();
    this.props.killTab();
  }


	render() {

    const { is_active_tab, tab_title, search_url } = this.state;
    let full_opacity = '';

    // Custom styling 
    const { favicon, bodyClr, fontClr, exitClr } = contentList[search_url]["styles"]["tab"]; 

    if (is_active_tab) {
      full_opacity = ' full_opacity';
    }

		return (
			  <div className={"tab" + full_opacity} 
             onClick={this.props.focusTab}
             style={{borderBottomColor: bodyClr}}>
            <div className="tab-detail-spine">
        			<i className={ favicon["name"] + " icon-tab"} style={{color: favicon["color"]}} aria-hidden='true'></i>
        			<div className="name-tab" style={{color: fontClr}}> { tab_title } </div>
        			<div className="exit-tab" style={{color: exitClr}} onClick={(e)=>{this.killTabSP(e)}}>X</div>
            </div>
		    </div>
    	);
  	}
}

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