import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  VehicleUpdateMutation,
  useVehicleUpdateMutation,
  useVehicleDetailsQuery,
  useVehicleDeleteMutation,
} from "@portal/graphql";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VehicleDetailsPage } from "../components/VehicleDetailsPage";
import { FormProps } from "../components/VehicleForm";
import useModal from "@portal/hooks/useModal";
import CircularLoading from "@portal/components/Circular";

export const VehicleDetails = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const handleSuccess = (data: VehicleUpdateMutation) => {
    if (!data?.vehicleUpdate.errors.length) {
      navigator(`/admin/vehicles/details/${data?.vehicleUpdate.vehicle.id}`);
    }
  };

  const [updateVehicle, updateVehicleResult] = useVehicleUpdateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
    await updateVehicle({ variables: { id: id, input: { ...data } } });
  };

  const [deleteVehicle] = useVehicleDeleteMutation({
    onCompleted: () => navigate("/admin/vehicles"),
  });

  const handleVehicleDelete = async () => {
    await deleteVehicle({ variables: { id } });
  };

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({ variables: DEFAULT_INITIAL_SEARCH_DATA });

  const { data, loading } = useVehicleDetailsQuery({ variables: { id: id } });

  if (loading) return <CircularLoading />;

  return (
    <>
      <VehicleDetailsPage
        vehicle={data?.vehicle}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateVehicleResult.data?.vehicleUpdate.errors || []}
        loading={updateVehicleResult.loading}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
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
