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
		});

		let tab_id = Symbol();
		this.props.spawnTab([
			tab_id, <WindowTab name="default tab" tid={ tab_id } key={ uuidv1() } wid={ this.props.wid }/> 
		]);

		this.initial_render = true;
	}

	componentWillUnmount() {
		this.subsciption();
	}

	componentWillUpdate() {
		let tab_bodies = [];

		if (this.initial_render) {
			for (let val of this.current_tabs) {
		      tab_bodies.push(val[1]);
		    }

			if (tab_bodies.length === 0) {
				this.props.killWindow();
			}
		}
		this.tab_bodies = tab_bodies;
	}

	hasFocus() {
		console.log("I've been focused");
	}

	render() {	
		
		return (
			<Draggable id="drag">
		      	<div className="WindowContent" onClick={this.hasFocus}>
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