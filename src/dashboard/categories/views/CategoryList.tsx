import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  CategoryBulkDeleteMutation,
  useCategoriesQuery,
  useCategoryBulkDeleteMutation,
} from "@portal/graphql";
import { useBulkActions, usePaginator, useSearch } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import { getQuery } from "@portal/utils/filters";
import { mapEdgesToItems } from "@portal/utils/maps";

import CategoryListPage from "../components/CategoryListPage";

import { getFilterOpts } from "./filter";

export const CategoryList = () => {
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const filterOpts = getFilterOpts();

  const queryParameters = useMemo(
    () => getQuery(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading, refetch } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: { ...pagination, filter: { search, ...queryParameters } },
  });

  const handleCategoryBulkDelete = (data: CategoryBulkDeleteMutation) => {
    if (data.categoryBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [categoryBulkDelete] = useCategoryBulkDeleteMutation({
    onCompleted: handleCategoryBulkDelete,
  });

  return (
    <>
      <CategoryListPage
        disabled={loading}
        toggle={toggle}
        toggleAll={toggleAll}
        categories={mapEdgesToItems(data?.categories)}
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
        pageInfo={data?.categories?.pageInfo}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          categoryBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={"Excluir categorias"}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir {listElements.length} categorias?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default CategoryList;
