export interface Error {
  field: string | null;
  message?: string;
}

export function getFieldError<T extends Error>(errors: T[], field: string): T {
  return errors.find((err) => err.field === field);
}

export function getErrors(errors: Error[]): string[] {
  return errors
    .filter((err) => ["", null].includes(err.field))
    .map((err) => err.message);
}

export type FormErrors<TField extends string, TError extends Error> = Record<
  TField,
  TError
>;

export function getFormErrors<TField extends string, TError extends Error>(
  fields: TField[],
  errors: TError[] = []
): FormErrors<TField, TError> {
  return fields.reduce((errs, field) => {
    errs[field] = getFieldError(errors, field);
    return errs;
  }, {} as unknown as Record<TField, TError>);
}
