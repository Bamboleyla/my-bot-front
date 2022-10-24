import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./app.module.scss";
import { Header } from "./components/Header/Header";
import { ProductList } from "./components/ProductList/ProductList";
import { Form } from "./components/Forms/Form";
import { useTelegram } from "./hooks/useTelegram";
import { Calendar } from "./components/Calendar/Calendar";

export const App = () => {
  const { tg } = useTelegram();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => tg.ready(), []); //Метод который подсказывает Telegram, что наше приложение полностью инициализировалось

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
