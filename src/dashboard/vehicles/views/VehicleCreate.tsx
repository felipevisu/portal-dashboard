import React from "react";
import { useNavigate } from "react-router-dom";

import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { EntryCreatePage } from "@portal/dashboard/entries/components/EntryCreatePage";
import {
  EntryCreateMutation,
  EntryInput,
  EntryTypeEnum,
  useEntryCreateMutation,
} from "@portal/graphql";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";

export const VehicleCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: EntryCreateMutation) => {
    if (!data?.entryCreate.errors.length) {
      navigate(`/admin/vehicles/details/${data?.entryCreate.entry.id}`);
    }
  };

  const [createVehicle, createVehicleResult] = useEntryCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: EntryInput) => {
    await createVehicle({
      variables: { type: EntryTypeEnum.VEHICLE, input: { ...data } },
    });
  };

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({
    variables: { first: 20, query: "", type: EntryTypeEnum.VEHICLE },
  });

  return (
    <EntryCreatePage
      onSubmit={handleSubmit}
      errors={createVehicleResult.data?.entryCreate.errors || []}
      loading={createVehicleResult.loading}
      categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
    />
  );
};

export default VehicleCreate;
