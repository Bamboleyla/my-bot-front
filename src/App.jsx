/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";
import { Header } from "./components/Header/Header";
import { ProductList } from "./components/ProductList/ProductList";
import { Form } from "./components/Forms/Form";
import { useTelegram } from "./hooks/useTelegram";
import { Calendar } from "./components/Calendar/Calendar";
import { useAppDispatch } from "./hooks/redux";
import { todayDateSlice } from "./store/reducers/TodayDateSlice";

export const App = () => {
  const { getDate } = todayDateSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    //Загрузка текушей даты в store
    dispatch(getDate());
  }, []);

  const { tg } = useTelegram();
  //Метод который подсказывает Telegram, что наше приложение полностью инициализировалось
  useEffect(() => tg.ready(), []);

  return (
    <div className={styles.body}>
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
        <Route path={"calendar"} element={<Calendar />} />
      </Routes>
    </div>
  );
};
