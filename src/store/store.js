import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../features/Categories";
import upcomingHolidayReducer from "../features/UpcomimgHoliday";
import authReducer from "../features/Auth";
import cartReducer from "../features/Cart";

export default configureStore({
	reducer: {
		categories: categoriesReducer,
		upcomingHoliday: upcomingHolidayReducer,
		auth: authReducer,
		cart: cartReducer,
	},
});
