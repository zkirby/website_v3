const tabReducer = function(state, action) {

	let { type } = action;

	if (type === "KILL-TAB") {

		let tab_to_kill = action.payload.tab_id;
		let tab_state = state[action.payload.window_id];
		let kill_id = 0;
		let i = 0;

		for (let val of state[action.payload.window_id]) {
			if (val[0] === tab_to_kill) {
				kill_id = i;
			}
			i++;
		}

		let new_tab_state = tab_state.slice(0, kill_id)
							.concat(tab_state.slice(kill_id+1));
		let pay_id = action.payload.window_id;

		return { ...state, [pay_id]: new_tab_state };

	} else if (type === "SPAWN-TAB") {

		let new_tab_state = state[action.payload.id];

		if (new_tab_state !== undefined) {
			new_tab_state.push(action.payload.content);
		} else {
			return { ...state, [action.payload.id]: [action.payload.content]};
		}
		
		return { ...state, [action.payload.id]: new_tab_state };

	} else if (state === undefined) {
		return {};
	}

	return state;
}

export default tabReducer;