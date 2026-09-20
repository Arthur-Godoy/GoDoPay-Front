import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { accountService } from "~/services/http/accountService";
import { useAccount } from "~/hooks/useAccount";
import { useReceipt } from "~/hooks/useReceipt";
import { useSnackbar } from "~/hooks/useSnackbar";
import { unwrapData } from "~/utils/apiResponse";
import { applyFieldErrors, getErrorMessage } from "~/utils/httpError";
import { formatMoney, parseMoney } from "~/utils/money";
import { yupResolver } from "~/utils/yupResolver";
import { depositSchema } from "~/validators/transaction";

const DEFAULT_VALUES = { amount: 0 };

export function useDeposit({ open, onClose }) {
  const { currentAccount, loadUser } = useAccount();
  const { openReceipt } = useReceipt();
  const { showSuccess } = useSnackbar();

  const [submitError, setSubmitError] = useState(null);

  const form = useForm({
    resolver: yupResolver(depositSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { reset } = form;

  useEffect(() => {
    if (!open) return;

    setSubmitError(null);
    reset(DEFAULT_VALUES);
  }, [open, reset]);

  const amount = form.watch("amount");
  const amountError = form.formState.errors.amount;

  const changeAmount = useCallback(
    (event) => {
      form.setValue("amount", parseMoney(event.target.value), {
        shouldValidate: form.formState.isSubmitted,
      });
    },
    [form],
  );

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const { data } = await accountService.deposit(currentAccount.id, values);

      onClose();
      showSuccess(`Depósito de ${formatMoney(values.amount)} realizado.`);
      openReceipt(unwrapData(data));

      await loadUser();
    } catch (error) {
      if (!applyFieldErrors(error, form)) {
        setSubmitError(getErrorMessage(error));
      }
    }
  });

  return {
    account: currentAccount,
    amountField: {
      value: formatMoney(amount),
      onChange: changeAmount,
      error: Boolean(amountError),
      helperText: amountError?.message,
    },
    isSubmitting: form.formState.isSubmitting,
    submitError,
    onSubmit,
  };
}
