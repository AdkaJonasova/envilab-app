import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
  },

  palette: {
    mainGreen: {
      main: "#8B958A",
      contrastText: "#FEEDE0",
    },

    sideBrown: {
      main: "#E1BDA5",
    },

    sideGreen: {
      main: "#59745D",
    },
  },
});

export default theme;
