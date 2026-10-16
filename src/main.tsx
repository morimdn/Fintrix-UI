import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./styles.css";
import App from "./App";
import { FintrixProvider } from "./system";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FintrixProvider>
      <App />
    </FintrixProvider>
  </React.StrictMode>,
);
