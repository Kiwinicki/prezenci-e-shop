import { createSlice } from "@reduxjs/toolkit";
import { getDoc } from "firebase/firestore";

import { upcomingHolidayRef } from "../firebase-config";

export const holidaySlice = createSlice({
	name: "upcoming_holiday",
	initialState: {
		value: { key: "", path: "", name: "" },
	},
	reducers: {
		getKey: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const getHolidayKey = () => (dispatch) => {
	(async () => {
		const docSnap = await getDoc(upcomingHolidayRef);

		if (docSnap.exists) {
			dispatch(getKey(docSnap.data()));
		} else {
			console.error("Download upcoming holiday failed");
		}
	})();
};

export default holidaySlice.reducer;

export const { getKey } = holidaySlice.actions;
