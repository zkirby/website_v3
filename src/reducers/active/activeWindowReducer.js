const activeWindowReducer = function(state, action) {

	let { type } = action;

	if (type === "NEW-ACTIVE-WINDOW") {
		return action.payload;

	} else if (state === undefined) {
		return 0;
	}

	return state;
}

export default activeWindowReducer;