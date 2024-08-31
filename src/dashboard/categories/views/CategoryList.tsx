import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  CategoryBulkDeleteMutation,
  useCategoriesQuery,
  useCategoryBulkDeleteMutation,
} from "@portal/graphql";
import { useBulkActions, useFilterHandler, usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import { mapEdgesToItems } from "@portal/utils/maps";

import CategoryListPage from "../components/CategoryListPage";

import { getFilterVariables } from "./filters";
import NotFound from "@portal/components/NotFound";

export const CategoryList = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch, error } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: { ...pagination, filter: getFilterVariables(searchParams) },
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

  const [, , handleSearchChange] = useFilterHandler();

  if (error) return <NotFound />;

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
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.categories?.pageInfo}
        onSearchChange={handleSearchChange}
        initialSearch={searchParams.get("search") || ""}
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
          {t("confirmDelete", { count: listElements.length })}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default CategoryList;
