import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  ProviderDetailsFragment,
  SearchSegmentsQuery,
} from "@portal/graphql";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import DocumentList from "./DocumentList";
import ProviderForm, { FormProps } from "./ProviderForm";

const sanitizeProvider = (provider: ProviderDetailsFragment) => {
  return {
    name: provider.name,
    slug: provider.slug,
    documentNumber: provider.documentNumber,
    segment: provider.segment.id,
    isPublished: provider.isPublished,
  };
};

interface ProviderDetailsPageProps {
  provider: ProviderDetailsFragment;
  onSubmit: (data: FormProps) => Promise<void>;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  segments: RelayToFlat<SearchSegmentsQuery["search"]>;
}

export const ProviderDetailsPage = ({
  provider,
  onSubmit,
  onDelete,
  errors,
  loading,
  segments: segmentChoiceList,
}: ProviderDetailsPageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>(sanitizeProvider(provider));

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
      <Container>
        <Backlink href="/admin/providers">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title={provider.name} />
        <ProviderForm
          errors={errors}
          onChange={handleChange}
          data={data}
          segments={segments}
        />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <DocumentList documents={mapEdgesToItems(provider.documents)} />
          </Grid>
        </Grid>
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/providers")}
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};