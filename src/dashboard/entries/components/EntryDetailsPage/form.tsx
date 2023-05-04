import React from "react";

import { AttributeInputData } from "@portal/components/Attributes/Attributes";
import {
  mergeAttributes,
  MultiAutocompleteChoiceType,
} from "@portal/components/Attributes/utils";
import {
  createAttributeChangeHandler,
  createAttributeMultiChangeHandler,
  prepareAttributesInput,
} from "@portal/dashboard/attributes/utils/handlers";
import {
  AttributeFragment,
  AttributeValueInput,
  EntryChannelListingUpdateInput,
  EntryDetailsFragment,
} from "@portal/graphql";
import useForm, {
  CommonUseFormResultWithHandlers,
  FormChange,
  SubmitPromise,
} from "@portal/hooks/useForm";
import useFormset from "@portal/hooks/useFormset";
import { maybe } from "@portal/misc";
import {
  getAttributeInputFromAttributes,
  getAttributeInputFromEntry,
  SingleAutocompleteChoiceType,
} from "@portal/utils/data";
import createMultiAutocompleteSelectHandler from "@portal/utils/handlers/multiAutocompleteSelectChangeHandler";

import { useEntryChannelListingsForm } from "./formChannels";

export interface UseEntryUpdateFormOpts {
  categories: SingleAutocompleteChoiceType[];
  attributes: AttributeFragment[];
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  selectedCategories: MultiAutocompleteChoiceType[];
}

export interface EntryUpdateFormData {
  name: string;
  slug: string;
  categories: string[];
  email: string;
  documentNumber: string;
}

export interface EntryUpdateData extends EntryUpdateFormData {
  attributes: AttributeValueInput[];
  channels: EntryChannelListingUpdateInput;
}

export interface EntryUpdateFormProps extends UseEntryUpdateFormOpts {
  children: (props: any) => React.ReactNode;
  entry: EntryDetailsFragment;
  onSubmit: (data: EntryUpdateData) => SubmitPromise;
  loading: boolean;
}

export type EntryUpdateHandlers = Record<"selectCategories", FormChange>;

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
    email: entry.email,
    categories: entry.categories.map((category) => category.id),
  };

  const form = useForm(initialData, onSubmit);
  const { change, data: formData, toggleValue } = form;

  const currentAttributes = getAttributeInputFromEntry(entry);
  const newAttributes = getAttributeInputFromAttributes(opts.attributes);
  const mergedAttributes = mergeAttributes(currentAttributes, newAttributes);

  const attributes = useFormset<AttributeInputData>(mergedAttributes || []);

  const {
    channels,
    handleChannelChange,
    handleChannelListUpdate,
    touched: touchedChannels,
  } = useEntryChannelListingsForm(entry);

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

  const data: EntryUpdateData = {
    ...formData,
    attributes: attributes.data,
    channels,
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
    selectCategories: handleCategorySelect,
    selectAttributeMultiple: handleAttributeMultiChange,
    selectAttribute: handleAttributeChange,
    changeChannels: handleChannelChange,
    updateChannelList: handleChannelListUpdate,
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
