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
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
        <Route path={"calendar"} element={<Calendar />} />
        <Route path={"auth"} element={<Authorization />} />
        <Route path={"registration"} element={<Registration />} />
        <Route path={"office/:user_id"} element={<Office />} />
      </Routes>
    </div>
  );
};
