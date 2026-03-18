/*
puente entre el componente que creaste en el archivo y el navegador
web.index.jsApp.js
*/

import { StrictMode } from "react";

//Biblioteca de React para comunicarse con navegadores web (React DOM)
import { createRoot } from "react-dom/client";

import "./styles.css";

//El componente que creaste en .App.js
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);