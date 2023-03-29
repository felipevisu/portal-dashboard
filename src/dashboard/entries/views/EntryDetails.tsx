import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  EntryInput,
  EntryUpdateMutation,
  useEntryDeleteMutation,
  useEntryDetailsQuery,
  useEntryUpdateMutation,
} from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useAttributeSearch from "@portal/searches/useAttributeSearch";
import useCategorySearch from "@portal/searches/useCategorySearch";
import useAttributeValueSearchHandler from "@portal/utils/handlers/attributeValueSearchHandler";
import { mapEdgesToItems } from "@portal/utils/maps";

import { EntryDetailsPage } from "../components/EntryDetailsPage";

import { mapType } from "./utils";

export const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const { entry: type, id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const paginator = usePaginator();

  const handleUpdateEntry = (data: EntryUpdateMutation) => {
    if (!data?.entryUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    }
  };

  const [updateEntry, updateEntryResult] = useEntryUpdateMutation({
    onCompleted: handleUpdateEntry,
  });

  const handleSubmit = async (data: EntryInput) => {
    await updateEntry({ variables: { id: id, input: { ...data } } });
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
        errors={updateEntryResult.data?.entryUpdate.errors || []}
        loading={updateEntryResult.loading}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        paginator={paginator}
        fetchCategories={searchCategory}
        fetchMoreCategories={fetchMoreCategories}
        attributeValues={
          mapEdgesToItems(searchAttributeValuesOpts?.data?.attribute.choices) ||
          []
        }
        fetchAttributeValues={searchAttributeValues}
        fetchMoreAttributeValues={fetchMoreAttributeValues}
        onAttributeSelectBlur={searchAttributeReset}
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
