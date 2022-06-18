import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { SegmentFragment, ErrorFragment } from "@portal/graphql";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SegmentForm from "./SegmentForm";

interface SegmentDetailsPageProps {
  segment: SegmentFragment;
  onSubmit: any;
  onDelete: any;
  errors: ErrorFragment[];
  loading: boolean;
}

export const SegmentDetailsPage = ({
  segment,
  onSubmit,
  onDelete,
  errors,
  loading,
}: SegmentDetailsPageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<SegmentFragment>(segment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <Container>
        <Backlink href="/admin/segments">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title={segment?.name} />
        <SegmentForm errors={errors} onChange={handleChange} data={data} />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={() => navigate("/admin/segments")}
        loading={loading}
      />
    </>
  );
};
