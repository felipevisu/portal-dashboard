import { MultiAutocompleteChoiceType } from "@portal/components/Attributes/utils";
import { FieldType, FilterElementGeneric } from "@portal/components/Filter";
import { FetchMoreProps, MinMax, SearchPageProps } from "@portal/types";

export function createOptionsField<K extends string>(
  name: K,
  label: string,
  defaultValue: string[],
  multiple: boolean,
  options: MultiAutocompleteChoiceType[]
): FilterElementGeneric<K, FieldType.options> {
  return {
    active: false,
    label,
    multiple,
    name,
    options,
    type: FieldType.options,
    value: defaultValue,
  };
}

export function createAutocompleteField<K extends string>(
  name: K,
  label: string,
  defaultValue: string[] = [],
  displayValues: MultiAutocompleteChoiceType[],
  multiple: boolean,
  options: MultiAutocompleteChoiceType[],
  opts: FetchMoreProps & SearchPageProps,
  id?: string
): FilterElementGeneric<K, FieldType.autocomplete> {
  return {
    ...opts,
    active: false,
    displayValues,
    label,
    multiple,
    name,
    options,
    type: FieldType.autocomplete,
    value: defaultValue,
    id,
  };
}

export function createDateField<K extends string>(
  name: K,
  label: string,
  defaultValue: MinMax
): FilterElementGeneric<K, FieldType.date> {
  return {
    active: false,
    label,
    multiple: defaultValue.min !== defaultValue.max,
    name,
    type: FieldType.date,
    value: [defaultValue.min, defaultValue.max],
  };
}
