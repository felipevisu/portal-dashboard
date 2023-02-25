import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  CategoryFragment,
  CategoryInput,
  ErrorFragment,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import CategoryForm, { FormProps } from "./CategoryForm";

interface CategoryDetailsPageProps {
  category: CategoryFragment;
  onSubmit: (data: CategoryInput) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
}

export const CategoryDetailsPage = ({
  category,
  onSubmit,
  onDelete,
  errors,
  loading,
}: CategoryDetailsPageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = () => {
    onDelete();
  };

  const initialData: FormProps = {
    name: category.name,
    slug: category.slug,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, data, submit }) => {
        return (
          <>
            <Backlink href="/categories">{t("back")}</Backlink>
            <PageHeader title={category?.name} />
            <CategoryForm errors={errors} onChange={change} data={data} />
            <Savebar
              onSubmit={submit}
              onDelete={handleDelete}
              onCancel={() => navigate("/categories")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
