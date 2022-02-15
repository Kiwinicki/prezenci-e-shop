import { useTheme } from "@mui/material";
import useCurrentWidth from "./useCurrentWidth";

/**
 * Returns 2 elements array with breakpoint key and it's value
 * @return  {Array}
 */
const useActualBreakpoint = () => {
	const currentWindowWidth = useCurrentWidth();

	const theme = useTheme();
	const breakpoints = theme.breakpoints.values;
	const breakpointsKeys = Object.keys(breakpoints);

	const breakpointKey = breakpointsKeys.find((key, i) => {
		if (breakpoints[key] <= currentWindowWidth) {
			const nextBreakpoint = breakpoints[breakpointsKeys[i + 1]] || breakpoints[key];

			if (nextBreakpoint > currentWindowWidth) {
				return true;
			}

			// if there are no bigger breakpoints return last
			if (i === breakpointsKeys.length - 1) {
				return true;
			}
		} else return false;
	});

	return [breakpointKey, breakpoints[breakpointKey]];
};

export default useActualBreakpoint;
