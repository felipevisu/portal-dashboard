import {
  useCategoryDetailsQuery,
  useCategoryUpdateMutation,
  useCategoryDeleteMutation,
} from "@portal/graphql";
import { Button, Content, Header } from "@portal/UI";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm, { FormProps } from "../components/CategoryForm";

export const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useCategoryDetailsQuery({
    variables: { id },
  });

  const [updateCategory, updateCategoryResult] = useCategoryUpdateMutation();
  const [deleteCategory] = useCategoryDeleteMutation({
    onCompleted: () => navigate("/admin/categories"),
  });

  const handleCategoryDelete = async () => {
    await deleteCategory({ variables: { id } });
  };

  const handleSubmit = async (data: FormProps) => {
    await updateCategory({
      variables: { id: id, input: { ...data } },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.category) {
    return <div>Categoria não encontrada</div>;
  }

  return (
    <div>
      <Header
        title={data.category.name}
        buttonPath="/admin/categories"
        buttonLabel="Voltar"
        buttonVariant="secondary"
      />
      <Content>
        <CategoryForm
          initialData={{ name: data.category.name, slug: data.category.slug }}
          onSubmit={handleSubmit}
          errors={updateCategoryResult.data?.categoryUpdate.errors || []}
        />
        <div className="bg-gray-50 p-2 rounded-md mt-4 flex justify-end">
          <Button variant="danger" onClick={handleCategoryDelete}>
            Excluir
          </Button>
        </div>
      </Content>
    </div>
  );
};

export default CategoryDetails;
