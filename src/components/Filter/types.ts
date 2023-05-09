import { FetchMoreProps, KeyValue, SearchPageProps } from "@portal/types";

import { MultiAutocompleteChoiceType } from "../Attributes/utils";

export interface KeyValueFilterElementData {
  value: KeyValue[];
  type: FieldType.keyValue;
}

export interface RegularFilterElementData {
  value: string[];
  type: Omit<FieldType, FieldType.keyValue>;
}

export type FilterElementRegular<K extends string = string> =
  FilterElementCommon<K> & RegularFilterElementData;

export type FilterElementKeyValue<K extends string = string> =
  FilterElementCommon<K> & KeyValueFilterElementData;

export interface UnknownFilterElementData {
  value: Array<string | KeyValue>;
  type: KeyValueFilterElementData["type"] | RegularFilterElementData["type"];
}

interface FilterElementCommonData {
  active: boolean;
  multiple: boolean;
  options?: MultiAutocompleteChoiceType[];
}

export type IFilterElementMutableDataGeneric<T extends FieldType> =
  T extends FieldType.keyValue
    ? KeyValueFilterElementData & FilterElementCommonData
    : RegularFilterElementData & FilterElementCommonData;

type FilterElementCommon<K extends string = string> = {
  autocomplete?: boolean;
  displayValues?: MultiAutocompleteChoiceType[];
  group?: K;
  label: string;
  name: K;
  required?: boolean;
  id?: string;
  dependencies?: string[];
  multipleFields?: Array<FilterElement<K>>;
} & FilterElementCommonData &
  Partial<FetchMoreProps & SearchPageProps>;

export type FilterElement<K extends string = string> = FilterElementCommon<K> &
  Partial<UnknownFilterElementData>;

export enum FieldType {
  autocomplete = "autocomplete",
  boolean = "boolean",
  date = "date",
  options = "options",
  text = "text",
  keyValue = "keyValue",
}

export type IFilter<
  K extends string = string,
  T extends FieldType | unknown = unknown
> = T extends unknown
  ? Array<FilterElement<K>>
  : T extends FieldType.keyValue
  ? Array<FilterElementKeyValue<K>>
  : Array<FilterElementRegular<K>>;
