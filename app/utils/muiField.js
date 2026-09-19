export function muiField(form, name) {
  const { ref, ...field } = form.register(name);
  const error = form.formState.errors[name];

  return {
    ...field,
    inputRef: ref,
    error: Boolean(error),
    helperText: error?.message,
  };
}
