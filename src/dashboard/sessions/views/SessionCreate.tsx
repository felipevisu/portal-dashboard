import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  SessionCreateMutation,
  SessionInput,
  useSessionCreateMutation,
} from "@portal/graphql";

import { SessionCreatePage } from "../components/SessionCreatePage";

export const SessionCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSuccess = (data: SessionCreateMutation) => {
    if (!data?.sessionCreate.errors.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
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
