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
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e"
            },
            text: {
              primary: "#fff",
              secondary: "#cfcfcf"
            }
          }
        : {
            background: {
              default: "#f4f6f8",
              paper: "#ffffff"
            },
            text: {
              primary: "rgba(52, 49, 76, 1)",
              secondary: "rgba(52, 49, 76, 0.54)"
            }
          })
    },

    custom: {
      topbarBg: mode === "dark" ? "#1A223F" : "#ffffff"
    }
  };
};

export default getThemeOptions;
