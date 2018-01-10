import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../../reducers/store';

import './QuestionModal.css';

class QuestionModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			display: props.display
		}
	} 

	componentDidMount() {
		this.subscription = store.subscribe(()=>{
			const display = store.getState().modal_display;
			this.setState({ display });
		})
	}

	componentWillUnmount() {
		this.subscription();
	}

	render() {

		const { display } = this.state;
		const { alter_modal_state } = this.props;

		return (
			<div style={{display}}>
				<div className="modal-overlay" onClick={ ()=> { alter_modal_state("none"); } }></div>
				<div id="modal-body">
					<div id="modal-header">
						<div className="modal-header-text">How to use this website</div>
						<div className="modal-header-exit" onClick={ ()=> { alter_modal_state("none"); } }>x</div>
					</div>
					<div id="modal-body-sub">
						<div className="modal-body-sub-text">
						Use this website just like you would a web browser. You can search for and explore the multiple websites
						reachable by this browser. I would suggest searching for about.com or directory.edu first :). To 
						open a new window, press ctrl+n, to open a new tab, press ctrl+t.
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  display: state.modal_display,
});

const mapDispatchToProps = dispatch => {
  return {
    alter_modal_state: (new_modal_state) => {
      dispatch({
        type:"MODAL-STATE",
        payload: new_modal_state
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionModal);

