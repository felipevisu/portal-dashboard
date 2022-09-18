import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  useVehicleDeleteMutation,
  useVehicleDetailsQuery,
  useVehicleUpdateMutation,
  VehicleInput,
  VehicleUpdateMutation,
} from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";

import { VehicleDetailsPage } from "../components/VehicleDetailsPage";

export const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const paginator = usePaginator();

  const handleSuccess = (data: VehicleUpdateMutation) => {
    if (!data?.vehicleUpdate.errors.length) {
      navigate(`/admin/vehicles/details/${data?.vehicleUpdate.vehicle.id}`);
    }
  };

  const [updateVehicle, updateVehicleResult] = useVehicleUpdateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: VehicleInput) => {
    await updateVehicle({ variables: { id: id, input: { ...data } } });
  };

  const [deleteVehicle] = useVehicleDeleteMutation({
    onCompleted: () => navigate("/admin/vehicles"),
  });

  const handleVehicleDelete = async () => {
    await deleteVehicle({ variables: { id } });
  };

  const { result: searchCategoryOpts } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const { data, loading, refetch } = useVehicleDetailsQuery({
    variables: { id: id, ...paginator.pagination },
  });

  useEffect(() => {
    if (data?.vehicle) {
      setVehicle(data.vehicle);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (loading && !vehicle) return <CircularLoading />;

  if (!vehicle) return <NotFound />;

  return (
    <>
      <VehicleDetailsPage
        vehicle={vehicle}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateVehicleResult.data?.vehicleUpdate.errors || []}
        loading={updateVehicleResult.loading}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        paginator={paginator}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleVehicleDelete}
        open={isOpen}
        title="Excluir veículo"
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir o veículo <b>{data?.vehicle?.name}</b>
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default VehicleDetails;
