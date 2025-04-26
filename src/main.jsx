import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "app/contexts/AuthContext";
import App from "./app/App";
import "perfect-scrollbar/css/perfect-scrollbar.css";
export const BASE_URL = "https://backend-aufx.onrender.com";
// const BASE_URL = "https://backend-aufx.onrender.com";
// if (window.location.host == "localhost:5173") {
// }
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

