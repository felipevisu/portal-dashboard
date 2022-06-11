import {
  CategoryCreateMutation,
  useCategoryCreateMutation,
} from "@portal/graphql";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCreatePage } from "../components/CategoryCreatePage";
import { FormProps } from "../components/CategoryForm";

export const CategoryCreate = () => {
  const navigator = useNavigate();

  const handleSuccess = (data: CategoryCreateMutation) => {
    if (!data?.categoryCreate.errors.length) {
      navigator(
        `/admin/categories/details/${data?.categoryCreate.category.id}`
      );
    }
  };

  const [createCategory, createCategoryResult] = useCategoryCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
    await createCategory({ variables: { input: { ...data } } });
  };

  return (
    <CategoryCreatePage
      onSubmit={handleSubmit}
      errors={createCategoryResult.data?.categoryCreate.errors || []}
      loading={createCategoryResult.loading}
    />
  );
};

export default CategoryCreate;
