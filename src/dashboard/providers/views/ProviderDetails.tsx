import React, { useEffect } from "react";
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
  EntryTypeEnum,
  EntryUpdateMutation,
  useEntryDeleteMutation,
  useEntryDetailsQuery,
  useEntryUpdateMutation,
} from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems } from "@portal/utils/maps";

export const ProviderDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const paginator = usePaginator();

  const handleUpdateProvider = (data: EntryUpdateMutation) => {
    if (!data?.entryUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    }
  };

  const [updateProvider, updateProviderResult] = useEntryUpdateMutation({
    onCompleted: handleUpdateProvider,
  });

  const handleSubmit = async (data: EntryInput) => {
    await updateProvider({ variables: { id: id, input: { ...data } } });
  };

  const [deleteProvider] = useEntryDeleteMutation({
    onCompleted: () => navigate("/providers"),
  });

  const handleProviderDelete = async () => {
    await deleteProvider({ variables: { id } });
  };

  const { result: searchCategoryOpts } = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      type: EntryTypeEnum.PROVIDER,
    },
  });

  const { data, loading, refetch } = useEntryDetailsQuery({
    variables: { id: id, ...paginator.pagination },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <CircularLoading />;

  if (!data?.entry) return <NotFound />;

  return (
    <>
      <EntryDetailsPage
        entry={data.entry}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateProviderResult.data?.entryUpdate.errors || []}
        loading={updateProviderResult.loading}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        paginator={paginator}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleProviderDelete}
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

export default ProviderDetails;
