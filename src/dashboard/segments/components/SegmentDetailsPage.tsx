import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SegmentFragment } from "@portal/graphql";

import SegmentForm, { FormProps } from "./SegmentForm";

interface SegmentDetailsPageProps {
  segment: SegmentFragment;
  onSubmit: (data: FormProps) => Promise<void>;
  onDelete: () => void;
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
  const [data, setData] = useState<FormProps>({
    name: segment.name,
    slug: segment.slug,
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

  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <Backlink href="/admin/segments">Voltar</Backlink>

      <PageHeader title={segment?.name} />
      <SegmentForm errors={errors} onChange={handleChange} data={data} />
      <Savebar
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={() => navigate("/admin/segments")}
        loading={loading}
      />
    </>
  );
};
