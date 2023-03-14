import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { EntryCreatePage } from "@portal/dashboard/entries/components/EntryCreatePage";
import { useEntryType } from "@portal/dashboard/entries/hooks";
import {
  EntryCreateMutation,
  EntryInput,
  EntryTypeEnum,
  useEntryCreateMutation,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
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
    variables: { first: 20, query: "" },
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
