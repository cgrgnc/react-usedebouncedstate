import { useEffect, useState } from "react";

export const useDebouncedState = (initialValue, delay = 400) => {
	const [value, setValue] = useState(initialValue);
	const [debouncedValue, setDebouncedValue] = useState(initialValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return [debouncedValue, setValue];
};
