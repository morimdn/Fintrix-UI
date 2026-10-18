import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter/wght.css";
import "antd/dist/reset.css";
import "@techosoul/ui/styles.css";
import "./styles.css";
import App from "./App";
import { TechosoulProvider } from "@techosoul/ui";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TechosoulProvider>
      <App />
    </TechosoulProvider>
  </React.StrictMode>,
);
