import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "app/contexts/AuthContext";
import App from "./app/App";
import "perfect-scrollbar/css/perfect-scrollbar.css";
let BASE_URL = "https://backend-aufx.onrender.com/";
if (window.location.host == "localhost") {
  BASE_URL = "http://localhost:5000";
}
export { BASE_URL };
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
