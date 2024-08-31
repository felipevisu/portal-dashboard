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
import { useLinks } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";

import { CategoryDetailsPage } from "../components/CategoryDetailsPage";

export const CategoryDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { categoryList } = useLinks();
  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, error } = useCategoryDetailsQuery({
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const handleUpdateCategory = (data: CategoryUpdateMutation) => {
    if (data.categoryUpdate.errors.length === 0)
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
  };

  const [updateCategory, updateCategoryResult] = useCategoryUpdateMutation({
    onCompleted: handleUpdateCategory,
  });

  const [deleteCategory] = useCategoryDeleteMutation({
    onCompleted: () => navigate(categoryList()),
  });

  const handleCategoryDelete = async () => {
    await deleteCategory({ variables: { id } });
  };

  const handleSubmit = async (data: CategoryInput) => {
    await updateCategory({
      variables: { id: id, input: { ...data } },
    });
  };

  if (error) return <NotFound />;
  if (loading) return <CircularLoading />;

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
        title={t("category.deleteDialog.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("category.deleteDialog.description", {
            name: data.category.name,
          })}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default CategoryDetails;
