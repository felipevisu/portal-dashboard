import {
  AttributeEntryTypeEnum,
  AttributeInputTypeEnum,
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
  ];
};

export const getEntryTypeList = (t) => {
  return [
    {
      value: AttributeEntryTypeEnum.VEHICLE_AND_PROVIDER,
      label: t("attribute.enums.entryType.vehicleAndProvider"),
    },
    {
      value: AttributeEntryTypeEnum.PROVIDER,
      label: t("attribute.enums.entryType.provider"),
    },
    {
      value: AttributeEntryTypeEnum.VEHICLE,
      label: t("attribute.enums.entryType.vehicle"),
    },
  ];
};

export const mapType = (t) => {
  return {
    ENTRY: t("attribute.enums.type.entry"),
    DOCUMENT: t("attribute.enums.type.docoument"),
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

export const mapEntryType = (t) => {
  return {
    VEHICLE: t("attribute.enums.entryType.vehicle"),
    PROVIDER: t("attribute.enums.entryType.provider"),
    VEHICLE_AND_PROVIDER: t("attribute.enums.entryType.vehicleAndProvider"),
  };
};
