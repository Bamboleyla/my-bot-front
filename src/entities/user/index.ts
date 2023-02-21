import { initialState } from "./initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuth(state) {
      state.isLoading = true;
    },
    userAuthSuccess(
      state,
      action: PayloadAction<{
        id: number;
        name: string;
      }>
    ) {
      state.isLoading = false;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    userAuthError(state, action) {
      state.isLoading = false;
      console.error(action.payload);
    },
    setDarkBrowserMode(state, action) {
      state.isDarkBrowserModeEnabled = action.payload.value;
    },
  },
});
