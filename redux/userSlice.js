import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, actions) => {
            state.data = [...state?.data, actions?.payload];
        },
        deleteUser: (state, action) => {
            state.data = state.data.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.data = state.data.map(user =>
                user.id === action.payload.id ? { ...user, ...action.payload } : user
            );
        },
    },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
