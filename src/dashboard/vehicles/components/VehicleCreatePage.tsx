import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SearchCategoriesQuery } from "@portal/graphql";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import VehicleForm, { FormProps } from "./VehicleForm";

interface VehicleCreatePageProps {
  onSubmit: any;
  errors: ErrorFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
}

export const VehicleCreatePage = ({
  onSubmit,
  errors,
  loading,
  categories: categoryChoiceList,
}: VehicleCreatePageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>({
    name: "",
    slug: "",
    documentNumber: "",
    category: "",
    isPublished: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  const categories = getChoices(categoryChoiceList);

  return (
    <>
      <Container>
        <Backlink href="/admin/vehicles">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title="Criar novo veículo" />
        <VehicleForm
          errors={errors}
          onChange={handleChange}
          data={data}
          categories={categories}
        />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/vehicles")}
        loading={loading}
      />
    </>
  );
};
