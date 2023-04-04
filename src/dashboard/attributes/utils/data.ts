import { AttributeInput } from "@portal/components/Attributes/Attributes";
import { AttributeValueFragment } from "@portal/graphql";

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
