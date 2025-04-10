// MatxTheme.jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useSettings from "app/hooks/useSettings";
import getThemeOptions from "./themeOptions";

export const MatxTheme = ({ children }) => {
  const { settings } = useSettings();
  const mode = settings.activeTheme === "blueDark" ? "dark" : "light";

  // Step 1: Get base theme options
  const baseThemeOptions = getThemeOptions(mode);
  const baseTheme = createTheme(baseThemeOptions);

  // Step 2: Merge with settings.themes if available
  const userTheme = createTheme(baseTheme, settings.themes?.[settings.activeTheme] || {});

  // Step 3: Merge custom fields manually (like topbarBg)
  const finalTheme = {
    ...userTheme,
    custom: baseThemeOptions.custom // ensure custom props are retained
  };

  return (
    <ThemeProvider theme={finalTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
