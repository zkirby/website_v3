import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			input: ""
		}
	}

	handleSearch(e) {
		e.stopPropagation();
		this.props.search_request(this.state.input);
	}

	render() {
		return (
			<div id="content-body">
				<div id="search-body">
					<div className="logo">Home</div>
					<Input className="search-input" icon='search' placeholder='Search...' 
					onChange={(event, data)=> {
						this.setState({input: data.value});
					}}/>
					<div onClick={(e)=>{this.handleSearch(e)}} className="search-button slide">search</div>
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