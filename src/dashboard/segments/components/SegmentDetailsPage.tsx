import React from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SegmentFragment, SegmentInput } from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import SegmentForm, { FormProps } from "./SegmentForm";

interface SegmentDetailsPageProps {
  segment: SegmentFragment;
  onSubmit: (data: SegmentInput) => SubmitPromise;
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

  const handleDelete = () => {
    onDelete();
  };

  const initialData: FormProps = {
    name: segment.name,
    slug: segment.slug,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/segments">Voltar</Backlink>
            <PageHeader title={segment?.name} />
            <SegmentForm errors={errors} onChange={change} data={data} />
            <Savebar
              onSubmit={submit}
              onDelete={handleDelete}
              onCancel={() => navigate("/admin/segments")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
