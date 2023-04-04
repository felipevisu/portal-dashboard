import {
  AttributeInputTypeEnum,
  AttributeValueFragment,
  EntryDetailsFragment,
} from "@portal/graphql";

import { SingleAutocompleteChoiceType } from "../SingleAutocompleteSelectField";

import { AttributeInput } from "./Attributes";

export interface MultiAutocompleteChoiceType {
  label: string;
  value: any;
  disabled?: boolean;
}

export function getSingleChoices(
  values: AttributeValueFragment[]
): SingleAutocompleteChoiceType[] {
  return values.map((value) => ({
    label: value.name,
    value: value.slug,
  }));
}

export function getMultiChoices(
  values: AttributeValueFragment[]
): MultiAutocompleteChoiceType[] {
  return values.map((value) => ({
    label: value.name,
    value: value.slug,
  }));
}

export function getSingleDisplayValue(
  attribute: AttributeInput,
  attributeValues: AttributeValueFragment[]
): string {
  return (
    attributeValues.find((value) => value.slug === attribute.value[0])?.name ||
    attribute.data.values.find((value) => value.slug === attribute.value[0])
      ?.name ||
    attribute.value[0] ||
    ""
  );
}

export function getMultiDisplayValue(
  attribute: AttributeInput,
  attributeValues: AttributeValueFragment[]
): MultiAutocompleteChoiceType[] {
  if (!attribute.value) {
    return [];
  }

  return attribute.value.map((attributeValue) => {
    const definedAttributeValue =
      attributeValues.find(
        (definedValue) => definedValue.slug === attributeValue
      ) ||
      attribute.data.values.find(
        (definedValue) => definedValue.slug === attributeValue
      );
    if (definedAttributeValue) {
      return {
        label: definedAttributeValue.name,
        value: definedAttributeValue.slug,
      };
    }

    return {
      label: attributeValue,
      value: attributeValue,
    };
  });
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

export const mergeAttributes = (
  currentAttributes: AttributeInput[],
  newAttributes: AttributeInput[]
): AttributeInput[] => {
  currentAttributes.forEach(
    (attr) => (newAttributes = newAttributes.filter((at) => at.id !== attr.id))
  );
  return [...currentAttributes, ...newAttributes];
};
