import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "@firebase/firestore";

const initialState = {
	isLoggedIn: false,
	isAdmin: false,
};

export const authSlice = createSlice({
	name: "log_in",
	initialState,
	reducers: {
		setAuthState: (state, action) => {
			state.isAdmin = action.payload.isAdmin;
			state.isLoggedIn = action.payload.isLoggedIn;
		},
	},
});

export const changeAuthState = () => (dispatch) => {
	onAuthStateChanged(auth, async (user) => {
		console.log("auth state changed");
		if (user === null) {
			dispatch(setAuthState(initialState));
		} else {
			const userAdditionalData = await getDoc(doc(db, "users", user.uid));
			const isAdmin = userAdditionalData.data().userRole === "admin" ? true : false;

			dispatch(setAuthState({ isLoggedIn: true, isAdmin: isAdmin }));
		}
	});
};

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
