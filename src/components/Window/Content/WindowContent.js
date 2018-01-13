import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import keydown from 'react-keydown';

import WindowTab from './WindowTab';
import store from '../../../reducers/store';
import contentList from '../../Websites/WebsiteMasterList';

import './WindowContent.css';

/*
BUG - error's on contentList[active_url] with active_url = undefined for
some unknown reason.

BUG - all of the searchs for a given window 
show the exact same thing

[FIXED] BUG - hitting search on one window changes the search 
of another different window.

[DONE] TODO - add support for favicons
[DONE] TODO - finish header and footer
[DONE] TODO - finish about website
TODO - Add bookmarks to header
TODO - Fix drag window out of frame
TODO - Fix refresh on click of tab
*/


class WindowContent extends Component {

	constructor(props) {
		super(props);

		// Defaults 
		this.default = {
			height: 500,
			width: 730
		}

		this.state = {
			         	is_active: this.props.active_window, 
			         	current_tabs: this.props.current_tabs,
			         	active_tab: this.props.active_tab,
			         	curr_height: this.default.height,
			         	curr_width: this.default.width,
			         	search_content: this.props.search_content["url"],
			         	search_state: this.props.search_content["ctrl"],
			         	tab_urls: this.props.tab_urls,
			         	display_url: this.props.display_url
			         };
			         
		// needed for ctrl+t/w 
		this.prev_key = 0;
		// need for tab tracking
		this.tab_bodies = [];
	}

	componentDidMount() {
		this.subsciption = 
		store.subscribe(() => {
			let new_state_tabs = store.getState().live_tabs[this.props.wid];
			let new_active_window = store.getState().active_window === this.props.wid;
			let new_active_tab = store.getState().active_tab[this.props.wid];
			let new_search_content = store.getState().search["url"];
			let new_search_state = store.getState().search["ctrl"];
			let new_tab_urls = store.getState().tabURL;
			let new_display_url = store.getState().display_url;

			this.setState({ current_tabs: new_state_tabs,
							is_active: new_active_window,
							active_tab: new_active_tab,
							search_content: new_search_content,
							search_state: new_search_state,
							tab_urls: new_tab_urls,
							display_url: new_display_url });
		});

		this.spawn_new_tab();
	}

	spawn_new_tab() {
		if (this.tab_bodies.length < 3) {
			let tab_id = this.props.spawnDefaultTab();
			this.props.focusTab(tab_id);
			this.props.setTabURL(tab_id, "home");
		}
	}

	componentWillUnmount() {
		this.subsciption();
	}

	componentWillUpdate(nextProps, nextState) {
		let tab_bodies = [];
		let active_tab_is_alive = false;

		for (let val of nextState.current_tabs) {
	      tab_bodies.push(val[1]);

	      if (val[0] === nextState.active_tab) {
	      	active_tab_is_alive = true;
	      }
	    }

		if (tab_bodies.length === 0) {
			this.props.killWindow();
		} else if (!active_tab_is_alive) {
			this.props.focusTab(nextState.current_tabs[0][0]);
		}
	
		this.tab_bodies = tab_bodies;

		// For a search tab - i.e. home
		if (nextState.search_state === 1 && this.state.is_active) {
			let active_tab_id = nextState.active_tab;

			// Check if the search is valid
			let new_search_content = nextState.search_content;
			if (contentList[new_search_content] === undefined) {
				new_search_content = undefined;
			}

			this.props.setTabURL(active_tab_id, new_search_content);

			this.props.searchACK();
		}
	}

	componentWillReceiveProps( { keydown } ) {
		if (keydown.event) {
			let curr_key = keydown.event.which;

			// If a ctrl was issued and we are working with in an active state
			if (this.prev === 17 && this.state.is_active) {
				switch (curr_key) {
					case (84): 
						this.spawn_new_tab();
						break;
					case (87):
						this.props.killTab(this.state.active_tab);
						break;
					default:
						this.prev = curr_key;
						break;
				}
			} else {
				this.prev = curr_key;
			}	
		}
	}

