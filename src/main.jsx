import React from "react";
import ReactDOM from "react-dom/client";
import { UseSmoothScroll } from "smooth-motion";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <UseSmoothScroll speed={1.5} />
      <App />
    </>
  </React.StrictMode>,
);
