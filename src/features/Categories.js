import { createSlice } from '@reduxjs/toolkit';
import { collection, query, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase-config';

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		value: [],
	},
	reducers: {
		getData: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const getCategoriesList = () => (dispatch) => {
	let categoriesArr = [];

	const collectionRef = collection(db, 'categories');

	const q = query(collectionRef);

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
