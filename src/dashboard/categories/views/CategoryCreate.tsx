import React from "react";
import { useNavigate } from "react-router-dom";

import {
  CategoryCreateMutation,
  CategoryInput,
  useCategoryCreateMutation,
} from "@portal/graphql";

import { CategoryCreatePage } from "../components/CategoryCreatePage";

export const CategoryCreate = () => {
  const navigator = useNavigate();

  const handleSuccess = (data: CategoryCreateMutation) => {
    if (!data?.categoryCreate.errors.length) {
      navigator(`/categories/details/${data?.categoryCreate.category.id}`);
    }
  };

  const [createCategory, createCategoryResult] = useCategoryCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: CategoryInput) => {
    await createCategory({
      variables: { input: { ...data } },
    });
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
