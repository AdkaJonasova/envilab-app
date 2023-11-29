import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    h1: {
      fontSize: "1.8rem",
      color: "#59745D",
      textAlign: "center",
      marginBottom: 5,
      marginTop: 5,
    },
    h2: {
      fontSize: "1rem",
      marginTop: 5,
      marginBottom: 10,
    },
    h3: {
      fontSize: "1.3rem",
      color: "#59745D",
      textAlign: "center",
      marginTop: 5,
      marginBottom: 10,
    },
    h4: {
      fontSize: "1rem",
      textAlign: "left",
      margin: 5,
    },
    body1: {
      fontSize: "0.9rem",
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

  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#E1BDA5",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: 5,
        },
      },
    },
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

theme = responsiveFontSizes(theme);

export default theme;
