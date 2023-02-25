import React from "react";
import { useNavigate } from "react-router-dom";

import {
  SessionCreateMutation,
  SessionInput,
  useSessionCreateMutation,
} from "@portal/graphql";

import { SessionCreatePage } from "../components/SessionCreatePage";

export const SessionCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: SessionCreateMutation) => {
    if (!data?.sessionCreate.errors.length) {
      navigate(`/sessions/details/${data?.sessionCreate.session.id}`);
    }
  };

  const [createSession, createSessionResult] = useSessionCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: SessionInput) => {
    await createSession({
      variables: { input: { ...data } },
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
