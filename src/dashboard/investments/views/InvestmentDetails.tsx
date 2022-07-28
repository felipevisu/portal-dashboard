import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button, DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  InvestmentUpdateInput,
  ItemCreateInput,
  useInvestmentDeleteMutation,
  useInvestmentDetailsQuery,
  useInvestmentUpdateMutation,
  useItemCreateMutation,
  useItemDeleteMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";

import InvestmentDetailsPage from "../components/InvestmentDetailsPage";
import ItemCreateDialog from "../components/ItemCreateDialog";
import ItemDeleteDialog from "../components/ItemDeleteDialog";

export const InvestmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useInvestmentDetailsQuery({
    variables: { id },
  });

  const [updateInvestment, updateInvestmentResult] =
    useInvestmentUpdateMutation({ onCompleted: () => refetch() });

  const [deleteInvestment] = useInvestmentDeleteMutation({
    onCompleted: () => navigate("/admin/investments"),
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

  const handleItemCreate = (item: ItemCreateInput) => {
    createItem({ variables: { investmentId: id, input: item } });
  };

  const handleItemDelete = () => {
    const itemId = searchParams.get("id");
    if (itemId) {
      deleteItem({ variables: { id: itemId } });
    }
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
            Adicionar
          </Button>
        }
        onDeleteItem={deleteItemModal.openModal}
        loading={updateInvestmentResult.loading}
      />
      <ItemCreateDialog
        isOpen={createItemModal.isOpen}
        onClose={createItemModal.closeModal}
        onConfirm={handleItemCreate}
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
        title="Excluir investimento"
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