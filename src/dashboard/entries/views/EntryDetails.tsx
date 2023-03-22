import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
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

import { mapType } from "./utils";

export const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const { entry: type, id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const paginator = usePaginator();

  const handleUpdateVehicle = (data: EntryUpdateMutation) => {
    if (!data?.entryUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    }
  };

  const [updateVehicle, updateVehicleResult] = useEntryUpdateMutation({
    onCompleted: handleUpdateVehicle,
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

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts,
  } = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      type: mapType[type],
    },
  });

  const { data, loading, refetch } = useEntryDetailsQuery({
    variables: { id: id, ...paginator.pagination },
  });

  const fetchMoreCategories = {
    hasMore: searchCategoryOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCategoryOpts.loading,
    onFetchMore: loadMoreCategories,
  };

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
        fetchCategories={searchCategory}
        fetchMoreCategories={fetchMoreCategories}
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
