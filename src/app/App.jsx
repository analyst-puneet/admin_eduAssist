import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
// ROOT THEME PROVIDER
import { MatxTheme } from "./components";
// ALL CONTEXTS
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./routes";

 function App() {
  const content = useRoutes(Routes);

  return (
    <SettingsProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
    </SettingsProvider>
  );
}

export default App;