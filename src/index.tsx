/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/index";
import { setupStore } from "./entities/store";

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
