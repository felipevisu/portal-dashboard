import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { EntryCreatePage } from "@portal/dashboard/entries/components/EntryCreatePage";
import {
  EntryCreateMutation,
  EntryInput,
  useEntryCreateMutation,
  useEntryTypeDetailsQuery,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import useCategorySearch from "@portal/searches/useCategorySearch";
import useAttributeValueSearchHandler from "@portal/utils/handlers/attributeValueSearchHandler";
import { mapEdgesToItems } from "@portal/utils/maps";

import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";

export const VehicleCreate = () => {
  const { entryTypeId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entryDetails } = useLinks();

  const handleCreateVehicle = (data: EntryCreateMutation) => {
    if (!data?.entryCreate.errors.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigate(entryDetails(entryTypeId, data?.entryCreate.entry.id));
    }
  };

  const [createVehicle, createVehicleResult] = useEntryCreateMutation({
    onCompleted: handleCreateVehicle,
  });

  const handleSubmit = async (data: EntryInput) => {
    await createVehicle({
      variables: { input: { ...data } },
    });
  };

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
    },
  });

  const entryType = useEntryTypeDetailsQuery({
    fetchPolicy: "network-only",
    variables: { id: entryTypeId },
  });

  const {
    loadMore: loadMoreAttributeValues,
    search: searchAttributeValues,
    result: searchAttributeValuesOpts,
    reset: searchAttributeReset,
  } = useAttributeValueSearchHandler(DEFAULT_INITIAL_SEARCH_DATA);

  const fetchMoreCategories = {
    hasMore: searchCategoryOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCategoryOpts.loading,
    onFetchMore: loadMoreCategories,
  };
  const fetchMoreAttributeValues = {
    hasMore:
      !!searchAttributeValuesOpts.data?.attribute?.choices?.pageInfo
        ?.hasNextPage,
    loading: !!searchAttributeValuesOpts.loading,
    onFetchMore: loadMoreAttributeValues,
  };

  if (entryType.loading) return <CircularLoading />;
  if (!entryType.data) return <NotFound />;

  return (
    <EntryCreatePage
      onSubmit={handleSubmit}
      errors={createVehicleResult.data?.entryCreate.errors || []}
      loading={createVehicleResult.loading}
      categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
      fetchCategories={searchCategory}
      fetchMoreCategories={fetchMoreCategories}
      entryType={entryType.data.entryType}
      attributeValues={
        mapEdgesToItems(searchAttributeValuesOpts?.data?.attribute.choices) ||
        []
      }
      fetchAttributeValues={searchAttributeValues}
      fetchMoreAttributeValues={fetchMoreAttributeValues}
      onAttributeSelectBlur={searchAttributeReset}
    />
  );
};

export default VehicleCreate;
