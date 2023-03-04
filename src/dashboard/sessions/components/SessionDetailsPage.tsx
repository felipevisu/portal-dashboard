import React from "react";
import dayjs from "dayjs";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  SessionDetailsFragment,
  SessionInput,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import SessionForm from "./SessionForm";

interface SessionDetailsPageProps {
  session: SessionDetailsFragment;
  onSubmit: (data: SessionInput) => SubmitPromise;
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialData = {
    name: session.name,
    slug: session.slug,
    content: EditorState.createWithContent(
      convertFromRaw(JSON.parse(session.content))
    ),
    date: dayjs(session.date),
    isPublished: session.isPublished,
  };

  const handleSubmit = (data) => {
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
            <PageHeader title={session.name} />
            <SessionForm errors={errors} onChange={change} data={data} />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/sessions")}
              onDelete={onDelete}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
