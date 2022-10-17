import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { useTelegram } from "./hooks/useTelegram";

export const App = () => {
  const { onToggleButton, tg } = useTelegram();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => tg.ready(), []); //Метод который подсказывает Telegram, что наше приложение полностью инициализировалось

  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
};
