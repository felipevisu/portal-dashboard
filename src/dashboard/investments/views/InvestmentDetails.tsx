import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  InvestmentUpdateInput,
  InvestmentUpdateMutation,
  ItemCreateInput,
  ItemInput,
  ItemUpdateMutation,
  useInvestmentDeleteMutation,
  useInvestmentDetailsQuery,
  useInvestmentUpdateMutation,
  useItemCreateMutation,
  useItemDeleteMutation,
  useItemUpdateMutation,
} from "@portal/graphql";
import { useLinks, useModal } from "@portal/hooks";

import InvestmentDetailsPage from "../components/InvestmentDetailsPage";
import ItemCreateDialog from "../components/ItemCreateDialog";
import ItemDeleteDialog from "../components/ItemDeleteDialog";
import ItemUpdateDialog from "../components/ItemUpdateDialog";
import { itemFragmentToFormData } from "../utils/data";

export const InvestmentDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { investmentList } = useLinks();

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useInvestmentDetailsQuery({
    variables: { id },
  });

  const handleUpdateInvestment = (data: InvestmentUpdateMutation) => {
    if (!data?.investmentUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
      refetch();
    }
  };

  const [updateInvestment, updateInvestmentResult] =
    useInvestmentUpdateMutation({ onCompleted: handleUpdateInvestment });

  const [deleteInvestment] = useInvestmentDeleteMutation({
    onCompleted: () => navigate(investmentList()),
  });

  const handleInvestmentDelete = async () => {
    await deleteInvestment({ variables: { id } });
  };

  const handleSubmit = async (data: InvestmentUpdateInput) => {
    await updateInvestment({
      variables: { id: id, input: { ...data } },
    });
  };

  const createItemModal = useModal();
  const deleteItemModal = useModal();
  const updateItemModal = useModal();

  const [createItem] = useItemCreateMutation({
    onCompleted: () => {
      setSearchParams({});
      createItemModal.closeModal();
      refetch();
    },
  });

  const [deleteItem] = useItemDeleteMutation({
    onCompleted: () => {
      setSearchParams({});
      deleteItemModal.closeModal();
      refetch();
    },
  });

  const [updateItem, updateItemResult] = useItemUpdateMutation({
    onCompleted: (data: ItemUpdateMutation) => {
      if (!data.itemUpdate.errors.length) {
        setSearchParams({});
        updateItemModal.closeModal();
        refetch();
      }
    },
  });

  const handleItemCreate = (item: ItemCreateInput) => {
    createItem({ variables: { investmentId: id, input: item } });
  };

  const handleItemDelete = () => {
    const itemId = searchParams.get("id");
    if (itemId) {
      deleteItem({ variables: { id: itemId } });
    }
  };

  const handleItemUpdate = async (input: ItemInput) => {
    const valueId = searchParams.get("id");
    await updateItem({
      variables: { id: valueId, input: input },
    });
  };

  if (loading) return <CircularLoading />;

  if (!data?.investment) return <NotFound />;

  return (
    <>
      <InvestmentDetailsPage
        investment={data.investment}
        errors={updateInvestmentResult.data?.investmentUpdate?.errors || []}
        onSubmit={handleSubmit}
        onDelete={openModal}
        tollbar={
          <Button
            color="primary"
            variant="outlined"
            onClick={createItemModal.openModal}
          >
            {t("add")}
          </Button>
        }
        onDeleteItem={deleteItemModal.openModal}
        onUpdateItem={updateItemModal.openModal}
        loading={updateInvestmentResult.loading}
      />
      <ItemCreateDialog
        isOpen={createItemModal.isOpen}
        onClose={createItemModal.closeModal}
        onConfirm={handleItemCreate}
      />
      <ItemUpdateDialog
        item={itemFragmentToFormData(
          data?.investment.items?.find(
            (value) => searchParams.get("id") === value.id
          ) ?? null
        )}
        errors={updateItemResult.data?.itemUpdate?.errors || []}
        isOpen={updateItemModal.isOpen}
        onClose={updateItemModal.closeModal}
        onConfirm={handleItemUpdate}
      />
      <ItemDeleteDialog
        isOpen={deleteItemModal.isOpen}
        onClose={deleteItemModal.closeModal}
        onConfirm={handleItemDelete}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleInvestmentDelete}
        open={isOpen}
        title={t("investment.delete")}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir o investimento?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default InvestmentDetails;
