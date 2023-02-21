import { userSlice } from "../store/reducers/UserSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { registrationFormSlice } from "./registration";

const rootReducer = combineReducers({
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
