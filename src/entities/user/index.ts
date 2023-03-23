import { initialState } from "./initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./models";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLoadingProcess(state: IUser, action: PayloadAction<{ value: string }>) {
      state.isLoading = [...state.isLoading, action.payload.value];
    },
    deleteLoadingProcess(
      state: IUser,
      action: PayloadAction<{ value: string }>
    ) {
      state.isLoading = state.isLoading.filter(
        (process) => process !== action.payload.value
      );
    },
    setDarkBrowserMode(
      state: IUser,
      action: PayloadAction<{ value: boolean }>
    ) {
      state.isDarkBrowserModeEnabled = action.payload.value;
    },
  },
});
