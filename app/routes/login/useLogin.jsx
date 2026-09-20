import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { authService } from "~/services/http/authService";
import { sessionStorage } from "~/services/sessionStorage";
import { tokenStorage } from "~/services/tokenStorage";
import { useSnackbar } from "~/hooks/useSnackbar";
import { applyFieldErrors, getErrorMessage } from "~/utils/httpError";
import { muiField } from "~/utils/muiField";
import { yupResolver } from "~/utils/yupResolver";
import { loginSchema } from "~/validators/auth";

export function useLogin() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const { showSuccess } = useSnackbar();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const { data } = await authService.login(values);

      tokenStorage.setTokens(data);
      sessionStorage.setUser(data);

      showSuccess("Bem-vindo de volta!");
      navigate("/");
    } catch (error) {
      if (!applyFieldErrors(error, form)) {
        setSubmitError(getErrorMessage(error));
      }
    }
  });

  return {
    field: (name) => muiField(form, name),
    isSubmitting: form.formState.isSubmitting,
    submitError,
    onSubmit,
  };
}
