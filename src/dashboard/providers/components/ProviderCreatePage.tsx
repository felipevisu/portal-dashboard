import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SearchSegmentsQuery } from "@portal/graphql";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import ProviderForm, { FormProps } from "./ProviderForm";

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
      <Container>
        <Backlink href="/admin/providers">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title="Criar novo prestador" />
        <ProviderForm
          errors={errors}
          onChange={handleChange}
          data={data}
          segments={segments}
        />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/providers")}
        loading={loading}
      />
    </>
  );
};
