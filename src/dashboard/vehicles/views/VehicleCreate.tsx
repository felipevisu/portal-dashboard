import React from "react";
import { useVehicleCreateMutation } from "@portal/graphql";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { mapEdgesToItems } from "@portal/utils/maps";

export const VehicleCreate = () => {
  const [createVehicle, createVehicleResult] = useVehicleCreateMutation();
  const navigator = useNavigate();

  const handleSubmit = async (data: any /* FormProps */) => {
    const result = await createVehicle({ variables: { input: { ...data } } });
    if (!result.data?.vehicleCreate.errors.length) {
      navigator(
        `/admin/vehicles/details/${result.data?.vehicleCreate.vehicle.id}`
      );
    }
  };

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({ variables: DEFAULT_INITIAL_SEARCH_DATA });

  return (
    <div>
      <Header
        title="Novo veículo"
        buttonPath="/admin/vehicles"
        buttonLabel="Voltar"
        buttonVariant="secondary"
      />
      <VehicleForm
        onSubmit={handleSubmit}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        errors={createVehicleResult.data?.vehicleCreate.errors || []}
      />
    </div>
  );
};

export default VehicleCreate;
