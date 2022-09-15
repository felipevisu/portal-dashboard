import React from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SegmentInput } from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import SegmentForm, { FormProps } from "./SegmentForm";

interface SegmentCreatePageProps {
  onSubmit: (data: SegmentInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
}

export const SegmentCreatePage = ({
  onSubmit,
  errors,
  loading,
}: SegmentCreatePageProps) => {
  const navigate = useNavigate();

  const initialData: FormProps = {
    name: "",
    slug: "",
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/segments">Voltar</Backlink>
            <PageHeader title="Criar novo segmento" />
            <SegmentForm errors={errors} onChange={change} data={data} />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/admin/segments")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
