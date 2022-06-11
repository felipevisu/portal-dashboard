import React from "react";
import { DialogContentText, IconButton } from "@mui/material";
import {
  useCategoriesQuery,
  useCategoryBulkDeleteMutation,
  CategoryBulkDeleteMutation,
} from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";
import CategoryListPage from "../components/CategoryListPage";
import { useBulkActions, usePaginator, useSearch } from "@portal/hooks";
import ActionDialog from "@portal/components/ActionDialog";
import useModal from "@portal/hooks/useModal";
import { Delete } from "@mui/icons-material";

export const CategoryList = () => {
  const { search, handleSearch } = useSearch();
  const { after, first, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: { search, after, first },
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
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.categories?.pageInfo}
      />
      <ActionDialog
        confirmButtonLabel="Excluir"
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
