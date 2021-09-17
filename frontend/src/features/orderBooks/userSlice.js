import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isSignIn: false,
    },
    reducers: {
        userSignIn: (state) => {
            state.isSignIn = true;
        },
        userSignOut: (state) => {
            state.isSignIn = false;
        },
    },
});

export const {userSignIn, userSignOut} = userSlice.actions;

export default userSlice.reducer;