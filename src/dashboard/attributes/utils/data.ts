import { AttributeInput } from "@portal/components/Attributes/Attributes";
import {
  AttributeFragment,
  AttributeInputTypeEnum,
  AttributeValueFragment,
} from "@portal/graphql";

import { AttributeValueEditDialogFormData } from "../components/ValueUpdateDialog";

export const getAttributesDisplayData = (attributes: AttributeInput[]) =>
  attributes.map((attribute) => {
    return attribute;
  });

export const mergeAttributes = (
  ...attributeLists: AttributeInput[][]
): AttributeInput[] =>
  attributeLists.reduce((prev, attributes) => {
    const newAttributeIds = new Set(attributes.map((attr) => attr.id));
    return [
      ...prev.filter((attr) => !newAttributeIds.has(attr.id)),
      ...attributes,
    ];
  }, []);

export function attributeValueFragmentToFormData(
  data: AttributeValueFragment | null
): AttributeValueEditDialogFormData {
  return {
    name: data?.name ?? "",
    value: data?.value ?? "",
  };
}

export const ATTRIBUTE_TYPES_WITH_CONFIGURABLE_FACED_NAVIGATION = [
  AttributeInputTypeEnum.DROPDOWN,
  AttributeInputTypeEnum.MULTISELECT,
  AttributeInputTypeEnum.BOOLEAN,
  AttributeInputTypeEnum.DATE,
  AttributeInputTypeEnum.SWATCH,
];

export function filterable(
  attribute: Pick<AttributeFragment, "inputType">
): boolean {
  return ATTRIBUTE_TYPES_WITH_CONFIGURABLE_FACED_NAVIGATION.includes(
    attribute.inputType!
  );
}
