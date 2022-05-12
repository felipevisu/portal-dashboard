import {
  useCategoryDetailsQuery,
  useCategoryUpdateMutation,
  useCategoryDeleteMutation,
  CategoryDeleteMutation,
} from "@portal/graphql";
import { Container } from "@portal/UI";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryForm, { FormProps } from "../components/CategoryForm";

export const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, refetch } = useCategoryDetailsQuery({
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
    <Container>
      <h1>{data.category.name}</h1>
      <Link to="/admin/categories">Voltar</Link>
      <CategoryForm
        initialData={{ name: data.category.name, slug: data.category.slug }}
        onSubmit={handleSubmit}
        errors={updateCategoryResult.data?.categoryUpdate.errors || []}
      />
      <button onClick={handleCategoryDelete}>Excluir</button>
    </Container>
  );
};

export default CategoryDetails;
