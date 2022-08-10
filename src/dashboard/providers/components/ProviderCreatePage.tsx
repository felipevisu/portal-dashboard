import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SearchSegmentsQuery } from "@portal/graphql";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import {
  FormProps,
  ProviderFormInfos,
  ProviderFormStatus,
} from "./ProviderForm";

interface ProviderCreatePageProps {
  onSubmit: (data: FormProps) => Promise<void>;
  errors: ErrorFragment[];
  loading: boolean;
  segments: RelayToFlat<SearchSegmentsQuery["search"]>;
}

export const ProviderCreatePage = ({
  onSubmit,
  errors,
  loading,
  segments: segmentChoiceList,
}: ProviderCreatePageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>({
    name: "",
    slug: "",
    documentNumber: "",
    segment: "",
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

  const segments = getChoices(segmentChoiceList);

  return (
    <>
      <Backlink href="/admin/providers">Voltar</Backlink>
      <PageHeader title="Criar novo prestador" />
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: (theme) => theme.spacing(2) }}
      >
        <Grid item xs={8}>
          <ProviderFormInfos
            errors={errors}
            onChange={handleChange}
            data={data}
            segments={segments}
          />
        </Grid>
        <Grid item xs={4}>
          <ProviderFormStatus
            errors={errors}
            onChange={handleChange}
            data={data}
            segments={segments}
          />
        </Grid>
      </Grid>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/providers")}
        loading={loading}
      />
    </>
  );
};
