import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import WindowTab from './WindowTab';
import store from '../../../reducers/store';

import './WindowContent.css';

class WindowContent extends Component {

	constructor(props) {
		super(props);
		this.props = props;

		this.current_tabs = this.props.current_tabs;
		this.initial_render = this.current_tabs !== undefined;

	}

	componentDidMount() {
		this.subsciption = 
		store.subscribe(() => {
			this.current_tabs = store.getState().live_tabs[this.props.wid];
			this.active_window = store.getState().active_window;
		});

		this.props.spawnDefaultTab();
		this.initial_render = true;
	}

	componentWillUnmount() {
		this.subsciption();
	}

	componentWillUpdate() {
		let tab_bodies = [];

		for (let val of this.current_tabs) {
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
			let is_active = this.active_window === this.props.wid;
			if (e.keyCode === 23) {
				// Need to kill active tab
				console.log(this.tab_bodies);
			} else if (e.keyCode === 20 && is_active) {
				this.props.spawnDefaultTab();
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
		      		<div className="search"></div>
		      		<div className="content">
		      			
		      		</div>
		      	</div>
		   	</Draggable>
    	);
  	}
}

const mapStateToProps = (state, ownProps) => ({

	current_tabs: state.live_tabs[ownProps.wid],
	current_content: state.active_content

});

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
    },
    setActive: () => {
    	dispatch({
    		type:"NEW-ACTIVE-WINDOW",
    		payload: ownProps.wid
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