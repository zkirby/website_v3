const activeTabReducer = function(state, action) {

	let { type } = action;

	if (type === "NEW-ACTIVE-TAB") {
		let new_state = Object.assign({}, state);
		new_state[action.payload.window_id] = action.payload.tab_id;
		return new_state;

	} else if (state === undefined) {
		return {};
	}
	
	return state;
}

export default activeTabReducer;