import { useCategoryCreateMutation } from "@portal/graphql";
import { Content, Header } from "@portal/UI";
import React from "react";
import { useNavigate } from "react-router-dom";
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
    <div>
      <Header
        title="Nova categoria"
        buttonPath="/admin/categories"
        buttonLabel="Voltar"
        buttonVariant="secondary"
      />
      <Content>
        <CategoryForm
          onSubmit={handleSubmit}
          errors={createCategoryResult.data?.categoryCreate.errors || []}
        />
      </Content>
    </div>
  );
};

export default CategoryCreate;
