import { grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    lightGreen: {
      main: "#A2AD8D",
      contrastText: "#FEEDE0",
    },

    beigeBrown: {
      main: "#E1BDA5",
    },

    darkGreen: {
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
    // titles of the pages
    h1: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: theme.palette.darkGreen.main,
      textAlign: "center",
      marginTop: 10,
      marginBottom: 15,
    },
    // titles of the windows
    h2: {
      fontSize: "1.3rem",
      color: theme.palette.darkGreen.main,
      textAlign: "center",
      marginTop: 5,
      marginBottom: 5,
    },
    //subtitles of the windows
    h3: {
      fontSize: "1rem",
      color: theme.palette.lightGreen.main,
      textAlign: "left",
      marginBottom: 3,
      marginTop: 3,
    },
    annotation: {
      fontSize: "1rem",
      color: "black",
      textAlign: "left",
      marginBottom: 5,
      marginTop: 5,
    },
    information: {
      fontSize: "0.9rem",
      color: theme.palette.informationGrey.main,
      textAlign: "center",
      marginBottom: 5,
      marginTop: 5,
    },
    pageTitle: {
      textTransform: "uppercase",
      fontSize: "1rem",
    },
    menuItem: {
      fontSize: "1rem",
      textAlign: "center",
    },
    body1: {
      fontSize: "0.9rem",
    },
    body2: {
      fontSize: "0.9rem",
    },
    button: {
      textTransform: "none",
      fontSize: "0.9rem",
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
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: theme.palette.lightGreen.main,
          color: theme.palette.lightGreen.contrastText,
          fontSize: "0.9rem",
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
          backgroundColor: theme.palette.darkGreen.main,
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: theme.palette.darkGreen.main,
          },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.darkGreen.main,
          color: theme.palette.darkGreen.contrastText,
          fontSize: "0.9rem",
          textAlign: "left",
          lineHeight: 2,
          width: "100%",
          margin: 0,
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
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: theme.palette.lightGreen.main,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.lightGreen.main,
            color: theme.palette.lightGreen.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.lightGreen.main,
              color: theme.palette.lightGreen.contrastText,
            },
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
