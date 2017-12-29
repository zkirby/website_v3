const controlReducer = function(state, action) {

	let { type } = action;

	if (type === "SET-CONTROL") {

		let new_state = Object.assign(state, {});
		new_state[action.payload.signal_to_set] = action.payload.new_signal_state;

		return new_state;

	} else if (state === undefined) {
		return {};
	}

	return state;
}

export default controlReducer;