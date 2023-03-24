import { AttributeInput } from "@portal/components/Attributes/Attributes";
import { AttributeFragment } from "@portal/graphql";
import { maybe } from "@portal/misc";

import { mapEdgesToItems } from "./maps";

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

export function getAttributeInputFromAttributes(
  attributes: AttributeFragment[]
): AttributeInput[] {
  return (
    attributes?.map((attribute) => ({
      data: {
        inputType: attribute.inputType,
        isRequired: attribute.valueRequired,
        values: [],
      },
      id: attribute.id,
      label: attribute.name,
      value: [],
    })) ?? []
  );
}
