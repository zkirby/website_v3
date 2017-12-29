import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
//import Resizable from 're-resizable';
import keydown from 'react-keydown';

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
		// needed for ctrl+t/w 
		this.prev_key = 0;
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
							this.props.spawnDefaultTab();
						}
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

export default keydown(connect(mapStateToProps, mapDispatchToProps)(WindowContent));


/* 
== GRAVEYARD == 
<ResizableBox width={150} height={150} className="resize-content"
minConstraints={[100, 100]} maxConstraints={[300, 300]}>
</ResizableBox>
*/