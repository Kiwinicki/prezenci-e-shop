import { createSlice } from "@reduxjs/toolkit";
import { query, onSnapshot } from "firebase/firestore";

import { catRef } from "../firebase-config";

export const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		value: [], // { key: "", name: "", slug: "" }
	},
	reducers: {
		getData: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const getCategoriesList = () => (dispatch) => {
	let categoriesArr = [];

	const q = query(catRef);

	onSnapshot(q, (snapshot) => {
		try {
			categoriesArr.push(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			dispatch(getData(...categoriesArr));
		} catch (err) {
			console.error(err.message);
		}
	});
};

export default categoriesSlice.reducer;

export const { getData } = categoriesSlice.actions;
