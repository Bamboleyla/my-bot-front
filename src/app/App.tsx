/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";
import { useAppDispatch } from "../hooks/redux";
import { Authorization } from "../pages/Authorization/Authorization";
import { Registration } from "../pages/Registration/Registration";
import { userSlice } from "../store/reducers/UserSlice";

export const App = () => {
  const dispatch = useAppDispatch();

  const { setDarkBrowserMode } = userSlice.actions;

  const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    dispatch(setDarkBrowserMode({ value: darkModePreference.matches }));
  }, []);

  return (
    <div
      className={
        darkModePreference ? styles.app_dark_mode : styles.app_light_mode
      }
    >
      <div
        className={
          darkModePreference ? styles.body_dark_mode : styles.body_light_mode
        }
      >
        <Routes>
          <Route index element={<Authorization />} />
          <Route path={"auth"} element={<Authorization />} />
          <Route path={"registration"} element={<Registration />} />
        </Routes>
      </div>
    </div>
  );
};
