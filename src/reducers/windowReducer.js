const windowReducer = function(state, action) {
	
	let { type } = action;

	if (type === "KILL-WINDOW") {

		let new_state = Object.assign({}, state);
		delete new_state[action.payload];

		return new_state;

	} else if (type === "SPAWN-WINDOW") {

		let new_state = Object.assign({}, state);
		new_state[action.payload[0]] = action.payload[1];

		return new_state;

	} else if (state === undefined) {
		return {};
	}

	return state;
}

export default windowReducer;