import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  SessionInput,
  SessionUpdateMutation,
  useSessionDeleteMutation,
  useSessionDetailsQuery,
  useSessionUpdateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";

import { SessionDetailsPage } from "../components/SessionDetailsPage";

export const SessionDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const handleSuccess = (data: SessionUpdateMutation) => {
    if (!data?.sessionUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    }
  };

  const [updateSession, updateSessionResult] = useSessionUpdateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: SessionInput) => {
    await updateSession({
      variables: { id: id, input: { ...data } },
    });
  };

  const [deleteSession] = useSessionDeleteMutation({
    onCompleted: () => navigate("/sessions"),
  });

  const handleSessionDelete = async () => {
    await deleteSession({ variables: { id } });
  };

  const { data, loading } = useSessionDetailsQuery({ variables: { id: id } });

  if (loading) return <CircularLoading />;

  if (!data?.session) return <NotFound />;

  return (
    <>
      <SessionDetailsPage
        session={data.session}
        onSubmit={handleSubmit}
        errors={updateSessionResult.data?.sessionUpdate.errors || []}
        loading={updateSessionResult.loading}
        onDelete={openModal}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleSessionDelete}
        open={isOpen}
        title={t("session.delete")}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir a sessão <b>{data?.session?.name}</b>.
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default SessionDetails;
