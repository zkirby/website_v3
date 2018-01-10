import React from 'react';

import SearchPage from './Home/Home';
import AboutPage from './About/About';
import ResumePage from './Resume/Resume';
import FOFPage from './404/404';
import DiretoryPage from './Directory/Directory';

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
	'resume': {
		"content": <ResumePage />,
		"tab-header": "resume",
		"styles": styleguide['home']
	},
	'directory': {
		"content": <DiretoryPage />,
		"tab-header": "directory",
		"styles": styleguide['directory']
	},
	[undefined]: {
		"content": <FOFPage />,
		"tab-header":"404",
		"styles": styleguide['about']
	}
}

export default master_list;