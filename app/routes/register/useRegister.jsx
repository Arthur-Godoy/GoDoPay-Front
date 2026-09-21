import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { authService } from "~/services/http/authService";
import { tokenStorage } from "~/services/tokenStorage";
import { useSnackbar } from "~/hooks/useSnackbar";
import { applyFieldErrors, getErrorMessage } from "~/utils/httpError";
import { maskDocument } from "~/utils/masks";
import { muiField } from "~/utils/muiField";
import { yupResolver } from "~/utils/yupResolver";
import { registerSchema } from "~/validators/auth";

export function useRegister() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const { showSuccess } = useSnackbar();

  const form = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      document: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const { data } = await authService.register(values);
      tokenStorage.setTokens(data);
      showSuccess("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      if (!applyFieldErrors(error, form)) {
        setSubmitError(getErrorMessage(error));
      }
    }
  });

  return {
    field: (name, mask) => muiField(form, name, mask),
    masks: { document: maskDocument },
    isSubmitting: form.formState.isSubmitting,
    submitError,
    onSubmit,
  };
}
