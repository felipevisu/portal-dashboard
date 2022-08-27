import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { CategoryFragment, ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";

import CategoryForm, { FormProps } from "./CategoryForm";

interface CategoryDetailsPageProps {
  category: CategoryFragment;
  onSubmit: (data: FormProps) => Promise<void>;
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
  const [data, setData] = useState<FormProps>({
    name: category.name,
    slug: category.slug,
  });

  const handleChange = (e: ChangeEvent) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <Backlink href="/admin/categories">Voltar</Backlink>

      <PageHeader title={category?.name} />
      <CategoryForm errors={errors} onChange={handleChange} data={data} />
      <Savebar
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={() => navigate("/admin/categories")}
        loading={loading}
      />
    </>
  );
};
