import { createSlice } from "@reduxjs/toolkit";

export const capitalSlice = createSlice({
  name: "capitals",
  initialState: {
    capitals: ["Budapest"],
  },
  reducers: {
    addCity: (state, action) => {
      state.capitals.push(action.payload);
    },
  },
});

export const { addCity } = capitalSlice.actions;

export default capitalSlice.reducer;
