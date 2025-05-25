"use client";
import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#5ea500",
      light: "#bbf451",
      dark: "#3d6300",
    },
    secondary: {
      main: "#e17100", // amber-600
      light: "#fffbeb", // amber-50
      dark: "#461901", // amber-950
    },
  },
  components: {
    MuiFab: {
      defaultProps: {
        variant: "extended",
        color: "primary",
        sx: {
          height: 60,
          borderRadius: 30,
          fontSize: "1.25rem",
          fontWeight: 500,
          padding: "0 1.5rem",
        },
      },
    },
  },
};

const theme = createTheme({
  ...themeOptions,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
