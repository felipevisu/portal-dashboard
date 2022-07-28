import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { CategoryFragment, ErrorFragment } from "@portal/graphql";

import CategoryForm from "./CategoryForm";

interface CategoryDetailsPageProps {
  category: CategoryFragment;
  onSubmit: any;
  onDelete: any;
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
  const [data, setData] = useState<CategoryFragment>(category);

  const handleChange = (e: React.ChangeEvent<any>) => {
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
      <Container>
        <Backlink href="/admin/categories">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title={category?.name} />
        <CategoryForm errors={errors} onChange={handleChange} data={data} />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={() => navigate("/admin/categories")}
        loading={loading}
      />
    </>
  );
};
