import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  CategoryInput,
  CategoryUpdateMutation,
  useCategoryDeleteMutation,
  useCategoryDetailsQuery,
  useCategoryUpdateMutation,
} from "@portal/graphql";
import useModal from "@portal/hooks/useModal";

import { CategoryDetailsPage } from "../components/CategoryDetailsPage";

export const CategoryDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading } = useCategoryDetailsQuery({
    variables: { id },
  });

  const handleUpdateCategory = (data: CategoryUpdateMutation) => {
    if (data.categoryUpdate.errors.length === 0)
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
  };

  const [updateCategory, updateCategoryResult] = useCategoryUpdateMutation({
    onCompleted: handleUpdateCategory,
  });

  const [deleteCategory] = useCategoryDeleteMutation({
    onCompleted: () => navigate("/categories"),
  });

  const handleCategoryDelete = async () => {
    await deleteCategory({ variables: { id } });
  };

  const handleSubmit = async (data: CategoryInput) => {
    await updateCategory({
      variables: { id: id, input: { ...data } },
    });
  };

  if (loading) return <CircularLoading />;

  if (!data?.category) return <NotFound />;

  return (
    <>
      <CategoryDetailsPage
        category={data.category}
        errors={updateCategoryResult.data?.categoryUpdate?.errors || []}
        onSubmit={handleSubmit}
        onDelete={openModal}
        loading={updateCategoryResult.loading}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleCategoryDelete}
        open={isOpen}
        title={t("category.delete")}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir a categoria{" "}
          <b>{data?.category?.name}</b>
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default CategoryDetails;
