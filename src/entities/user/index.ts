import { initialState } from "./initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLoadingProcess(state, action: PayloadAction<{ value: string }>) {
      state.isLoading = [...state.isLoading, action.payload.value];
    },
    deleteLoadingProcess(state, action: PayloadAction<{ value: string }>) {
      state.isLoading = state.isLoading.filter(
        (process) => process !== action.payload.value
      );
    },
    setDarkBrowserMode(state, action: PayloadAction<{ value: boolean }>) {
      state.isDarkBrowserModeEnabled = action.payload.value;
    },
  },
});
