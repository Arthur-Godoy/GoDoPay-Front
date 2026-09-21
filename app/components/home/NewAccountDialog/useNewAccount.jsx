import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { accountService } from "~/services/http/accountService";
import { useAccount } from "~/hooks/useAccount";
import { useSnackbar } from "~/hooks/useSnackbar";
import { applyFieldErrors, getErrorMessage } from "~/utils/httpError";
import { muiField } from "~/utils/muiField";
import { yupResolver } from "~/utils/yupResolver";
import { accountSchema } from "~/validators/transaction";

const DEFAULT_VALUES = { nickname: "" };

export function useNewAccount({ open, onClose }) {
  const { loadUser } = useAccount();
  const { showSuccess } = useSnackbar();

  const [submitError, setSubmitError] = useState(null);

  const form = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { reset } = form;

  useEffect(() => {
    if (!open) return;

    setSubmitError(null);
    reset(DEFAULT_VALUES);
  }, [open, reset]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const { data } = await accountService.create(values);

      onClose();
      showSuccess(`Conta ${data.nickname} criada com sucesso.`);

      await loadUser();
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
