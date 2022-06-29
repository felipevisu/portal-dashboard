import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment } from "@portal/graphql";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SegmentForm, { FormProps } from "./SegmentForm";

interface SegmentCreatePageProps {
  onSubmit: (data: FormProps) => Promise<void>;
  errors: ErrorFragment[];
  loading: boolean;
}

export const SegmentCreatePage = ({
  onSubmit,
  errors,
  loading,
}: SegmentCreatePageProps) => {
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
        <Backlink href="/admin/segments">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title="Criar novo segmento" />
        <SegmentForm errors={errors} onChange={handleChange} data={data} />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/segments")}
        loading={loading}
      />
    </>
  );
};
