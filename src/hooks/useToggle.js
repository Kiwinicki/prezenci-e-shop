import { useState } from 'react';

const useToggle = (initialState = false) => {
	const [state, setState] = useState(initialState);

	const toggler = (state) => setState((prev) => (typeof state === 'boolean' ? state : !prev));

	return [state, toggler];
};

export default useToggle;
