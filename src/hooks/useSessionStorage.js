import { useState } from "react";

const useSessionStorage = (keyName, defaultValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		const value = sessionStorage.getItem(keyName);

		if (value) {
			return JSON.parse(value);
		} else {
			sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
			return defaultValue;
		}
	});

	const setValue = (newValue) => {
		sessionStorage.setItem(keyName, JSON.stringify(newValue));
		setStoredValue(newValue);
	};

	return [storedValue, setValue];
};

export default useSessionStorage;
