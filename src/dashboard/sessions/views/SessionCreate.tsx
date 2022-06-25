import {
  SessionCreateMutation,
  useSessionCreateMutation,
} from "@portal/graphql";
import { convertToRaw } from "draft-js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SessionCreatePage } from "../components/SessionCreatePage";
import { FormProps } from "../components/SessionForm";

export const SessionCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: SessionCreateMutation) => {
    if (!data?.sessionCreate.errors.length) {
      navigate(`/admin/sessions/details/${data?.sessionCreate.session.id}`);
    }
  };

  const [createSession, createSessionResult] = useSessionCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
    await createSession({
      variables: {
        input: {
          name: data.name,
          slug: data.slug,
          content: JSON.stringify(
            convertToRaw(data.content.getCurrentContent())
          ),
          date: data.date?.toISOString() || null,
        },
      },
    });
  };

  return (
    <SessionCreatePage
      onSubmit={handleSubmit}
      errors={createSessionResult.data?.sessionCreate.errors || []}
      loading={createSessionResult.loading}
    />
  );
};

export default SessionCreate;
