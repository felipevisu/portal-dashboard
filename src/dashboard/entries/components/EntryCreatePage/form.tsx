import React from "react";
import { useParams } from "react-router-dom";

import { AttributeInputData } from "@portal/components/Attributes/Attributes";
import {
  createAttributeChangeHandler,
  createAttributeMultiChangeHandler,
  prepareAttributesInput,
} from "@portal/dashboard/attributes/utils/handlers";
import {
  AttributeFragment,
  AttributeValueInput,
  EntryTypeEnum,
} from "@portal/graphql";
import useForm, {
  CommonUseFormResultWithHandlers,
  FormChange,
  SubmitPromise,
} from "@portal/hooks/useForm";
import useFormset from "@portal/hooks/useFormset";
import {
  getAttributeInputFromAttributes,
  SingleAutocompleteChoiceType,
} from "@portal/utils/data";
import createSingleAutocompleteSelectHandler from "@portal/utils/handlers/singleAutocompleteSelectChangeHandler";

import { mapType } from "../../views/utils";

export interface UseEntryCreateFormOpts {
  attributes: AttributeFragment[];
  categories: SingleAutocompleteChoiceType[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export interface EntryCreateFormData {
  name: string;
  slug: string;
  category: string;
  email: string;
  documentNumber: string;
  type: EntryTypeEnum;
}

export interface EntryCreateData extends EntryCreateFormData {
  attributes: AttributeValueInput[];
}

export interface EntryCreateFormProps extends UseEntryCreateFormOpts {
  children: (props: any) => React.ReactNode;
  initial?: Partial<EntryCreateFormData>;
  onSubmit: (data: EntryCreateData) => SubmitPromise;
  loading: boolean;
}

export type EntryCreateHandlers = Record<"selectCategory", FormChange>;

export type UseEntryCreateFormOutput = CommonUseFormResultWithHandlers<
  EntryCreateData,
  EntryCreateHandlers
>;

const useEntryCreateForm = (
  initial: Partial<EntryCreateFormData>,
  onSubmit: (data: EntryCreateData) => SubmitPromise,
  loading: boolean,
  opts: UseEntryCreateFormOpts
): UseEntryCreateFormOutput => {
  const { entry: type } = useParams();
  const initialData = {
    name: "",
    slug: "",
    documentNumber: "",
    category: "",
    email: "",
    type: mapType[type],
  };

  const form = useForm(initialData, onSubmit);
  const { change, data: formData } = form;

  const attributes = useFormset<AttributeInputData>(
    opts.attributes ? getAttributeInputFromAttributes(opts.attributes) : []
  );

  const handleCategorySelect = createSingleAutocompleteSelectHandler(
    change,
    opts.setSelectedCategory,
    opts.categories
  );

  const handleAttributeChange = createAttributeChangeHandler(attributes.change);
  const handleAttributeMultiChange = createAttributeMultiChangeHandler(
    attributes.change,
    attributes.data
  );

  const data: EntryCreateData = {
    ...formData,
    attributes: attributes.data,
  };

  const getData = (): EntryCreateData => ({
    ...data,
    attributes: prepareAttributesInput({
      attributes: attributes.data,
      prevAttributes: null,
    }),
  });

  const submit = async () => onSubmit(getData());

  const handlers = {
    selectCategory: handleCategorySelect,
    selectAttributeMultiple: handleAttributeMultiChange,
    selectAttribute: handleAttributeChange,
  };

  return {
    change,
    submit,
    data,
    handlers,
  };
};

const EntryCreateForm = ({
  children,
  initial,
  onSubmit,
  loading,
  ...rest
}: EntryCreateFormProps) => {
  const { ...props } = useEntryCreateForm(
    initial || {},
    onSubmit,
    loading,
    rest
  );

  // eslint-disable-next-line react/prop-types
  return <form onSubmit={props.submit}>{children(props)}</form>;
};

export default EntryCreateForm;
