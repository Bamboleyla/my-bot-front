/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./app.module.scss";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { userSlice } from "../store/reducers/UserSlice";
import { Routing } from "../pages";

export const App = () => {
  const dispatch = useAppDispatch();

  const { setDarkBrowserMode } = userSlice.actions;

  const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

  const style = darkModePreference
    ? styles.app_dark_mode
    : styles.app_light_mode;

  useEffect(() => {
    dispatch(setDarkBrowserMode({ value: darkModePreference.matches }));
  }, []);

  return (
    <div className={style}>
      <div className={style}>
        <Routing />
      </div>
    </div>
  );
};
