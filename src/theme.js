import { grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mainGreen: {
      main: "#A2AD8D",
      contrastText: "#FEEDE0",
    },

    sideBrown: {
      main: "#E1BDA5",
    },

    sideGreen: {
      main: "#59745D",
      contrastText: "#FEEDE0",
    },

    informationGrey: {
      main: grey[400],
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h1: {
      fontSize: "1.8rem",
      color: theme.palette.sideGreen.main,
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
      color: theme.palette.sideGreen.main,
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
    body3: {
      fontSize: "0.9rem",
      textAlign: "center",
      color: theme.palette.informationGrey.main,
    },
  },

  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#F0DED2",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.mainGreen.main,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.mainGreen.contrastText,
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
          backgroundColor: theme.palette.sideGreen.main,
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: theme.palette.sideGreen.main,
          },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.sideGreen.main,
          color: theme.palette.mainGreen.contrastText,
          fontWeight: "bold",
          fontSize: "0.9rem",
          textAlign: "left",
          lineHeight: 2,
          width: "100%",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          lineHeight: 3,
          fontSize: "0.2rem",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
