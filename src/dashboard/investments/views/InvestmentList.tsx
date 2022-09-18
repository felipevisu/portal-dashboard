import React from "react";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  InvestmentBulkDeleteMutation,
  useInvestmentBulkDeleteMutation,
  useInvestmentsQuery,
} from "@portal/graphql";
import { useBulkActions, useModal, usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import InvestmentListPage from "../components/InvestmentListPage";

export const InvestmentList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );
  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useInvestmentsQuery({
    fetchPolicy: "cache-and-network",
    variables: { ...pagination },
  });

  const handleInvestmentBulkDelete = (data: InvestmentBulkDeleteMutation) => {
    if (data.investmentBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [investmentBulkDelete] = useInvestmentBulkDeleteMutation({
    onCompleted: handleInvestmentBulkDelete,
  });

  return (
    <>
      <InvestmentListPage
        disabled={loading}
        toggle={toggle}
        toggleAll={toggleAll}
        investments={mapEdgesToItems(data?.investments)}
        selected={listElements.length}
        isChecked={isSelected}
        toolbar={
          <IconButton color="primary" onClick={openModal}>
            <Delete />
          </IconButton>
        }
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.investments?.pageInfo}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          investmentBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={"Excluir investimentos"}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir {listElements.length} investimentos?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default InvestmentList;
