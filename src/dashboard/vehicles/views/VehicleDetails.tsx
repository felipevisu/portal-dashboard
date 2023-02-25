import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import { EntryDetailsPage } from "@portal/dashboard/entries/components/EntryDetailsPage";
import {
  EntryInput,
  EntryUpdateMutation,
  useEntryDeleteMutation,
  useEntryDetailsQuery,
  useEntryUpdateMutation,
} from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";

export const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const paginator = usePaginator();

  const handleSuccess = (data: EntryUpdateMutation) => {
    if (!data?.entryUpdate.errors.length) {
      navigate(`/vehicles/details/${data?.entryUpdate.entry.id}`);
    }
  };

  const [updateVehicle, updateVehicleResult] = useEntryUpdateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: EntryInput) => {
    await updateVehicle({ variables: { id: id, input: { ...data } } });
  };

  const [deleteVehicle] = useEntryDeleteMutation({
    onCompleted: () => navigate("/vehicles"),
  });

  const handleVehicleDelete = async () => {
    await deleteVehicle({ variables: { id } });
  };

  const { result: searchCategoryOpts } = useCategorySearch({
    variables: { first: 20, query: "" },
  });

  const { data, loading, refetch } = useEntryDetailsQuery({
    variables: { id: id, ...paginator.pagination },
  });

  useEffect(() => {
    if (data?.entry) {
      setVehicle(data.entry);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (loading && !vehicle) return <CircularLoading />;

  if (!vehicle) return <NotFound />;

  return (
    <>
      <EntryDetailsPage
        entry={vehicle}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateVehicleResult.data?.entryUpdate.errors || []}
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
          Tem certeza que deseja excluir o veículo <b>{data?.entry?.name}</b>
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default VehicleDetails;
