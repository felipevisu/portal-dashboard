import React from "react";
import { convertToRaw, EditorState } from "draft-js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, SessionInput } from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import { FormProps, SessionForm } from "./SessionForm";

interface SessionCreatePageProps {
  onSubmit: (data: SessionInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
}

export const SessionCreatePage = ({
  onSubmit,
  errors,
  loading,
}: SessionCreatePageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const initialData: FormProps = {
    name: "",
    slug: "",
    content: EditorState.createEmpty(),
    date: null,
    isPublished: false,
  };

  const handleSubmit = (data: FormProps) => {
    onSubmit({
      name: data.name,
      slug: data.slug,
      content: JSON.stringify(convertToRaw(data.content.getCurrentContent())),
      date: data.date,
      isPublished: data.isPublished,
    });
  };

  return (
    <Form initial={initialData} onSubmit={handleSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/sessions">{t("back")}</Backlink>
            <PageHeader title={t("session.create")} />
            <SessionForm errors={errors} onChange={change} data={data} />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/sessions")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
