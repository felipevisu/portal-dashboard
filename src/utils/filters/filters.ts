import isArray from "lodash/isArray";

export function dedupeFilter<T>(array: T[]): T[] {
  if (!isArray(array)) {
    return [array];
  }

  return Array.from(new Set(array));
}
