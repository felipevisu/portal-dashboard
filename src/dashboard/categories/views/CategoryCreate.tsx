import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  CategoryCreateMutation,
  CategoryInput,
  useCategoryCreateMutation,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import { CategoryCreatePage } from "../components/CategoryCreatePage";

export const CategoryCreate = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const { categoryDetails } = useLinks();

  const handleCreateCategory = (data: CategoryCreateMutation) => {
    if (!data?.categoryCreate.errors.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigator(categoryDetails(data?.categoryCreate.category.id));
    }
  };

  const [createCategory, createCategoryResult] = useCategoryCreateMutation({
    onCompleted: handleCreateCategory,
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
