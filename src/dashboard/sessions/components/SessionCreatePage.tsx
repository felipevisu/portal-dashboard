import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment } from "@portal/graphql";
import { EditorState } from "draft-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProps, SessionForm } from "./SessionForm";

interface SessionCreatePageProps {
  onSubmit: any;
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
    time: null,
    isPublished: false,
  });

  const handleChange = ({ name, value }) => {
    console.log(name, value);
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
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
