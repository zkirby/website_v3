const displayURLReducer = function(state, action) {

	let { type } = action;

	if (type === "SET-DISPLAY-URL") {
		return action.payload;

	} else if (state === undefined) {
		return ""
	}

	return state;
}

export default displayURLReducer;