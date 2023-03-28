import { AttributeInput } from "@portal/components/Attributes/Attributes";
import {
  AttributeFragment,
  AttributeInputTypeEnum,
  EntryDetailsFragment,
  EntryFragment,
} from "@portal/graphql";
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

export function getSelectedAttributeValues(
  attribute: EntryDetailsFragment["attributes"][0]
) {
  switch (attribute.attribute.inputType) {
    case AttributeInputTypeEnum.PLAIN_TEXT:
      return [attribute.values[0]?.plainText];

    case AttributeInputTypeEnum.NUMERIC:
      return [attribute.values[0]?.name];

    case AttributeInputTypeEnum.BOOLEAN:
      return [attribute.values[0]?.boolean ?? "false"];

    case AttributeInputTypeEnum.DATE:
      return [attribute.values[0]?.date];

    case AttributeInputTypeEnum.DATE_TIME:
      return [attribute.values[0]?.dateTime];

    default:
      return attribute.values.map((value) => value.slug);
  }
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
        values: [],
      },
      id: attribute.attribute.id,
      label: attribute.attribute.name,
      value: getSelectedAttributeValues(attribute),
    };
  });
  return result;
}
