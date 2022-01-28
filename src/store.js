import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./features/Categories";
import upcomingHolidayReducer from "./features/UpcomimgHoliday";

export default configureStore({
	reducer: {
		categories: categoriesReducer,
		upcomingHoliday: upcomingHolidayReducer,
	},
});
