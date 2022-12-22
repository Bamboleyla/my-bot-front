import { userSlice } from "./reducers/UserSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todayDateReducer from "./reducers/TodayDateSlice";
import { registrationFormSlice } from "./reducers/RegistrationFormSlice";

const rootReducer = combineReducers({
  todayDateReducer,
  userAuth: userSlice.reducer,
  registrationForm: registrationFormSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
