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
import { useLinks } from "@portal/hooks";
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
  const { categoryList } = useLinks();

  const initialData: FormProps = {
    name: category.name,
    slug: category.slug,
    type: category.type,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, data, submit }) => {
        return (
          <>
            <Backlink href={categoryList()}>{t("back")}</Backlink>
            <PageHeader title={`${t("category.title")}: ${category?.name}`} />
            <CategoryForm
              errors={errors}
              onChange={change}
              data={data}
              disabled={loading}
            />
            <Savebar
              onSubmit={submit}
              onDelete={() => onDelete()}
              onCancel={() => navigate(categoryList())}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
