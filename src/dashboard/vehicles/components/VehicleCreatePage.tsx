import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import ContactInfosForm from "@portal/components/ContactInfosForm";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SearchCategoriesQuery } from "@portal/graphql";
import { ChangeEvent, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import { FormProps, VehicleFormInfos, VehicleFormStatus } from "./VehicleForm";

interface VehicleCreatePageProps {
  onSubmit: (data: FormProps) => Promise<void>;
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
    email: "",
    phone: "",
    address: "",
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

  const categories = getChoices(categoryChoiceList);

  return (
    <>
      <Backlink href="/admin/vehicles">Voltar</Backlink>
      <PageHeader title="Criar novo veículo" />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <VehicleFormInfos
            errors={errors}
            onChange={handleChange}
            data={data}
            categories={categories}
          />
          <ContactInfosForm<FormProps>
            errors={errors}
            onChange={handleChange}
            data={data}
          />
        </Grid>
        <Grid item xs={4}>
          <VehicleFormStatus
            errors={errors}
            onChange={handleChange}
            data={data}
            categories={categories}
          />
        </Grid>
      </Grid>

      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/vehicles")}
        loading={loading}
      />
    </>
  );
};
