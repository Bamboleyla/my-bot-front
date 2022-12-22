/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";
import { ProductList } from "./components/ProductList/ProductList";
import { Form } from "./components/Forms/Form";
import { useTelegram } from "./hooks/useTelegram";
import { Calendar } from "./components/Calendar/Calendar";
import { useAppDispatch } from "./hooks/redux";
import { todayDateSlice } from "./store/reducers/TodayDateSlice";
import { Office } from "./pages/Office/Office";
import { Authorization } from "./pages/Authorization/Authorization";
import { Registration } from "./pages/Registration/Registration";
import { userSlice } from "./store/reducers/UserSlice";

export const App = () => {
  const dispatch = useAppDispatch();

  const { getDate } = todayDateSlice.actions;
  const { setDarkBrowserMode } = userSlice.actions;

  const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    dispatch(getDate());
    dispatch(setDarkBrowserMode({ value: darkModePreference.matches }));
  }, []);

  const { tg } = useTelegram();
  //Метод который подсказывает Telegram, что наше приложение полностью инициализировалось
  useEffect(() => tg.ready(), []);

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
          <Route index element={<ProductList />} />
          <Route path={"form"} element={<Form />} />
          <Route path={"calendar"} element={<Calendar />} />
          <Route path={"auth"} element={<Authorization />} />
          <Route path={"registration"} element={<Registration />} />
          <Route path={"office/:user_id"} element={<Office />} />
        </Routes>
      </div>
    </div>
  );
};
