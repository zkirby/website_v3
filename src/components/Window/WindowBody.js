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
var counter = 0;
class WindowBody extends Component {

  constructor(props) {
    super(props);

    this.state = {
      windows: this.props.live_windows,
      order: this.props.window_order
    }
    this.live_windows = [];
  }

  componentDidMount() {
    this.subsciption = store.subscribe(() => {
      let { windows, order } = store.getState().live_windows;

      this.setState({ windows, order });
    });

    this.props.spawn_default_window();

    document.onkeypress = (e) => {
      if (e.keyCode === 14 && this.live_windows.length < 3) {
        this.props.spawn_default_window();
      }
    }
  }

  componentWillUnmount() {
    this.subsciption();
  }

  componentWillUpdate(nextProps, nextState) {
    let live_windows = [];

    for (let window_id of nextState.order) {
      live_windows.push(nextState.windows[window_id]);
    }

    this.live_windows = live_windows;
  }

  render() {

    if (this.live_windows.length === 0) {
      return (
        <div className="new-tab-text">Press control+n to open a new window</div>
        );
    } else {
      return (
        <div className="WindowBody">
  	      	{ this.live_windows }
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  live_windows: state.live_windows["windows"],
  window_order: state.live_windows["order"]
});

const mapDispatchToProps = dispatch => {
  return {
    spawn_default_window: () => {
      let window_id = Symbol(counter++ + "");
      dispatch(
      {
        type:"SPAWN-WINDOW", 
        payload: [window_id, <WindowContent key={ uuidv1() } wid={ window_id }/>]
      });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowBody);




