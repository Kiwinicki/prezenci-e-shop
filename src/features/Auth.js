import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

const initialState = {
	isLoggedIn: false,
	isAdmin: false,
	address: "",
	phone: "",
	userName: "Anonim",
	email: "",
	creationTime: null,
	lastLogin: null,
};

export const authSlice = createSlice({
	name: "log_in",
	initialState,
	reducers: {
		setAuthState: (state, action) => {
			state.isAdmin = action.payload.isAdmin;
			state.isLoggedIn = action.payload.isLoggedIn;
			state.address = action.payload.address;
			state.phone = action.payload.phone;
			state.userName = action.payload.userName;
			state.email = action.payload.email;
			state.creationTime = action.payload.creationTime;
			state.lastLogin = action.payload.lastLogin;
		},
		updateAuthState: (state, action) => {
			const newValues = {};
			for (const [key, val] of Object.entries(action.payload)) {
				if (val) newValues[key] = val;
			}

			const userRef = doc(db, "users", auth.currentUser.uid);
			updateDoc(userRef, newValues);
			const newState = { ...state, ...newValues };
			return newState;
		},
	},
});

export const changeAuthState = () => (dispatch) => {
	onAuthStateChanged(auth, async (user) => {
		if (user === null) {
			dispatch(setAuthState(initialState));
		}

		try {
			const userAdditionalData = await getDoc(doc(db, "users", user.uid));
			const userObj = userAdditionalData.data();
			const isAdmin = userObj.userRole === "admin" ? true : false;

			dispatch(
				setAuthState({
					isLoggedIn: true,
					isAdmin: isAdmin,
					address: userObj.address,
					phone: userObj.phone,
					userName: userObj.userName,
					email: userObj.email,
					creationTime: user.metadata.createdAt,
					lastLogin: user.metadata.lastLoginAt,
				})
			);
		} catch (error) {
			console.log(error);
		}
	});
};

export const { setAuthState, updateAuthState } = authSlice.actions;

export default authSlice.reducer;
