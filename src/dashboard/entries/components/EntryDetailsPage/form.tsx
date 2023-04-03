import React from "react";

import { AttributeInputData } from "@portal/components/Attributes/Attributes";
import {
  createAttributeChangeHandler,
  createAttributeMultiChangeHandler,
  prepareAttributesInput,
} from "@portal/dashboard/attributes/utils/handlers";
import {
  AttributeFragment,
  AttributeValueInput,
  EntryDetailsFragment,
} from "@portal/graphql";
import useForm, {
  CommonUseFormResultWithHandlers,
  FormChange,
  SubmitPromise,
} from "@portal/hooks/useForm";
import useFormset from "@portal/hooks/useFormset";
import {
  getAttributeInputFromAttributes,
  getAttributeInputFromEntry,
  SingleAutocompleteChoiceType,
} from "@portal/utils/data";
import createSingleAutocompleteSelectHandler from "@portal/utils/handlers/singleAutocompleteSelectChangeHandler";

export interface UseEntryUpdateFormOpts {
  categories: SingleAutocompleteChoiceType[];
  attributes: AttributeFragment[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export interface EntryUpdateFormData {
  name: string;
  slug: string;
  category: string;
  email: string;
  documentNumber: string;
  isPublished: boolean;
  active: boolean;
}

export interface EntryUpdateData extends EntryUpdateFormData {
  attributes: AttributeValueInput[];
}

export interface EntryUpdateFormProps extends UseEntryUpdateFormOpts {
  children: (props: any) => React.ReactNode;
  entry: EntryDetailsFragment;
  onSubmit: (data: EntryUpdateData) => SubmitPromise;
  loading: boolean;
}

export type EntryUpdateHandlers = Record<"selectCategory", FormChange>;

export type UseEntryUpdateFormOutput = CommonUseFormResultWithHandlers<
  EntryUpdateData,
  EntryUpdateHandlers
>;

const useEntryUpdateForm = (
  entry: EntryDetailsFragment,
  onSubmit: (data: EntryUpdateData) => SubmitPromise,
  loading: boolean,
  opts: UseEntryUpdateFormOpts
): UseEntryUpdateFormOutput => {
  const initialData = {
    name: entry.name,
    slug: entry.slug,
    documentNumber: entry.documentNumber,
    category: entry.category.id,
    isPublished: entry.isPublished,
    active: entry.active,
    email: entry.email,
  };

  const form = useForm(initialData, onSubmit);
  const { change, data: formData } = form;

  const currentAttributes = getAttributeInputFromEntry(entry);
  let newAttributes = getAttributeInputFromAttributes(opts.attributes);

  currentAttributes.forEach(
    (attr) => (newAttributes = newAttributes.filter((at) => at.id !== attr.id))
  );

  const attributes = useFormset<AttributeInputData>(
    [...currentAttributes, ...newAttributes] || []
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

  const data: EntryUpdateData = {
    ...formData,
    attributes: attributes.data,
  };

  const getData = (): EntryUpdateData => ({
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

const EntryUpdateForm = ({
  entry,
  children,
  onSubmit,
  loading,
  ...rest
}: EntryUpdateFormProps) => {
  const { ...props } = useEntryUpdateForm(entry, onSubmit, loading, rest);

  // eslint-disable-next-line react/prop-types
  return <form onSubmit={props.submit}>{children(props)}</form>;
};

export default EntryUpdateForm;
