import { red } from "@mui/material/colors";
import { components } from "./components";

const getThemeOptions = (mode = "light") => {
  return {
    typography: {
      fontSize: 14,
      body1: { fontSize: "14px" }
    },
    status: { danger: red[500] },
    components: { ...components },

    palette: {
      mode, // This is the key change - using the actual mode
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e"
            },
            text: {
              primary: "#ffffff", // More pure white
              secondary: "#b0b0b0"
            }
          }
        : {
            background: {
              default: "#f4f6f8",
              paper: "#ffffff"
            },
            text: {
              primary: "#1A1A1A", // Darker for better contrast
              secondary: "#666666"
            }
          })
    },

    custom: {
      topbarBg: mode === "dark" ? "#1A223F" : "#ffffff"
    }
  };
};

export default getThemeOptions;