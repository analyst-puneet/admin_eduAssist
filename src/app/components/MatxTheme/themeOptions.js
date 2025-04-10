import { red } from "@mui/material/colors";
import { components } from "./components";

const getThemeOptions = (mode = "light") => {
  const topbarBg = mode === "dark" ? "#1A223F" : "#ffffff";

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
              primary: "#ffffff",
              secondary: "#cfcfcf"
            }
          }
        : {
            background: {
              default: "#f4f6f8",
              paper: "#ffffff"
            },
            text: {
              primary: "#000000",
              secondary: "#4b4b4b"
            }
          })
    },

    custom: {
      topbarBg
    }
  };
};

export default getThemeOptions;
