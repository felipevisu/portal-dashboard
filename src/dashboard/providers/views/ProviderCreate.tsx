import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { EntryCreatePage } from "@portal/dashboard/entries/components/EntryCreatePage";
import {
  EntryCreateMutation,
  EntryInput,
  EntryTypeEnum,
  useEntryCreateMutation,
} from "@portal/graphql";
import { useEntryType, useLinks } from "@portal/hooks";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";

export const ProviderCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const type = useEntryType();
  const { entryDetails } = useLinks();

  const handleCreateProvider = (data: EntryCreateMutation) => {
    if (!data?.entryCreate.errors.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigate(entryDetails(type, data?.entryCreate.entry.id));
    }
  };

  const [createProvider, createProviderResult] = useEntryCreateMutation({
    onCompleted: handleCreateProvider,
  });

  const handleSubmit = async (data: EntryInput) => {
    await createProvider({
      variables: { type: EntryTypeEnum.PROVIDER, input: { ...data } },
    });
  };

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      type: EntryTypeEnum.PROVIDER,
    },
  });

  return (
    <EntryCreatePage
      onSubmit={handleSubmit}
      errors={createProviderResult.data?.entryCreate.errors || []}
      loading={createProviderResult.loading}
      categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
    />
  );
};

export default ProviderCreate;
