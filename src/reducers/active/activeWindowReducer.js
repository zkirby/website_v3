const activeWindowReducer = function(state, action) {

	let { type } = action;

	if (type === "NEW-ACTIVE-WINDOW") {
		let new_state = action.payload
		return new_state;

	} else if (state === undefined) {
		return 0;
	}

	return state;
}

export default activeWindowReducer;