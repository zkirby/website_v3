const windowReducer = function(state, action) {
	
	let { type } = action;

	if (type === "KILL-WINDOW") {

		let new_state = {};

		// manual deep clone to optimize
		new_state["windows"] = Object.assign({}, state["windows"]);
		new_state["order"] = [...state["order"]];

		delete new_state["windows"][action.payload];

		let delete_index = new_state["order"].indexOf(action.payload);

		if (delete_index > -1) {
			new_state["order"].splice(delete_index, 1);
		}

		return new_state;

	} else if (type === "SPAWN-WINDOW") {

		let new_state = {};

		// manual deep clone to optimize
		new_state["windows"] = Object.assign({}, state["windows"]);
		new_state["order"] = [...state["order"]];

		// Assign new state properties 
		new_state["windows"][action.payload[0]] = action.payload[1];
		new_state["order"].push(action.payload[0]);

		return new_state;

	} else if (type === "BRING-FORWARD-WINDOW") {

		let new_state = {};

		// manual deep clone to optimize
		new_state["windows"] = Object.assign({}, state["windows"]);
		new_state["order"] = [...state["order"]];

		let delete_index = new_state["order"].indexOf(action.payload);

		if (delete_index > -1) {
			new_state["order"].splice(delete_index, 1);
			new_state["order"].push(action.payload);
		}

		return new_state;

	} else if (state === undefined) {
		return {"windows":{}, "order":[]};
	}

	return state;
}

export default windowReducer;