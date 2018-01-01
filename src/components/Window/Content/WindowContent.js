import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import keydown from 'react-keydown';

import WindowTab from './WindowTab';
import store from '../../../reducers/store';
import contentList from '../../Websites/WebsiteMasterList';

import './WindowContent.css';


class WindowContent extends Component {

	constructor(props) {
		super(props);
		this.props = props;

		this.state = {
			         	active_window: this.props.active_window, 
			         	current_tabs: this.props.current_tabs,
			         	active_tab: this.props.active_tab,
			         	curr_height: 350,
			         	curr_width: 500,
			         	search_content: this.props.search_content["url"],
			         	search_state: this.props.search_content["ctrl"],
			         	tab_urls: this.props.tab_urls
			         };
			         
		// needed for ctrl+t/w 
		this.prev_key = 0;
	}

	componentDidMount() {
		this.subsciption = 
		store.subscribe(() => {
			let new_state_tabs = store.getState().live_tabs[this.props.wid];
			let new_active_window = store.getState().active_window;
			let new_active_tab = store.getState().active_tab[this.props.wid];
			let new_search_content = store.getState().search["url"];
			let new_search_state = store.getState().search["ctrl"];
			let new_tab_urls = store.getState().tabURL;

			this.setState({ current_tabs: new_state_tabs,
							active_window: new_active_window,
							active_tab: new_active_tab,
							search_content: new_search_content,
							search_state: new_search_state,
							tab_urls: new_tab_urls });
		});

		let tab_id = this.props.spawnDefaultTab();
		this.props.focusTab(tab_id);
		this.props.setTabURL(tab_id, "home");
	}

	componentWillUnmount() {
		this.subsciption();
	}

	componentWillUpdate(nextProps, nextState) {
		let tab_bodies = [];

		for (let val of nextState.current_tabs) {
	      tab_bodies.push(val[1]);
	    }

		if (tab_bodies.length === 0) {
			this.props.killWindow();
		}
	
		this.tab_bodies = tab_bodies;

		// For a search tab - i.e. home
		if (nextState.search_state === 1) {
			this.props.searchACK();

			let active_tab_id = nextState.active_tab;

			this.props.setTabURL(active_tab_id, nextState.search_content);

		}
	}

	componentWillReceiveProps( { keydown } ) {
		if (keydown.event) {
			let curr_key = keydown.event.which;
			let is_active = this.state.active_window === this.props.wid;

			// If a ctrl was issued and we are working with in an active state
			if (this.prev === 17 && is_active) {
				switch (curr_key) {
					case (84): 
						if (this.tab_bodies.length < 3) {
							this.props.setTabURL(this.props.spawnDefaultTab(), "home");
						}
						break;
					case (87):
						this.props.killTab(this.state.active_tab);
						this.props.removeURL(this.state.active_tab);
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

		//console.log(this.tab_bodies);
		//console.log(this.state.tab_urls);

		let active_url = this.state.active_tab === undefined ? "" : this.state.tab_urls[this.state.active_tab];

		console.log(this.state.tab_urls);

		return (
			<Rnd default={{x: 630, y: 0, height: 350, width: 500}} 
			     onResize={(e, direction, ref, delta, position)=>{
				this.setState({
					curr_width: ref.offsetWidth,
					curr_height: ref.offsetHeight
				});
			}} minWidth="300" minHeight="300">
		      	<div className="WindowContent" onClick={(e)=>{this.hasFocus(e)}}>
		      		<div className="tab-spine" style={{width: this.state.curr_width + "px"}}>
		      			{ this.tab_bodies }
		      		</div>
		      		<div className="search" style={{width: this.state.curr_width + "px"}}>
		      			<div className="search-content" style={{width: (this.state.curr_width - 90) + "px"}}> 
		      				<div style={{width: '100%', height: '100%', top: '-1px', position: 'relative'}}>https://{ active_url }.com</div>
		      			 </div>
		      		</div>
		      		<div className="content" 
		      			style={{width: this.state.curr_width + "px",
		      					height: this.state.curr_height-40 + "px" }}>
		      			{ active_url === "" ? "" : contentList[active_url][0] }
		      		</div>
		      	</div>
		   	</Rnd>
    	);
  	}
}

const mapStateToProps = (state, ownProps) => ({

	current_tabs: state.live_tabs[ownProps.wid],
	current_content: state.active_content,
	active_window: state.active_window,
	active_tab: state.active_tab[ownProps.wid],
	search_content: state.search,
	tab_urls: state.tabURL

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
    removeURL: (tab_id) => {
    	dispatch({
    		type:"REMOVE-URL",
    		payload: tab_id
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
    },
    killTab: (tab_id) => {
    	dispatch({
    		type:"KILL-TAB",
    		payload: {
          window_id: ownProps.wid,
          tab_id: tab_id
        }
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