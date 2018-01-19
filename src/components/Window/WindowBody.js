import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import WindowContent from './Content/WindowContent';
import store from '../../reducers/store';
import QuestionModal from '../Modals/QuestionModal';

import './WindowBody.css';

/*

[DONE] TODO: Add a way to move focused windows to the 
front. Maybe change live_windows to be - [index, jsx]
and then just update the index, then sort on the index and 
use that to determine the order by rendering them in that order. 
[DONE] TODO: fix the hover effect on the question mark on the header bar
[DONE] TODO: Fix modal
[DONE] TODO: Make 404 page 

*/
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

    const { show_modal, search_request } = this.props; 

    let render_middle = <div></div>;
    if (this.live_windows.length === 0) {
      render_middle = ( <div className="new-tab-text">Press control+n to open a new window</div> );
    } else {
      render_middle = ( <div className="WindowBody"> { this.live_windows } </div> );
    }

    return (
      <div style={{height: "100%", width: "100%"}}>
        <div id="left-header-spine">
            <div className="left-header-spine-item">Bookmarks:</div>
            <div className="left-header-spine-item left-header-clickable" onClick={ ()=>{ search_request("directory") }}>directory,</div>
            <div className="left-header-spine-item left-header-clickable" onClick={ ()=>{ search_request("home")} }>home,</div>
            <div className="left-header-spine-item left-header-clickable" onClick={ ()=>{ search_request("about")} }>about</div>
        </div>
        <div id="right-header-spine">
          <i className="fa fa-question-circle-o header-question" aria-hidden="true" onClick={()=>{show_modal()}}></i>
          <div className="header-name">Zachary Kirby</div>
        </div>
        { render_middle }
        <div id="footer-spine">
          <div>controls: to open a new window - ctrl+n; to open a new tab - ctrl+t; to close a tab - ctrl+w</div>
        </div> 
        <QuestionModal />
      </div>

    )
  }
}

const mapStateToProps = state => ({
  live_windows: state.live_windows["windows"],
  window_order: state.live_windows["order"]
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
      dispatch({
        type:"NEW-ACTIVE-WINDOW",
        payload: window_id
      })
    },
    search_request: (request) => {
      dispatch(
      {
        type: "SEARCH-REQUEST", 
        payload: request
      });
    },
    show_modal: () => {
      dispatch({
        type:"MODAL-STATE",
        payload: "block"
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowBody);




