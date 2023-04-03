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
  ConsultDocumentMutation,
  EntryInput,
  EntryUpdateMutation,
  useAttributesQuery,
  useConsultDocumentMutation,
  useEntryDeleteMutation,
  useEntryDetailsQuery,
  useEntryUpdateMutation,
} from "@portal/graphql";
import { useLinks, usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useCategorySearch from "@portal/searches/useCategorySearch";
import useAttributeValueSearchHandler from "@portal/utils/handlers/attributeValueSearchHandler";
import { mapEdgesToItems } from "@portal/utils/maps";

import { EntryDetailsPage } from "../components/EntryDetailsPage";

import { mapType } from "./utils";

export const EntryDetails = () => {
  const { entry: type, id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const paginator = usePaginator();
  const { entryList } = useLinks();

  const { data, loading, refetch } = useEntryDetailsQuery({
    variables: { id: id, ...paginator.pagination },
  });

  const handleUpdateEntryResult = (data: EntryUpdateMutation) => {
    if (!data?.entryUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    }
  };

  const [updateEntry, updateEntryResult] = useEntryUpdateMutation({
    onCompleted: handleUpdateEntryResult,
  });

  const handleSubmit = async (data: EntryInput) => {
    await updateEntry({ variables: { id: id, input: { ...data } } });
  };

  const handleConsultDocumentResult = (data: ConsultDocumentMutation) => {
    if (!data?.consultDocument?.errors.length) {
      toast(t("consult.success"), { type: toast.TYPE.SUCCESS });
      refetch();
    }
    if (data?.consultDocument?.errors.length) {
      toast(data.consultDocument.errors[0].message, {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const [consultDocument, consultDocumentResult] = useConsultDocumentMutation({
    onCompleted: handleConsultDocumentResult,
  });

  const handleConsultDocument = async () => {
    await consultDocument({ variables: { id } });
  };

  const [deleteVehicle] = useEntryDeleteMutation({
    onCompleted: () => navigate(entryList(type)),
  });

  const handleVehicleDelete = async () => {
    await deleteVehicle({ variables: { id } });
  };

  const { data: searchAttributeOpts } = useAttributesQuery({
    fetchPolicy: "network-only",
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      filter: { type: mapType[type] },
    },
  });

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
    refetch();
  }, []);

  if (loading && !data?.entry) return <CircularLoading />;

  return (
    <>
      <EntryDetailsPage
        entry={data?.entry}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateEntryResult.data?.entryUpdate.errors || []}
        loading={updateEntryResult.loading || consultDocumentResult.loading}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        paginator={paginator}
        fetchCategories={searchCategory}
        fetchMoreCategories={fetchMoreCategories}
        attributes={mapEdgesToItems(searchAttributeOpts?.attributes) || []}
        attributeValues={
          mapEdgesToItems(searchAttributeValuesOpts?.data?.attribute.choices) ||
          []
        }
        fetchAttributeValues={searchAttributeValues}
        fetchMoreAttributeValues={fetchMoreAttributeValues}
        onAttributeSelectBlur={searchAttributeReset}
        onConsultDocument={handleConsultDocument}
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

export default EntryDetails;
