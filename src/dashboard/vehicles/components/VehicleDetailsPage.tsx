import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import DocumentList from "@portal/dashboard/documents/components/DocumentList";
import {
  ErrorFragment,
  SearchCategoriesQuery,
  VehicleDetailsFragment,
  VehicleDetailsQuery,
} from "@portal/graphql";
import { Paginator, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import { FormProps, VehicleFormInfos, VehicleFormStatus } from "./VehicleForm";

const sanitizeVehicle = (vehicle: VehicleDetailsFragment) => {
  return {
    name: vehicle.name,
    slug: vehicle.slug,
    documentNumber: vehicle.documentNumber,
    category: vehicle.category.id,
    isPublished: vehicle.isPublished,
  };
};

interface VehicleDetailsPageProps {
  vehicle: VehicleDetailsQuery["vehicle"];
  onSubmit: (data: FormProps) => Promise<void>;
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
  const [data, setData] = useState<FormProps>(sanitizeVehicle(vehicle));

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  console.log(vehicle);

  const categories = getChoices(categoryChoiceList);

  return (
    <>
      <Backlink href="/admin/vehicles">Voltar</Backlink>
      <PageHeader title={vehicle.name} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <VehicleFormInfos
            errors={errors}
            onChange={handleChange}
            data={data}
            categories={categories}
          />
          <DocumentList
            documents={mapEdgesToItems(vehicle.documents)}
            paginator={paginator}
            pageInfo={vehicle.documents.pageInfo}
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
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};
