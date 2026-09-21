export function muiField(form, name, mask) {
  const { ref, onChange, ...field } = form.register(name);
  const error = form.formState.errors[name];

  return {
    ...field,
    onChange: mask
      ? (event) => {
          event.target.value = mask(event.target.value);

          return onChange(event);
        }
      : onChange,
    inputRef: ref,
    error: Boolean(error),
    helperText: error?.message,
  };
}
