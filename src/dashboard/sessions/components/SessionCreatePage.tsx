import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SessionInput } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";

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

      <PageHeader title="Criar nova sessão" />
      <SessionForm errors={errors} onChange={handleChange} data={data} />
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/sessions")}
        loading={loading}
      />
    </>
  );
};
