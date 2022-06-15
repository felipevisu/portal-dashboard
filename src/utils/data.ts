import { maybe } from "@portal/misc";

interface Node {
  id: string;
  name: string;
}

export type ChoiceValue = string;

export interface SingleAutocompleteChoiceType<
  V extends ChoiceValue = ChoiceValue,
  L = string
> {
  label: L;
  value: V;
}

export function getChoices(nodes: Node[]): SingleAutocompleteChoiceType[] {
  return maybe(
    () =>
      nodes.map((node) => ({
        label: node.name,
        value: node.id,
      })),
    []
  );
}
