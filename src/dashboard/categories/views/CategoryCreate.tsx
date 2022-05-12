import { useCategoryCreateMutation } from "@portal/graphql";
import { Container } from "@portal/UI";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryForm, { FormProps } from "../components/CategoryForm";

export const CategoryCreate = () => {
  const [createCategory, createCategoryResult] = useCategoryCreateMutation();
  const navigator = useNavigate();

  const handleSubmit = async (data: FormProps) => {
    const result = await createCategory({ variables: { input: { ...data } } });
    if (!result.data?.categoryCreate.errors.length) {
      navigator(
        `/admin/categories/details/${result.data?.categoryCreate.category.id}`
      );
    }
  };

  return (
    <Container>
      <h1>Nova categoria</h1>
      <Link to="/admin/categories">Voltar</Link>
      <CategoryForm
        onSubmit={handleSubmit}
        errors={createCategoryResult.data?.categoryCreate.errors || []}
      />
    </Container>
  );
};

export default CategoryCreate;
