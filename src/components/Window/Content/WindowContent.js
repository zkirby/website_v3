import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
//import Resizable from 're-resizable';

import WindowTab from './WindowTab';
import store from '../../../reducers/store';

import './WindowContent.css';

class WindowContent extends Component {

	constructor(props) {
		super(props);
		this.props = props;

		this.state = {
			         	active_window: this.props.active_window, 
			         	current_tabs: this.props.current_tabs,
			         	active_tab: this.props.active_tab
			         };

	}

	componentDidMount() {
		this.subsciption = 
		store.subscribe(() => {
			let new_state_tabs = store.getState().live_tabs[this.props.wid];
			let new_active_window = store.getState().active_window;
			let new_active_tab = store.getState().active_tab[this.props.wid];

			this.setState({ current_tabs: new_state_tabs,
							active_window: new_active_window,
							active_tab: new_active_tab });
		});

		this.props.focusTab(this.props.spawnDefaultTab());
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

		/*
		A jank fix... not sure how to abstract this correctly
		so for right now there is only one onkeypress and it 
		handles everything. Really don't like how windows are created from
		the window_content, but that's how it's gotta be for right now. 
		*/

		// Create window on key down event
		// control + w = kill tab (23)
    	// control + t = new tab (20)
    	// control + n = new window (14)
		document.onkeypress = (e) => {
			let is_active = nextState.active_window === this.props.wid;
			if (is_active) {
				if (e.keyCode === 23) {
					// Kill the most recently used tab
					this.props.killTab(nextState.active_tab);
				} else if (e.keyCode === 20 && this.tab_bodies.length < 5) {
					// Spawn a defualt tab
					this.props.spawnDefaultTab();
				}
			}
			// Don't like this... the window shouldn't know
			// how to spawn other windows... it's def an abstraction
			// break, will fix in the future.
			if (e.keyCode === 14) {
				//this.props.spawn_default_window();
				console.log("HELP")
			}
		}
	}

	hasFocus() {
		this.props.setActive();
	}

	render() {	
		return (
			<Draggable id="drag">
		      	<div className="WindowContent" onClick={(e)=>{this.hasFocus(e)}}>
		      		<div className="tab-spine">
		      			{ this.tab_bodies }
		      		</div>
		      		<div className="search">
		      			<div className="search-content"> https://home.com </div>
		      		</div>
		      		<div className="content">
		      			
		      		</div>
		      	</div>
		   	</Draggable>
    	);
  	}
}

const mapStateToProps = (state, ownProps) => ({

	current_tabs: state.live_tabs[ownProps.wid],
	current_content: state.active_content,
	active_window: state.active_window,
	active_tab: state.active_tab[ownProps.wid]

});


// I don't like this! Just look at how much 
// of the store is being edited by this 
// component alone !!
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    killWindow: () => {
      dispatch({
			type:"KILL-WINDOW",
			payload: ownProps.wid
		});
    },
    spawnTab: (tab_body) => {
    	dispatch({
    		type:"SPAWN-TAB",
    		payload: {
    			id: ownProps.wid,
    			content: tab_body
    		}
    	})
    },
    spawnDefaultTab: () => {
    	let tab_id = Symbol();
    	dispatch({
    		type:"SPAWN-TAB",
    		payload: {
    			id: ownProps.wid,
    			content: [ tab_id, 
    			<WindowTab name="default tab" tid={ tab_id } key={ uuidv1() } wid={ ownProps.wid }/> ]
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
    focusTab: (tab_id) => {
      dispatch({
        type:"NEW-ACTIVE-TAB",
        payload: {
          window_id: ownProps.wid,
          tab_id: tab_id
        }
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowContent);


/* 
== GRAVEYARD == 
<ResizableBox width={150} height={150} className="resize-content"
minConstraints={[100, 100]} maxConstraints={[300, 300]}>
</ResizableBox>
*/