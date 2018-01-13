import React from 'react';

// Professional Pages
import AboutPage from './About/About';
import ResumePage from './Resume/Resume';
import ExperiencePage from './Experience/Experience';
// Logistics Pages
import SearchPage from './Home/Home';
import FOFPage from './404/404';
import DiretoryPage from './Directory/Directory';
// Film Pages
import TopTenPage from './Film/TopTen/TopTen';
// CS Pages
import ProjectsPage from './Projects/Projects';
// Fun Pages
import GamePage from './Game/Game';

import styleguide from './assets/schemes/colors';

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
	'experience': {
		"content": <ExperiencePage />,
		"tab-header": "experience",
		"styles": styleguide['directory']
	},
	'game': {
		"content": <GamePage />,
		"tab-header": "By Zach and Emily",
		"styles": styleguide['directory']
	},
	'top ten': {
		"content": <TopTenPage />,
		"tab-header": "Top Ten Films",
		"styles": styleguide['directory']
	},
	'projects': {
		"content": <ProjectsPage />,
		"tab-header": "projects",
		"styles": styleguide['directory']
	},
	[undefined]: {
		"content": <FOFPage />,
		"tab-header":"404",
		"styles": styleguide['about']
	}
}

export default master_list;