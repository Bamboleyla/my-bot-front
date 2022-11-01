import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todayDateReducer from "./reducers/TodayDateSlice";

const rootReducer = combineReducers({
  todayDateReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
