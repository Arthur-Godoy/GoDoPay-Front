import { ValidationError } from "yup";

export function yupResolver(schema) {
  return async (values) => {
    try {
      const data = await schema.validate(values, { abortEarly: false });

      return { values: data, errors: {} };
    } catch (error) {
      if (!(error instanceof ValidationError)) throw error;

      const errors = error.inner.reduce((acc, issue) => {
        if (issue.path && !acc[issue.path]) {
          acc[issue.path] = { type: issue.type ?? "validation", message: issue.message };
        }

        return acc;
      }, {});

      return { values: {}, errors };
    }
  };
}
