import { createTheme } from "@mui/material/styles";

const AMBER = "#956E2F";
const GOLD = "#B68B4B";
const SAGE = "rgb(74, 81, 75)";
const PAPER = "#161616";
const BASE = "#161716";

const CARD = "#0f1010";
const BORDER = "#2d322e";
const TEXT = "#EDE8E0";
const TEXT_DIM = "#36332f";
const GREEN = "#47d015";
const RED = "#e7402d";

const bodyFont = '"Inter", system-ui, -apple-system, sans-serif';

const theme = createTheme({
  cssVariables: true,
  modularCssLayers: "mui",
  palette: {
    mode: "dark",
    primary: {
      main: GOLD,
      light: "#ebb76a",
      dark: AMBER,
      contrastText: BASE,
    },
    secondary: {
      main: SAGE,
      light: "#6B7569",
      dark: "#3B443C",
      contrastText: TEXT,
    },
    background: {
      default: BASE,
      paper: PAPER,
    },
    text: {
      primary: TEXT,
      secondary: TEXT_DIM,
    },
    success: {
      main: GREEN,
      light: "#96BE86",
      dark: "#5E8850",
      contrastText: BASE,
    },
    error: {
      main: RED,
      light: "#D98A81",
      dark: "#A04E45",
      contrastText: BASE,
    },
    divider: BORDER,
    TableCell: {
      border: BORDER,
    },
    action: {
      hover: "rgba(182, 139, 75, 0.08)",
      selected: "rgba(182, 139, 75, 0.28)",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: bodyFont,
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600, letterSpacing: "-0.015em" },
    h4: { fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: "none", letterSpacing: "0.01em" },
    overline: { letterSpacing: "0.08em", fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: BASE,
          backgroundImage: "none",
          borderBottom: `1px solid ${BORDER}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 1,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: CARD,
          border: `1px solid ${BORDER}`,
          borderRadius: 14,
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          paddingBlock: 8,
        },
        containedPrimary: {
          "&:hover": { backgroundColor: "#C9A368" },
        },
        outlined: {
          borderColor: BORDER,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${GOLD} !important`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: `${AMBER} !important`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: `${GOLD} !important`,
          },
        },
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: `${GOLD} !important`,
          },
          "&:hover .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: `${AMBER} !important`,
          },
          "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: `${GOLD} !important`,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "--mui-palette-text-secondary": GOLD,
          "&.Mui-focused": {
            color: GOLD,
          },
        },
      },
    },
  },
});

export default theme;
