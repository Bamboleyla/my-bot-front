import "./App.css";
const tg = window.Telegram.WebApp;

function App() {
  useEffect = (() => tg.ready(), []); //Метод который подсказывает Telegram, что наше приложение полностью инициализировалось

  const onClose = () => tg.close();

  return (
    <div className="App">
      Work!
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
