import { createTheme } from "@mui/material/styles";

const fontFamily = '"Inter", "sans-serif"';

const spacing = (value = 1) => `${(value * 8) / 16}rem`;

const theme = createTheme({
  spacing,
  palette: {
    text: {
      primary: "#28234a",
      secondary: "rgba(40, 35, 74, 0.6)",
    },
    primary: {
      main: "#056dff",
    },
    error: {
      main: "#b63755",
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 8,
          marginBottom: spacing(2),
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "24px 24px 8px",
        },
        title: {
          fontSize: "1.2rem",
          fontWeight: "600",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "0 16px 16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
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
    subtitle1: {
      fontSize: "1.6rem",
    },
    subtitle2: {
      fontSize: "1.4rem",
    },
  },
});

export default theme;
