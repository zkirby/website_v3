const modalReducer = function(state, action) {

	let { type } = action;

	if (type === "MODAL-STATE") {

		return action.payload;

	} else if (state === undefined) {
		return "none";
	}

	return state;
}

export default modalReducer;