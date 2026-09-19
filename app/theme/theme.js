import { createTheme } from "@mui/material/styles";

const BROWN_DEEP = "#654922";
const AMBER = "#956E2F";
const GOLD = "#B68B4B";
const SAGE = "#4D574E";
const SURFACE = "#303531";
const BASE = "#202221";

const CARD = "#272A29";
const BORDER = "#3A403B";
const TEXT = "#EDE8E0";
const TEXT_DIM = "#A39C90";

const bodyFont = '"Inter", system-ui, -apple-system, sans-serif';

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: GOLD,
      light: "#C9A368",
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
      paper: SURFACE,
    },
    text: {
      primary: TEXT,
      secondary: TEXT_DIM,
    },
    divider: BORDER,
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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: BASE,
          backgroundImage: "none",
          borderRight: `1px solid ${BORDER}`,
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
            borderColor: BORDER,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: BROWN_DEEP,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: GOLD,
          },
        },
      },
    },
  },
});

export default theme;
