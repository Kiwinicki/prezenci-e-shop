import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import useActualBreakpoint from "../../hooks/useActualBreakpoint";

export const useCarousel = (childrenLen) => {
	const [index, setIndex] = useState(0);

	const isTouchscreen = useMediaQuery("(hover: none)");

	const [breakpointKey, breakpointVal] = useActualBreakpoint();

	const breakpontItemCount = {
		xs: 2,
		sm: 4,
		md: 4,
		lg: 5,
		xl: 5,
	};

	const itemsOnScreen = breakpontItemCount[breakpointKey];

	const moveForward = () => {
		const carouselEnd = childrenLen - itemsOnScreen;
		setIndex((prevIndex) => {
			if (prevIndex < carouselEnd) return prevIndex + 1;
			return prevIndex;
		});
	};

	const moveBack = () => {
		setIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1));
	};

	return { moveForward, moveBack, index, isTouchscreen, itemsOnScreen };
};
