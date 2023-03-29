import { AttributeInput } from "@portal/components/Attributes/Attributes";
import { getSelectedAttributeValues } from "@portal/components/Attributes/utils";
import { AttributeFragment, EntryDetailsFragment } from "@portal/graphql";
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

export function getAttributeInputFromEntry(
  entry: EntryDetailsFragment
): AttributeInput[] {
  const result = entry.attributes.map((attribute) => {
    return {
      data: {
        inputType: attribute.attribute.inputType,
        isRequired: attribute.attribute.valueRequired,
        selectedValues: attribute.values,
        values: attribute.values,
      },
      id: attribute.attribute.id,
      label: attribute.attribute.name,
      value: getSelectedAttributeValues(attribute),
    };
  });
  return result;
}
