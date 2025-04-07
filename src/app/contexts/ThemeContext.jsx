import { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeToggleProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#121212",
                  paper: "#1E1E1E"
                },
                text: {
                  primary: "#E0E0E0",
                  secondary: "#B0B0B0"
                },
                primary: { main: "#4E9AF1" }
              }
            : {})
        },
        typography: { fontFamily: "Roboto, sans-serif" },
        shape: { borderRadius: 8 }
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
