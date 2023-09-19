/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./app.module.scss";
import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { userSlice } from "../entities/user";
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
    <div className={style} data-testid={"App"}>
      <Routing />
    </div>
  );
};
