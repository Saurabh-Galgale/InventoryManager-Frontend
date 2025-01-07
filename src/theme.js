import { createTheme } from "@mui/material/styles";

const FONT = "'Slabo 27px', serif";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#f8f6f4",
      dark: "#c6c5c3",
    },
    secondary: {
      light: "#666666",
      main: "#1a1a1a",
      dark: "#000000",
    },
    third: {
      light: "#a4a4bb",
      main: "#8d8daa",
      dark: "#636377",
    },
  },
  typography: {
    fontFamily: FONT,
  },
});

export default theme;
