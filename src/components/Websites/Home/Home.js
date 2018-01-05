import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputValue: "",
		}
	}

	handleSearch(e) {
		e.stopPropagation();
		this.props.search_request(this.state.inputValue);
	}

	render() {

		const { inputValue } = this.state;

		return (
			<div id="content-body">
				<div id="search-body">
					<div className="logo">home</div>
					<div className='input-wrapper'>
			        <input
			          onChange={(e)=>{this.setState({inputValue:e.target.value})}}
			          placeholder='Search...'
			          value={inputValue}
			          spellCheck={false}
			          />
			        <span className='input-highlight'>
			          { inputValue.replace(/ /g, "\u00a0") }
			        </span>
			      </div>
					<div onClick={(e)=>{this.handleSearch(e)}} className="search-button">
						<i className="fa fa-search" aria-hidden="true"></i>
					</div>
					
				</div>
			</div>
		)
	}
	
}

const mapDispatchToProps = dispatch => {
  return {
    search_request: (request) => {
      dispatch(
      {
        type: "SEARCH-REQUEST", 
        payload: request
      });
    }
  }
};

export default connect(()=>({}), mapDispatchToProps)(Home);





/* 
==========
GRAVEYARD
==========


<div className="search-guide">
						Lost? Try searching { que[quetext] }
					</div>

// componentDidMount() {
	// 	this.interval = setInterval(()=>{
	// 		let { quetext, que } = this.state;

	// 		quetext++;

	// 		if (quetext > que.length-1) {
	// 			quetext = 0;
	// 		}

	// 		this.setState({ quetext });
	// 	}, 2000);
	// }

	// componentWillUnMount() {
	// 	clearInterval(this.interval);
	// }

	quetext: 0,
			que: [<div className="sub search-fadein">about</div>, 
			      <div className="sub search-fadein">projects</div>, 
			      <div className="sub search-fadein">resume</div>, 
			      <div className="sub search-fadein">experience</div>],
*/