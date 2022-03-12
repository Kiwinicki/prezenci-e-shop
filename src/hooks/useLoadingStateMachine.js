import { useState } from "react";

export const states = {
	empty: "empty",
	isLoading: "loading",
	hasLoaded: "loaded",
	hasError: "error",
};

// uses state machine pattern
export const useLoadingStateMachine = () => {
	const [currentState, setCurrentState] = useState(states.empty);

	const transitions = {
		[states.empty]: {
			[states.isLoading]: states.isLoading,
		},
		[states.isLoading]: {
			[states.hasLoaded]: states.hasLoaded,
			[states.hasError]: states.hasError,
		},
		[states.hasLoaded]: {
			[states.isLoading]: states.isLoading,
		},
		[states.hasError]: {
			[states.isLoading]: states.isLoading,
		},
	};

	const transition = (currentState, action) => {
		const nextState = transitions[currentState][action];
		return nextState || currentState;
	};

	const updateState = (action) => {
		setCurrentState((currentState) => transition(currentState, action));
	};

	const compareState = (state) => {
		return currentState === state;
	};

	return [compareState, updateState];
};
