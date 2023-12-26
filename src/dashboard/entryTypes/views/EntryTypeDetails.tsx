import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  EntryTypeInput,
  EntryTypeUpdateMutation,
  useEntryTypeDeleteMutation,
  useEntryTypeDetailsQuery,
  useEntryTypeUpdateMutation,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";

import { EntryTypeDetailsPage } from "../components/EntryTypeDetailsPage";

export const EntryTypeDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { entryTypeList } = useLinks();
  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading } = useEntryTypeDetailsQuery({
    variables: { id },
  });

  const handleUpdateEntryType = (data: EntryTypeUpdateMutation) => {
    if (data.entryTypeUpdate.errors.length === 0)
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
  };

  const [updateEntryType, updateEntryTypeResult] = useEntryTypeUpdateMutation({
    onCompleted: handleUpdateEntryType,
  });

  const [deleteEntryType] = useEntryTypeDeleteMutation({
    onCompleted: () => navigate(entryTypeList()),
  });

  const handleEntryTypeDelete = async () => {
    await deleteEntryType({ variables: { id } });
  };

  const handleSubmit = async (data: EntryTypeInput) => {
    await updateEntryType({
      variables: { id: id, input: { ...data } },
    });
  };

  if (loading) return <CircularLoading />;

  if (!data?.entryType) return <NotFound />;

  return (
    <>
      <EntryTypeDetailsPage
        entryType={data.entryType}
        errors={updateEntryTypeResult.data?.entryTypeUpdate?.errors || []}
        onSubmit={handleSubmit}
        onDelete={openModal}
        loading={updateEntryTypeResult.loading}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleEntryTypeDelete}
        open={isOpen}
        title={t("entryType.deleteDialog.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("entryType.deleteDialog.description", {
            name: data.entryType.name,
          })}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default EntryTypeDetails;
