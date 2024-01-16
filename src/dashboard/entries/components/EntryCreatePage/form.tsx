import React from "react";
import { useParams } from "react-router-dom";

import { AttributeInputData } from "@portal/components/Attributes/Attributes";
import { MultiAutocompleteChoiceType } from "@portal/components/Attributes/utils";
import {
  createAttributeChangeHandler,
  createAttributeMultiChangeHandler,
  prepareAttributesInput,
} from "@portal/dashboard/attributes/utils/handlers";
import { AttributeFragment, AttributeValueInput } from "@portal/graphql";
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
import createMultiAutocompleteSelectHandler from "@portal/utils/handlers/multiAutocompleteSelectChangeHandler";

export interface UseEntryCreateFormOpts {
  attributes: AttributeFragment[];
  categories: SingleAutocompleteChoiceType[];
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  selectedCategories: MultiAutocompleteChoiceType[];
}

export interface EntryCreateFormData {
  name: string;
  slug: string;
  categories: string[];
  email: string;
  documentNumber: string;
  entryType: string;
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

export type EntryCreateHandlers = Record<"selectCategories", FormChange>;

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
  const { entryTypeId } = useParams();
  const initialData = {
    name: "",
    slug: "",
    documentNumber: "",
    categories: [],
    email: "",
    entryType: entryTypeId,
  };

  const form = useForm(initialData, onSubmit);
  const { change, data: formData, toggleValue } = form;

  const attributes = useFormset<AttributeInputData>(
    opts.attributes ? getAttributeInputFromAttributes(opts.attributes) : []
  );

  const handleCategorySelect = createMultiAutocompleteSelectHandler(
    (event) => toggleValue(event),
    opts.setSelectedCategories,
    opts.selectedCategories,
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
    selectCategories: handleCategorySelect,
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
