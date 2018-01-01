import React from 'react';

import SearchPage from './Home/Home';
import AboutPage from './About/About';

// A mapping from url to content(jsx)
const master_list = {
	'home': [<SearchPage />, "welcome home"],
	'about': [<AboutPage />, "about"]
}

export default master_list;