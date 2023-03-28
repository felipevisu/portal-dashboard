import { AttributeValueFragment } from "@portal/graphql";

import { AttributeInput } from "./Attributes";

export interface MultiAutocompleteChoiceType {
  label: string;
  value: any;
  disabled?: boolean;
}

export function getMultiChoices(
  values: AttributeValueFragment[]
): MultiAutocompleteChoiceType[] {
  return values.map((value) => ({
    label: value.name,
    value: value.slug,
  }));
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
