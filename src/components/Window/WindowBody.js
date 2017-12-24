import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import WindowContent from './Content/WindowContent';
import store from '../../reducers/store';

import './WindowBody.css';

/*

TODO: Add a way to move focused windows to the 
front. Maybe change live_windows to be - [index, jsx]
and then just update the index, then sort on the index and 
use that to determine the order by rendering them in that order. 

*/

class WindowBody extends Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.live_windows = this.props.live_windows;
    this.windows = [];
  }

  componentDidMount() {
    this.subsciption = store.subscribe(() => {
      this.live_windows = store.getState().live_windows;
    });

    this.props.spawn_default_window();
    this.props.spawn_default_window();
  }

  componentWillUnmount() {
    this.subsciption();
  }

  componentWillUpdate() {
    let windows = [];

    for (let key of Object.getOwnPropertySymbols(this.live_windows)) {
      windows.push(this.live_windows[key]);
    }

    this.windows = windows;
  }

  render() {

    if (this.windows.length === 0) {
      return (
        <div className="new-tab-text">Press cmd+t to open a new tab</div>
        );
    } else {
      return (
        <div className="WindowBody">
  	      	{ this.windows }
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  live_windows: state.live_windows
});

const mapDispatchToProps = dispatch => {
  return {
    spawn_default_window: () => {
      let window_id = Symbol();
      dispatch(
      {
        type:"SPAWN-WINDOW", 
        payload: [window_id, <WindowContent key={ uuidv1() } wid={ window_id }/>]
      });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowBody);




