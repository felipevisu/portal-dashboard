import React from "react";
import { useTranslation } from "react-i18next";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  CategoryBulkDeleteMutation,
  useCategoriesQuery,
  useCategoryBulkDeleteMutation,
} from "@portal/graphql";
import { useBulkActions, usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import { mapEdgesToItems } from "@portal/utils/maps";

import CategoryListPage from "../components/CategoryListPage";

export const CategoryList = () => {
  const { t } = useTranslation();

  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useCategoriesQuery({
    fetchPolicy: "network-only",
    variables: { ...pagination },
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
          {t("confirmDelete", { count: listElements.length })}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default CategoryList;
