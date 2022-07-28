import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SessionInput } from "@portal/graphql";

import { FormProps, SessionForm } from "./SessionForm";

interface SessionCreatePageProps {
  onSubmit: (data: SessionInput) => Promise<void>;
  errors: ErrorFragment[];
  loading: boolean;
}

export const SessionCreatePage = ({
  onSubmit,
  errors,
  loading,
}: SessionCreatePageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>({
    name: "",
    slug: "",
    content: EditorState.createEmpty(),
    date: null,
    isPublished: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit({
      name: data.name,
      slug: data.slug,
      content: JSON.stringify(convertToRaw(data.content.getCurrentContent())),
      date: data.date,
    });
  };

  return (
    <>
      <Container>
        <Backlink href="/admin/sessions">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title="Criar nova sessão" />
        <SessionForm errors={errors} onChange={handleChange} data={data} />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/sessions")}
        loading={loading}
      />
    </>
  );
};
