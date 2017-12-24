import { createStore, combineReducers } from 'redux';
import windows from './windowReducer';
import tab from './tabReducer';
import active from './activeReducer';


/*
Live Windows   = obj: { window_id: window_jsx }
Live Tabs      = obj: { window_id: [[ tab_id, tab_jsx ], [ tab_id, tab_jsx ]] }
Active_Content = obj: { tab_id: content_jsx }
*/


const starting_obj = {
	live_windows: {},
	live_tabs: {},
	active_content: {}
}
const rootReducer = combineReducers({ live_windows: windows, live_tabs: tab, active_content: active });
const store = createStore(rootReducer, starting_obj);

export default store;