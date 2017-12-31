const searchReducer = function(state, action) {

	let { type } = action;

	if (type === "SEARCH-REQUEST") {

		let new_state = Object.assign(state, {});
		new_state["url"] = action.payload;
		new_state["ctrl"] = 1;

		return new_state;

	} else if (type === "SEARCH-ACKNOWLEDGE") {

		let new_state = Object.assign(state, {});
		new_state["url"] = "";
		new_state["ctrl"] = 0;

		return new_state;

	} else if (state === undefined) {	
		return {};
	}

	return state;
}

export default searchReducer;