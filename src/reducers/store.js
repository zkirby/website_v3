import { createStore, combineReducers } from 'redux';
import windows from './windowReducer';
import tab from './tabReducer';
import active from './activeReducer';
import active_window from './activeWindowReducer';
import active_tab from './activeTabReducer';


/*
Live Windows   = obj: { window_id: window_jsx }
Live Tabs      = obj: { window_id: [[ tab_id, tab_jsx ], [ tab_id, tab_jsx ]] }
Active Content = obj: { tab_id: content_jsx }
Active Tab     = obj: { window_id: tab_id }
Active Window  = int: window_id
*/


const starting_obj = {
	live_windows: {},
	live_tabs: {},
	active_content: {},
	active_tab: {},
	active_window: 0
}
const rootReducer = combineReducers({ live_windows: windows, live_tabs: tab, active_content: active, active_window, active_tab: active_tab });
const store = createStore(rootReducer, starting_obj);

export default store;