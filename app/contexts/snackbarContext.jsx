import { createContext, useCallback, useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const AUTO_HIDE_MS = 4000;

const INITIAL_STATE = {
  open: false,
  message: "",
  severity: "info",
};

export const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState(INITIAL_STATE);

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((previous) => ({ ...previous, open: false }));
  }, []);

  const value = useMemo(
    () => ({
      showSnackbar,
      showSuccess: (message) => showSnackbar(message, "success"),
      showError: (message) => showSnackbar(message, "error"),
      showInfo: (message) => showSnackbar(message, "info"),
      showWarning: (message) => showSnackbar(message, "warning"),
    }),
    [showSnackbar],
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={AUTO_HIDE_MS}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          className="w-full items-center"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
