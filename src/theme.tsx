import React from "react";

import { createTheme, ThemeProvider } from "@mui/material";

const fontFamily = '"Inter", "sans-serif"';

const spacing = (value = 1) => `${(value * 8) / 16}rem`;

export interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: string;
}

export const ColorModeContext = React.createContext<ColorModeContextType>(null);

interface ColorModeProviderProps {
  children: React.ReactNode;
}

type ColorMode = "dark" | "light";

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [mode, setMode] = React.useState<"light" | "dark">(
    (localStorage.getItem("themeMode") as ColorMode) || "light"
  );

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#eff5f8",
                },
              }
            : {}),
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: "none",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                borderRadius: spacing(1),
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
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
