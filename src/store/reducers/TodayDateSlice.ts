import { createSlice } from "@reduxjs/toolkit";
import { TodayDate } from "../../models/TodayDate";

interface DateState {
  today: TodayDate;
  isLoading: boolean;
  error: string;
}

const initialState: DateState = {
  today: {
    timestamp: null,
    dateOfMonth: null,
    dayOfWeek: null,
    month: 0,
    year: null,
  },
  isLoading: false,
  error: "",
};

export const todayDateSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    getDate(state) {
      const date = new Date();
      state.today.timestamp = date.getTime();
      state.today.dateOfMonth = date.getDate();
      state.today.dayOfWeek = date.getDay();
      state.today.month = date.getMonth();
      state.today.year = date.getFullYear();
    },
  },
});

export default todayDateSlice.reducer;
