import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter/wght.css";
import "antd/dist/reset.css";
import "./styles.css";
import App from "./App";
import { FintrixProvider } from "./system/ThemeProvider";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FintrixProvider>
      <App />
    </FintrixProvider>
  </React.StrictMode>,
);
