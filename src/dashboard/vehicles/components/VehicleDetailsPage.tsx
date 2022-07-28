import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  SearchCategoriesQuery,
  VehicleDetailsFragment,
} from "@portal/graphql";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import VehicleForm, { FormProps } from "./VehicleForm";

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
  vehicle: VehicleDetailsFragment;
  onSubmit: (data: FormProps) => Promise<void>;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
}

export const VehicleDetailsPage = ({
  vehicle,
  onSubmit,
  onDelete,
  errors,
  loading,
  categories: categoryChoiceList,
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

  const categories = getChoices(categoryChoiceList);

  return (
    <>
      <Container>
        <Backlink href="/admin/vehicles">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title={vehicle.name} />
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
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};
