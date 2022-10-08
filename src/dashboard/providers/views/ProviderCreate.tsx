import React from "react";
import { useNavigate } from "react-router-dom";

import { EntryCreatePage } from "@portal/dashboard/entries/components/EntryCreatePage";
import {
  EntryCreateMutation,
  EntryInput,
  EntryTypeEnum,
  useEntryCreateMutation,
} from "@portal/graphql";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";

export const ProviderCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: EntryCreateMutation) => {
    if (!data?.entryCreate.errors.length) {
      navigate(`/admin/providers/details/${data?.entryCreate.entry.id}`);
    }
  };

  const [createProvider, createProviderResult] = useEntryCreateMutation({
    onCompleted: handleSuccess,
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
    variables: { first: 20, query: "", type: EntryTypeEnum.PROVIDER },
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
