import { createTheme } from "@mui/material/styles";

const fontFamily = '"Inter", "sans-serif"';

const theme = createTheme({
  spacing: (value = 1) => `${(value * 8) / 16}rem`,
  typography: {
    fontFamily: fontFamily,
    button: {
      fontSize: "1rem",
    },
    allVariants: {
      fontFamily,
      letterSpacing: "0.02rem",
    },
    body1: {
      color: "#333",
      fontSize: "1rem",
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.56,
    },
    h1: {
      fontSize: "4rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "3.4rem",
    },
    h5: {
      fontSize: "2.1rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1.6rem",
    },
    subtitle2: {
      fontSize: "1.4rem",
    },
  },
});

export default theme;