	hasFocus(e) {
		e.stopPropagation();
		this.props.setActive();
	}

	render() {	

		const { tab_urls, display_url, active_tab, curr_height, curr_width } = this.state;
		const key_url = tab_urls[active_tab];

		const ref = contentList[key_url];
		const content = ref["content"];

		const { backBarClr, fontClr, frontBarClr } = ref["styles"]["search"];
		const { bodyClr } = ref["styles"]["tab"];
		const contentClr = ref["styles"]["contentClr"];

		return (
			<Rnd default={{x: 300, y: 70, height: this.default.height, width: this.default.width}} 
			     onResize={(e, direction, ref, delta, position)=>{
				this.setState({
					curr_width: ref.offsetWidth,
					curr_height: ref.offsetHeight
				});
			}} minWidth="300" minHeight="300">
		      	<div className="WindowContent" onClick={(e)=>{this.hasFocus(e)}}>
		      		<div className="tab-spine" style={{width: curr_width + "px"}}>
		      			{ this.tab_bodies }
		      			<div onClick={(e)=>{this.spawn_new_tab(e)}} className="tab-spawn" style={{background: bodyClr}}></div>
		      		</div>
		      		<div className="search" style={{width: curr_width + "px", background:backBarClr}}>
		      			<div className="search-content" style={{width: (curr_width - 90) + "px", background:frontBarClr, color:fontClr}}> 
		      				<div style={{width: '100%', height: '100%', top: '-1px', position: 'relative'}}> { display_url === undefined ? "https://404.com" : display_url }</div>
		      			 </div>
		      		</div>
		      		<div className="content" 
		      			style={{width: curr_width + "px",
		      					height: curr_height-40 + "px",
		      					background: contentClr }}>
		      			{ content }
		      		</div>
		      	</div>
		   	</Rnd>
    	);
  	}
}

const mapStateToProps = (state, ownProps) => ({

	current_tabs: state.live_tabs[ownProps.wid],
	current_content: state.active_content,
	active_window: state.active_window === ownProps.wid,
	active_tab: state.active_tab[ownProps.wid],
	search_content: state.search,
	tab_urls: state.tabURL,
	display_url: state.display_url

});

	const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    killWindow: () => {
      dispatch({
			type:"KILL-WINDOW",
			payload: ownProps.wid
		});
    },
    setTabURL: (tab_id, url) => {
    	dispatch({
    		type:"SET-URL",
    		payload: [tab_id, url]
    	}) 
    },
    spawnDefaultTab: () => {
    	let tab_id = Symbol();
    	dispatch({
    		type:"SPAWN-TAB",
    		payload: {
    			id: ownProps.wid,
    			content: [ tab_id, 
    			<WindowTab tid={ tab_id } key={ uuidv1() } wid={ ownProps.wid } /> ]
    		}
    	})
    	return tab_id;
    },
    setActive: () => {
    	dispatch({
    		type:"NEW-ACTIVE-WINDOW",
    		payload: ownProps.wid
    	})
    	dispatch({
    		type:"BRING-FORWARD-WINDOW",
    		payload: ownProps.wid
    	})
    },
    killTab: (tab_id) => {
    	dispatch({
    		type:"KILL-TAB",
    		payload: {
	          window_id: ownProps.wid,
	          tab_id: tab_id
	        }
    	})
    	dispatch({
    		type:"REMOVE-URL",
    		payload: tab_id
    	})
    },
    focusTab: (tab) => {
      dispatch({
        type:"NEW-ACTIVE-TAB",
        payload: {
          window_id: ownProps.wid,
          tab: tab
        }
      })
    },
    searchACK: () => {
    	dispatch({
    		type: "SEARCH-ACKNOWLEDGE"
    	})
    }
  }
};

export default keydown(connect(mapStateToProps, mapDispatchToProps)(WindowContent));


/* 
== GRAVEYARD == 
<ResizableBox width={150} height={150} className="resize-content"
minConstraints={[100, 100]} maxConstraints={[300, 300]}>
</ResizableBox>
*/