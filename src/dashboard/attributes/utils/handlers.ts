import { isEqual } from "lodash";

import {
  AttributeInput,
  AttributeInputData,
} from "@portal/components/Attributes/Attributes";
import { AttributeInputTypeEnum, AttributeValueInput } from "@portal/graphql";
import { FormsetChange, FormsetData } from "@portal/hooks/useFormset";
import { toggle } from "@portal/utils/lists";

export function createAttributeChangeHandler(
  changeAttributeData: FormsetChange<string[]>
): FormsetChange<string> {
  return (attributeId: string, value: string) => {
    changeAttributeData(attributeId, value === "" ? [] : [value]);
  };
}

export function createAttributeMultiChangeHandler(
  changeAttributeData: FormsetChange<string[]>,
  attributes: FormsetData<AttributeInputData, string[]>
): FormsetChange<string> {
  return (attributeId: string, value: string) => {
    const attribute = attributes.find(
      (attribute) => attribute.id === attributeId
    );

    const newAttributeValues = toggle(
      value,
      attribute.value,
      (a, b) => a === b
    );

    changeAttributeData(attributeId, newAttributeValues);
  };
}

function getBooleanInput(attribute: AttributeInput) {
  return {
    id: attribute.id,
    boolean: JSON.parse(attribute.value[0] ?? "false"),
  };
}

function getAttributesMap(attributes: AttributeInput[] | null) {
  if (attributes && attributes?.length !== 0) {
    return new Map(
      attributes.map((attribute) => [attribute.id, attribute.value])
    );
  }
  return new Map();
}

interface AttributesArgs {
  attributes: AttributeInput[];
  prevAttributes: AttributeInput[] | null;
}

export const prepareAttributesInput = ({
  attributes,
  prevAttributes,
}: AttributesArgs): AttributeValueInput[] => {
  const prevAttributesMap = getAttributesMap(prevAttributes);

  return attributes.reduce((attrInput: AttributeValueInput[], attr) => {
    const prevAttrValue = prevAttributesMap.get(attr.id);
    if (isEqual(attr.value, prevAttrValue)) {
      return attrInput;
    }

    const inputType = attr.data.inputType;
    if (inputType === AttributeInputTypeEnum.BOOLEAN) {
      const booleanInput = getBooleanInput(attr);
      // previous comparison doesn't work because value was string
      if (isEqual([booleanInput.boolean], prevAttrValue)) {
        return attrInput;
      }

      attrInput.push(booleanInput);
      return attrInput;
    }
    if (inputType === AttributeInputTypeEnum.PLAIN_TEXT) {
      attrInput.push({
        id: attr.id,
        plainText: attr.value[0],
      });
      return attrInput;
    }
    if (inputType === AttributeInputTypeEnum.DATE) {
      attrInput.push({
        id: attr.id,
        date: attr.value[0],
      });
      return attrInput;
    }
    if (inputType === AttributeInputTypeEnum.DATE_TIME) {
      attrInput.push({
        id: attr.id,
        dateTime: attr.value[0],
      });
      return attrInput;
    }
    attrInput.push({
      id: attr.id,
      values: attr.value,
    });

    return attrInput;
  }, []);
};
