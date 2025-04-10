// components/MatxTheme/index.jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useSettings from "app/hooks/useSettings";
import getThemeOptions from "./themeOptions";

export const MatxTheme = ({ children }) => {
  const { settings } = useSettings();

  const mode = settings.activeTheme === "blueDark" ? "dark" : "light";
  const themeOptions = getThemeOptions(mode);
  const theme = createTheme({
    ...themeOptions,
    ...(settings.themes?.[settings.activeTheme] || {})
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
