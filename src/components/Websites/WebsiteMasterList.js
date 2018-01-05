import React from 'react';

import SearchPage from './Home/Home';
import AboutPage from './About/About';

import styleguide from './assets/schemes/colors';

// A mapping from url to content(jsx)
const master_list = {
	'home': {
		"content": <SearchPage />,
		"tab-header":  "welcome home",
		"styles": styleguide['home']
	},
	'about': {
		"content": <AboutPage />,
		"tab-header": "about",
		"styles": styleguide['about']
	},
	"": {
		"content": "",
		"tab-header":"",
		"styles": styleguide['about']
	}
}

export default master_list;