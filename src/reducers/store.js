import { createStore, combineReducers } from 'redux';
import live_windows from './windowReducer';
import live_tabs from './tabReducer';
import tabURL from './tabURLReducer';
import active_window from './active/activeWindowReducer';
import active_tab from './active/activeTabReducer';
import search from './searchReducer';
import modal_display from './modalReducer';
import display_url from './displayURLReducer';


/*
Live Windows   = obj: { "windows": { window_id: window_jsx }, "order": [window_id_first, etc] }
Live Tabs      = obj: { window_id: [[ tab_id, tab_jsx ], [ tab_id, tab_jsx ]] }
Tab URL        = obj: { tab_id: key_url }
Dis URL        = str: display_url
Active Tab     = obj: { window_id: tab_id }
Active Window  = sym: window_id
Search         = obj: { url: key_url, ctrl: bool }
Modal Display  = str: 'none' or 'block'
*/

/* Notes */
// All webpages are responsible for setting their display_url.
// the key_url is internal to the webpage and used as the key
// for the styles and content managment object.


const starting_obj = {
	live_windows: {"windows": {}, "order": []},
	live_tabs: {},
	tabURL: {},
	active_tab: {},
	search: {},
	active_window: 0,
	modal_display: "none",
	display_url: ""
}
const rootReducer = combineReducers({ live_windows, 
									  live_tabs, 
									  tabURL,
									  active_window, 
									  active_tab,
									  search,
									  modal_display,
									  display_url });

const store = createStore(rootReducer, starting_obj);

export default store;