import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SessionDetailsFragment } from "@portal/graphql";
import { convertFromRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionForm, { FormProps } from "./SessionForm";

const sanitizeSession = (session: SessionDetailsFragment) => {
  return {
    name: session.name,
    slug: session.slug,
    content: EditorState.createWithContent(
      convertFromRaw(JSON.parse(session.content))
    ),
    date: session.date,
    isPublished: session.isPublished,
  };
};

interface SessionDetailsPageProps {
  session: SessionDetailsFragment;
  onSubmit: any;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
}

export const SessionDetailsPage = ({
  session,
  onSubmit,
  onDelete,
  errors,
  loading,
}: SessionDetailsPageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>(sanitizeSession(session));

  const handleChange = ({ name, value }) => {
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
        <PageHeader title={session.name} />
        <SessionForm errors={errors} onChange={handleChange} data={data} />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/sessions")}
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};
