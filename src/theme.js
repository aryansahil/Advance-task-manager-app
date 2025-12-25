import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#6366F1",
      },
      secondary: {
        main: "#22C55E",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });
