import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  SessionUpdateMutation,
  useSessionDeleteMutation,
  useSessionDetailsQuery,
  useSessionUpdateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";
import { convertToRaw } from "draft-js";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SessionDetailsPage } from "../components/SessionDetailsPage";
import { FormProps } from "../components/SessionForm";

export const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const handleSuccess = (data: SessionUpdateMutation) => {
    if (!data?.sessionUpdate.errors.length) {
      navigate(`/admin/sessions/details/${data?.sessionUpdate.session.id}`);
    }
  };

  const [updateSession, updateSessionResult] = useSessionUpdateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
    await updateSession({
      variables: {
        id: id,
        input: {
          name: data.name,
          slug: data.slug,
          content: JSON.stringify(
            convertToRaw(data.content.getCurrentContent())
          ),
          date: data.date,
        },
      },
    });
  };

  const [deleteSession] = useSessionDeleteMutation({
    onCompleted: () => navigate("/admin/sessions"),
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
        title="Excluir veículo"
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir a sessão <b>{data?.session?.name}</b>
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default SessionDetails;
