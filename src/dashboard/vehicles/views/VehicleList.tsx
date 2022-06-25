import React, { useMemo } from "react";
import { DialogContentText, IconButton } from "@mui/material";
import {
  useVehicleBulkDeleteMutation,
  VehicleBulkDeleteMutation,
  useVehiclesQuery,
} from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";
import VehicleListPage, {
  VehicleListFilterOpts,
} from "../components/VehicleListPage";
import { useBulkActions, usePaginator, useSearch } from "@portal/hooks";
import ActionDialog from "@portal/components/ActionDialog";
import useModal from "@portal/hooks/useModal";
import { Delete } from "@mui/icons-material";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { getChoices } from "@portal/utils/data";
import { getFilterOpts } from "./filter";
import { useSearchParams } from "react-router-dom";
import { getQuery } from "@portal/utils/filters";

export const VehicleList = () => {
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { after, first, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { result: searchCategoryOpts } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const categories = getChoices(
    mapEdgesToItems(searchCategoryOpts?.data?.search) || []
  );

  const filterOpts = getFilterOpts(categories);

  const queryParameters = useMemo(
    () => getQuery<VehicleListFilterOpts>(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading, refetch } = useVehiclesQuery({
    fetchPolicy: "cache-and-network",
    variables: { search, after, first, ...queryParameters },
  });

  const handleVehicleBulkDelete = (data: VehicleBulkDeleteMutation) => {
    if (data.vehicleBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [vehicleBulkDelete] = useVehicleBulkDeleteMutation({
    onCompleted: handleVehicleBulkDelete,
  });

  return (
    <>
      <VehicleListPage
        disabled={loading}
        toggle={toggle}
        toggleAll={toggleAll}
        vehicles={mapEdgesToItems(data?.vehicles)}
        selected={listElements.length}
        isChecked={isSelected}
        toolbar={
          <IconButton color="primary" onClick={openModal}>
            <Delete />
          </IconButton>
        }
        onSearchChange={handleSearch}
        initialSearch={search}
        filterOpts={filterOpts}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.vehicles?.pageInfo}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          vehicleBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={"Excluir veículos"}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir {listElements.length} veículos?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default VehicleList;
