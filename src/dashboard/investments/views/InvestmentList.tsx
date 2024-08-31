import React from "react";
import { useTranslation } from "react-i18next";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  InvestmentBulkDeleteMutation,
  useInvestmentBulkDeleteMutation,
  useInvestmentsQuery,
} from "@portal/graphql";
import {
  useBulkActions,
  useFilterHandler,
  useModal,
  usePaginator,
} from "@portal/hooks";
import { mapEdgesToItems, mapNodeToChoice } from "@portal/utils/maps";

import InvestmentListPage from "../components/InvestmentListPage/InvestmentListPage";
import useAppChannel from "@portal/components/AppLayout/AppChannelContext";
import { getFilterOpts, getFilterVariables } from "./filters";
import { useSearchParams } from "react-router-dom";
import NotFound from "@portal/components/NotFound";

export const InvestmentList = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );
  const { isOpen, openModal, closeModal } = useModal();

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandler();

  const { availableChannels } = useAppChannel();
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;

  const filterOpts = getFilterOpts(searchParams, channelOpts);

  const { data, error, loading, refetch } = useInvestmentsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      ...pagination,
      channel: searchParams.get("channel"),
      filter: {
        ...getFilterVariables(searchParams),
      },
    },
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

  if (error) return <NotFound />;

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
        filterOpts={filterOpts}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onFilterReset={resetFilters}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          investmentBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={t("deleteIvestments")}
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
