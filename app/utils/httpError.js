const DEFAULT_MESSAGE = "Não foi possível concluir a operação. Tente novamente.";

export function getErrorMessage(error) {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (!error?.response) return "Não foi possível conectar ao servidor.";
  if (status === 429) return "Muitas tentativas. Aguarde um minuto e tente novamente.";
  if (typeof data === "string" && data) return data;
  if (data?.message) return data.message;

  return DEFAULT_MESSAGE;
}

export function applyFieldErrors(error, form) {
  const fieldErrors = error?.response?.status === 422 ? error.response.data?.errors : null;

  if (!fieldErrors) return false;

  const formFields = Object.keys(form.getValues());
  const entries = Object.entries(fieldErrors);
  const knownEntries = entries.filter(([field]) => formFields.includes(field));

  knownEntries.forEach(([field, messages]) => {
    form.setError(field, { type: "server", message: messages[0] });
  });

  return knownEntries.length === entries.length;
}
