import React, { useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SessionDetailsFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";

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
  onSubmit: (data) => Promise<void>;
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

  const handleChange = (e: ChangeEvent) => {
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
      isPublished: data.isPublished,
    });
  };

  return (
    <>
      <Backlink href="/admin/sessions">Voltar</Backlink>

      <PageHeader title={session.name} />
      <SessionForm errors={errors} onChange={handleChange} data={data} />
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/sessions")}
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};
