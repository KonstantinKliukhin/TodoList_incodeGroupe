import "./assets/style/index.scss";
import App from "./components/app/App";
import { store } from "./redux/store";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
