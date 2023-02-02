import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { CategoryInput, ErrorFragment } from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import CategoryForm, { FormProps } from "./CategoryForm";

interface CategoryCreatePageProps {
  onSubmit: (data: CategoryInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
}

export const CategoryCreatePage = ({
  onSubmit,
  errors,
  loading,
}: CategoryCreatePageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialData: FormProps = {
    name: "",
    slug: "",
    type: null,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/categories">{t("back")}</Backlink>
            <PageHeader title={t("createCategory")} />
            <CategoryForm errors={errors} onChange={change} data={data} />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/admin/categories")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
