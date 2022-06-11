import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  useCategoryDetailsQuery,
  useCategoryUpdateMutation,
  useCategoryDeleteMutation,
} from "@portal/graphql";
import useModal from "@portal/hooks/useModal";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryDetailsPage } from "../components/CategoryDetailsPage";
import { FormProps } from "../components/CategoryForm";

export const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useCategoryDetailsQuery({
    variables: { id },
  });
  const { isOpen, openModal, closeModal } = useModal();

  const [updateCategory, updateCategoryResult] = useCategoryUpdateMutation();
  const [deleteCategory] = useCategoryDeleteMutation({
    onCompleted: () => navigate("/admin/categories"),
  });

  const handleCategoryDelete = async () => {
    await deleteCategory({ variables: { id } });
  };

  const handleSubmit = async (data: FormProps) => {
    await updateCategory({
      variables: { id: id, input: { name: data.name, slug: data.slug } },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.category) {
    return <div>Categoria não encontrada</div>;
  }

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
        title="Excluir categoria"
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
