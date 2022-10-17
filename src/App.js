import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { ProductList } from "./components/ProductList/ProductList";
import { Form } from "./components/Forms/Form";
import { useTelegram } from "./hooks/useTelegram";

export const App = () => {
  const { onToggleButton, tg } = useTelegram();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => tg.ready(), []); //Метод который подсказывает Telegram, что наше приложение полностью инициализировалось

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
};
