import { useContext } from "react";
import { SnackbarContext } from "~/contexts/snackbarContext";

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar precisa estar dentro de SnackbarProvider");
  }

  return context;
}
