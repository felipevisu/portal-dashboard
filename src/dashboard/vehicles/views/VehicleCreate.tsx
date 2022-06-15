import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  VehicleCreateMutation,
  useVehicleCreateMutation,
} from "@portal/graphql";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VehicleCreatePage } from "../components/VehicleCreatePage";
import { FormProps } from "../components/VehicleForm";

export const VehicleCreate = () => {
  const navigator = useNavigate();

  const handleSuccess = (data: VehicleCreateMutation) => {
    if (!data?.vehicleCreate.errors.length) {
      navigator(`/admin/vehicles/details/${data?.vehicleCreate.vehicle.id}`);
    }
  };

  const [createVehicle, createVehicleResult] = useVehicleCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
    await createVehicle({ variables: { input: { ...data } } });
  };

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({ variables: DEFAULT_INITIAL_SEARCH_DATA });

  return (
    <VehicleCreatePage
      onSubmit={handleSubmit}
      errors={createVehicleResult.data?.vehicleCreate.errors || []}
      loading={createVehicleResult.loading}
      categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
    />
  );
};

export default VehicleCreate;
