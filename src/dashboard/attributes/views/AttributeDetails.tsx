import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  AttributeUpdateInput,
  AttributeUpdateMutation,
  AttributeValueCreateInput,
  AttributeValueUpdateInput,
  AttributeValueUpdateMutation,
  useAttributeDeleteMutation,
  useAttributeDetailsQuery,
  useAttributeUpdateMutation,
  useAttributeValueCreateMutation,
  useAttributeValueDeleteMutation,
  useAttributeValueUpdateMutation,
} from "@portal/graphql";
import { useLinks, useModal, usePaginator } from "@portal/hooks";

import AttributeDetailsPage from "../components/AttributeDetailsPage";
import ValueCreateDialog from "../components/ValueCreateDialog";
import ValueDeleteDialog from "../components/ValueDeleteDialog";
import ValueUpdateDialog from "../components/ValueUpdateDialog";
import { attributeValueFragmentToFormData } from "../utils/data";

export const AttributeDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { attributeList } = useLinks();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen, openModal, closeModal } = useModal();

  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data, loading, refetch } = useAttributeDetailsQuery({
    variables: { id, ...pagination },
  });

  const handleUpdateAttribute = (data: AttributeUpdateMutation) => {
    if (!data?.attributeUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
      refetch();
    }
  };

  const [updateAttribute, updateAttributeResult] = useAttributeUpdateMutation({
    onCompleted: handleUpdateAttribute,
  });

  const [deleteAttribute] = useAttributeDeleteMutation({
    onCompleted: () => navigate(attributeList()),
  });

  const handleAttributeDelete = async () => {
    await deleteAttribute({ variables: { id } });
  };

  const handleSubmit = async (data: AttributeUpdateInput) => {
    await updateAttribute({
      variables: { id: id, input: { ...data } },
    });
  };

  const createValueModal = useModal();
  const updateValueModal = useModal();
  const deleteValueModal = useModal();

  const [createValue] = useAttributeValueCreateMutation({
    onCompleted: () => {
      setSearchParams({});
      createValueModal.closeModal();
      refetch();
    },
  });

  const [updateValue, updateValueResult] = useAttributeValueUpdateMutation({
    onCompleted: (data: AttributeValueUpdateMutation) => {
      if (!data.attributeValueUpdate.errors.length) {
        setSearchParams({});
        updateValueModal.closeModal();
        refetch();
      }
    },
  });

  const [deleteValue] = useAttributeValueDeleteMutation({
    onCompleted: () => {
      setSearchParams({});
      deleteValueModal.closeModal();
      refetch();
    },
  });

  const handleValueCreate = async (value: AttributeValueCreateInput) => {
    await createValue({ variables: { id: id, input: value, ...pagination } });
  };

  const handleValueUpdate = async (input: AttributeValueUpdateInput) => {
    const valueId = searchParams.get("id");
    await updateValue({
      variables: { id: valueId, input: input, ...pagination },
    });
  };

  const handleValueDelete = async () => {
    const valueId = searchParams.get("id");
    if (valueId) {
      await deleteValue({ variables: { id: valueId, ...pagination } });
    }
  };

  if (loading) return <CircularLoading />;

  if (!data?.attribute) return <NotFound />;

  return (
    <>
      <AttributeDetailsPage
        attribute={data.attribute}
        errors={updateAttributeResult.data?.attributeUpdate?.errors || []}
        onSubmit={handleSubmit}
        onDelete={openModal}
        onCreateValue={createValueModal.openModal}
        onUpdateValue={updateValueModal.openModal}
        onDeleteValue={deleteValueModal.openModal}
        loading={updateAttributeResult.loading}
        onNext={handleNextPage}
        onPrev={handlePreviousPage}
      />
      <ValueCreateDialog
        isOpen={createValueModal.isOpen}
        onClose={createValueModal.closeModal}
        onConfirm={handleValueCreate}
      />
      <ValueUpdateDialog
        attributeValue={attributeValueFragmentToFormData(
          data?.attribute?.choices?.edges?.find(
            (value) => searchParams.get("id") === value.node.id
          )?.node ?? null
        )}
        errors={updateValueResult.data?.attributeValueUpdate?.errors || []}
        isOpen={updateValueModal.isOpen}
        onClose={updateValueModal.closeModal}
        onConfirm={handleValueUpdate}
      />
      <ValueDeleteDialog
        isOpen={deleteValueModal.isOpen}
        onClose={deleteValueModal.closeModal}
        onConfirm={handleValueDelete}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleAttributeDelete}
        open={isOpen}
        title={t("attribute.deleteDialog.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("attribute.deleteDialog.description", {
            name: data.attribute.name,
          })}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default AttributeDetails;
