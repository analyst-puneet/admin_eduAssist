// MatxTheme.jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useSettings from "app/hooks/useSettings";
import getThemeOptions from "./themeOptions";

export const MatxTheme = ({ children }) => {
  const { settings } = useSettings();
  const mode = settings.activeTheme === "blueDark" ? "dark" : "light";

  // Step 1: Base options according to mode
  const baseThemeOptions = getThemeOptions(mode);

  // Step 2: Merge theme-specific colors if present
  const mergedOptions = {
    ...baseThemeOptions,
    ...settings.themes?.[settings.activeTheme],
    custom: {
      ...baseThemeOptions.custom
    }
  };

  const finalTheme = createTheme(mergedOptions);

  return (
    <ThemeProvider theme={finalTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
