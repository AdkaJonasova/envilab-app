import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          width: "100%",
        },
        indicator: {
          backgroundColor: "#59745D",
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#59745D",
          },
        },
      },
    },
  },
});

export default theme;
