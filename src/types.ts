export type RelayToFlat<T extends { edges: Array<{ node: any }> }> = Array<
  T["edges"][0]["node"]
>;