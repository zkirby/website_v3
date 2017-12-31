import { createStore, combineReducers } from 'redux';
import live_windows from './windowReducer';
import live_tabs from './tabReducer';
import tabURL from './tabURLReducer';
import active_window from './active/activeWindowReducer';
import active_tab from './active/activeTabReducer';
import search from './searchReducer';
import controls from './controlReducer';


/*
Live Windows   = obj: { window_id: window_jsx }
Live Tabs      = obj: { window_id: [[ tab_id, tab_jsx ], [ tab_id, tab_jsx ]] }
Tab URL        = obj: { tab_id: url }
Active Tab     = obj: { window_id: tab_id }
Active Window  = int: window_id
Controls       = obj: { cntrl_signal: int }
Search         = obj: { url: url_path, ctrl: bool }
*/


const starting_obj = {
	live_windows: {},
	live_tabs: {},
	tabURL: {},
	active_tab: {},
	controls: {},
	search: {},
	active_window: 0
}
const rootReducer = combineReducers({ live_windows, 
									  live_tabs, 
									  tabURL,
									  active_window, 
									  active_tab,
									  controls,
									  search });

const store = createStore(rootReducer, starting_obj);

export default store;