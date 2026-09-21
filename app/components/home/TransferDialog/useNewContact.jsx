import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contactService } from "~/services/http/contactService";
import { useSnackbar } from "~/hooks/useSnackbar";
import { applyFieldErrors, getErrorMessage } from "~/utils/httpError";
import { maskAccountNumber, maskAgency, maskDigit } from "~/utils/masks";
import { muiField } from "~/utils/muiField";
import { yupResolver } from "~/utils/yupResolver";
import { contactSchema } from "~/validators/transaction";

const DEFAULT_VALUES = { agency: "", number: "", digit: "" };

export function useNewContact({ active, onCreated }) {
  const { showSuccess } = useSnackbar();

  const [submitError, setSubmitError] = useState(null);

  const form = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { reset } = form;

  useEffect(() => {
    if (!active) return;

    setSubmitError(null);
    reset(DEFAULT_VALUES);
  }, [active, reset]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      await contactService.create(values);

      showSuccess("Contato adicionado.");
      onCreated();
    } catch (error) {
      if (!applyFieldErrors(error, form)) {
        setSubmitError(getErrorMessage(error));
      }
    }
  });

  return {
    field: (name, mask) => muiField(form, name, mask),
    masks: {
      agency: maskAgency,
      number: maskAccountNumber,
      digit: maskDigit,
    },
    isSubmitting: form.formState.isSubmitting,
    submitError,
    onSubmit,
  };
}
