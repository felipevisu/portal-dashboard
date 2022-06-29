import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment } from "@portal/graphql";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryForm, { FormProps } from "./CategoryForm";

interface CategoryCreatePageProps {
  onSubmit: (data: FormProps) => Promise<void>;
  errors: ErrorFragment[];
  loading: boolean;
}

export const CategoryCreatePage = ({
  onSubmit,
  errors,
  loading,
}: CategoryCreatePageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<{ name: string; slug: string }>({
    name: "",
    slug: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <>
      <Container>
        <Backlink href="/admin/categories">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title="Criar nova categoria" />
        <CategoryForm errors={errors} onChange={handleChange} data={data} />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/categories")}
        loading={loading}
      />
    </>
  );
};
