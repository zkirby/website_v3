import React from 'react';
import { Input } from 'semantic-ui-react'

import './Home.css';

const Home = () => {
	return (
		<div id="content-body">
			<div className="logo">Home</div>
			<Input className="search-input" icon='search' placeholder='Search...' />
		</div>
	)
}

export default Home;