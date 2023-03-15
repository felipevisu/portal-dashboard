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

export const VehicleCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const type = useEntryType();
  const { entryDetails } = useLinks();

  const handleCreateVehicle = (data: EntryCreateMutation) => {
    if (!data?.entryCreate.errors.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigate(entryDetails(type, data?.entryCreate.entry.id));
    }
  };

  const [createVehicle, createVehicleResult] = useEntryCreateMutation({
    onCompleted: handleCreateVehicle,
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
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      type: EntryTypeEnum.VEHICLE,
    },
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
