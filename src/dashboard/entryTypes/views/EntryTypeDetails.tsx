import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  AssignEntryAttributeMutation,
  EntryTypeInput,
  EntryTypeUpdateMutation,
  UnassignEntryAttributeMutation,
  useEntryTypeDetailsQuery,
  useEntryTypeUpdateMutation,
} from "@portal/graphql";
import { useBulkActions, useLinks } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";

import { EntryTypeDetailsPage } from "../components/EntryTypeDetailsPage";
import useAvailableEntryAttributeSearch from "@portal/searches/useAvailableEntryAttributeSearch";
import useEntryTypeOperations from "../hooks/useEntryTypeOperations";
import { Button } from "@portal/components/Button";
import AttributesAvailableDialog from "../components/AttributesAvailableDialog";
import { mapEdgesToItems } from "@portal/utils/maps";

export const EntryTypeDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { entryTypeList } = useLinks();
  const [searchParams, setSearchParams] = useSearchParams();
  const deleteModal = useModal();
  const assignAttributesModal = useModal();
  const unassignAttributeModal = useModal();

  const entryAttributeListActions = useBulkActions();

  const { loadMore, search, result } = useAvailableEntryAttributeSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      id,
    },
  });

  const [errors, setErrors] = useState({
    addAttributeErrors: [],
    formErrors: [],
  });

  const { data, loading, refetch } = useEntryTypeDetailsQuery({
    variables: { id },
  });

  const handleUpdateEntryType = (data: EntryTypeUpdateMutation) => {
    if (data.entryTypeUpdate.errors.length === 0) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        formErrors: data.entryTypeUpdate.errors,
      }));
    }
  };

  const [updateEntryType, updateEntryTypeResult] = useEntryTypeUpdateMutation({
    onCompleted: handleUpdateEntryType,
  });

  const handleAttributeAssignSuccess = (data: AssignEntryAttributeMutation) => {
    if (data.entryAttributeAssign.errors.length === 0) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
      assignAttributesModal.closeModal();
      refetch();
    } else if (
      data.entryAttributeAssign.errors !== null &&
      data.entryAttributeAssign.errors.length > 0
    ) {
      console.log(data);
      setErrors((prevErrors) => ({
        ...prevErrors,
        addAttributeErrors: data.entryAttributeAssign.errors,
      }));
    }
  };
  const handleAttributeUnassignSuccess = (
    data: UnassignEntryAttributeMutation
  ) => {
    if (data.entryAttributeUnassign.errors.length === 0) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
      entryAttributeListActions.reset();
      unassignAttributeModal.closeModal();
      refetch();
    }
  };

  const { assignAttribute, deleteEntryType, unassignAttribute } =
    useEntryTypeOperations({
      onAssignAttribute: handleAttributeAssignSuccess,
      onUnassignAttribute: handleAttributeUnassignSuccess,
    });

  const handleEntryTypeDelete = () => deleteEntryType.mutate({ id });

  const handleAssignAttribute = () =>
    assignAttribute.mutate({
      id,
      operations: entryAttributeListActions.listElements.map((element) => ({
        id: element,
      })),
    });

  const handleUnassignAttribute = () =>
    unassignAttribute.mutate({
      id,
      ids: [searchParams.get("id")],
    });

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
        onDelete={deleteModal.openModal}
        loading={updateEntryTypeResult.loading}
        onAssignAttribute={assignAttributesModal.openModal}
        onUnassignAttribute={unassignAttributeModal.openModal}
      />
      <ActionDialog
        onClose={deleteModal.closeModal}
        onConfirm={handleEntryTypeDelete}
        open={deleteModal.isOpen}
        title={t("entryType.deleteDialog.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("entryType.deleteDialog.description")}
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        onClose={unassignAttributeModal.closeModal}
        onConfirm={handleUnassignAttribute}
        open={unassignAttributeModal.isOpen}
        title={t("entryType.attributes.unassignDialog.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("entryType.attributes.unassignDialog.description")}
        </DialogContentText>
      </ActionDialog>
      <AttributesAvailableDialog
        title={t("entryType.attributes.dialog.title")}
        attributes={
          mapEdgesToItems(result?.data?.entryType?.availableAttributes) || []
        }
        open={assignAttributesModal.isOpen}
        isSelected={entryAttributeListActions.isSelected}
        toggleAll={entryAttributeListActions.toggleAll}
        onClose={() => {
          assignAttributesModal.closeModal();
          entryAttributeListActions.reset();
        }}
        onChange={(id: string) => entryAttributeListActions.toggle(id)}
        onConfirm={handleAssignAttribute}
      />
    </>
  );
};

export default EntryTypeDetails;
