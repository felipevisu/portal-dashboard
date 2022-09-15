import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import ContactInfosForm from "@portal/components/ContactInfosForm";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  SearchCategoriesQuery,
  VehicleInput,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import { FormProps, VehicleFormInfos, VehicleFormStatus } from "./VehicleForm";

interface VehicleCreatePageProps {
  onSubmit: (data: VehicleInput) => SubmitPromise;
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
  const initialData: FormProps = {
    name: "",
    slug: "",
    documentNumber: "",
    category: "",
    isPublished: false,
    email: "",
    phone: "",
    address: "",
  };

  const categories = getChoices(categoryChoiceList);

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/vehicles">Voltar</Backlink>
            <PageHeader title="Criar novo veículo" />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <VehicleFormInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                />
                <ContactInfosForm<FormProps>
                  errors={errors}
                  onChange={change}
                  data={data}
                />
              </Grid>
              <Grid item xs={4}>
                <VehicleFormStatus
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/admin/vehicles")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
