import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./features/Categories";
import upcomingHolidayReducer from "./features/UpcomimgHoliday";
import authReducer from "./features/Auth";

export default configureStore({
	reducer: {
		categories: categoriesReducer,
		upcomingHoliday: upcomingHolidayReducer,
		auth: authReducer,
	},
});
