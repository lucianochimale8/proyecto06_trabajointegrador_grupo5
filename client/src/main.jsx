import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AutorizacionProvider } from "./context/AutorizacionContext.jsx";
import App from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AutorizacionProvider>
      <div className="floating-particles"></div>
      <App />
    </AutorizacionProvider>
  </StrictMode>
);
