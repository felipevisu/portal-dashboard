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
  VehicleDetailsQuery,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { Paginator, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import DocumentList from "./DocumentList";
import { FormProps, VehicleFormInfos, VehicleFormStatus } from "./VehicleForm";

interface VehicleDetailsPageProps {
  vehicle: VehicleDetailsQuery["vehicle"];
  onSubmit: (data: FormProps) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  paginator: Paginator;
}

export const VehicleDetailsPage = ({
  vehicle,
  onSubmit,
  onDelete,
  errors,
  loading,
  categories: categoryChoiceList,
  paginator,
}: VehicleDetailsPageProps) => {
  const navigate = useNavigate();
  const initialData: FormProps = {
    name: vehicle.name,
    slug: vehicle.slug,
    documentNumber: vehicle.documentNumber,
    category: vehicle.category.id,
    isPublished: vehicle.isPublished,
    email: vehicle.email,
    phone: vehicle.phone,
    address: vehicle.address,
  };

  const categories = getChoices(categoryChoiceList);

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/vehicles">Voltar</Backlink>
            <PageHeader title={vehicle.name} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <VehicleFormInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                />
                <DocumentList
                  documents={mapEdgesToItems(vehicle.documents)}
                  paginator={paginator}
                  pageInfo={vehicle.documents.pageInfo}
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
              onDelete={onDelete}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
