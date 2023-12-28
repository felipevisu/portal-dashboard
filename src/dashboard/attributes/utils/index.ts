import {
  AttributeEntityTypeEnum,
  AttributeInputTypeEnum,
  AttributeTypeEnum,
} from "@portal/graphql";

export const getInputTypeList = (t) => {
  return [
    {
      value: AttributeInputTypeEnum.DROPDOWN,
      label: t("attribute.enums.inputType.dropdown"),
    },
    {
      value: AttributeInputTypeEnum.MULTISELECT,
      label: t("attribute.enums.inputType.multiselect"),
    },
    {
      value: AttributeInputTypeEnum.PLAIN_TEXT,
      label: t("attribute.enums.inputType.plainText"),
    },
    {
      value: AttributeInputTypeEnum.DATE,
      label: t("attribute.enums.inputType.date"),
    },
    {
      value: AttributeInputTypeEnum.BOOLEAN,
      label: t("attribute.enums.inputType.boolean"),
    },
    {
      value: AttributeInputTypeEnum.REFERENCE,
      label: t("attribute.enums.inputType.reference"),
    },
  ];
};

export const getEntityTypeList = (t) => {
  return [
    {
      value: AttributeEntityTypeEnum.ENTRY,
      label: t("entry.plural"),
    },
  ];
};

export const getTypeList = (t) => {
  return [
    {
      value: AttributeTypeEnum.ENTRY_TYPE,
      label: t("attribute.enums.type.entryType"),
    },
  ];
};

export const mapType = (t) => {
  return {
    ENTRY_TYPE: t("attribute.enums.type.entryType"),
  };
};

export const mapInputType = (t) => {
  return {
    DROPDOWN: t("attribute.enums.inputType.dropdown"),
    MULTISELECT: t("attribute.enums.inputType.multiselect"),
    PLAIN_TEXT: t("attribute.enums.inputType.plainText"),
    BOOLEAN: t("attribute.enums.inputType.boolean"),
    DATE: t("attribute.enums.inputType.date"),
  };
};
