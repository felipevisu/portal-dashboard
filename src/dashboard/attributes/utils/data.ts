import { AttributeInput } from "@portal/components/Attributes/Attributes";

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
