import {
  AttributeInputTypeEnum,
  AttributeValueDetailsFragment,
} from "@portal/graphql";
import { FormsetAtomicData } from "@portal/hooks/useFormset";

export interface AttributeInputData {
  inputType: AttributeInputTypeEnum;
  isRequired: boolean;
  values: AttributeValueDetailsFragment[];
  selectedValues?: AttributeValueDetailsFragment[];
}

export type AttributeInput = FormsetAtomicData<AttributeInputData, string[]>;
