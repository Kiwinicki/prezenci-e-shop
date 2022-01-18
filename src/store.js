import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './features/Categories';

export default configureStore({
	reducer: {
		categories: categoriesReducer,
	},
});
