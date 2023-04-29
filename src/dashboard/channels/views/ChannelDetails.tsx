import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  ChannelInput,
  ChannelUpdateMutation,
  useChannelDeleteMutation,
  useChannelDetailsQuery,
  useChannelUpdateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";

import { ChannelDetailsPage } from "../components/ChannelDetailsPage";

export const ChannelDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading } = useChannelDetailsQuery({
    variables: { id },
  });

  const handleUpdateChannel = (data: ChannelUpdateMutation) => {
    if (data.channelUpdate.errors.length === 0)
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
  };

  const [updateChannel, updateChannelResult] = useChannelUpdateMutation({
    onCompleted: handleUpdateChannel,
  });

  const [deleteChannel] = useChannelDeleteMutation({
    onCompleted: () => navigate("/categories"),
  });

  const handleChannelDelete = async () => {
    await deleteChannel({ variables: { id } });
  };

  const handleSubmit = async (data: ChannelInput) => {
    await updateChannel({
      variables: { id: id, input: { ...data } },
    });
  };

  if (loading) return <CircularLoading />;

  if (!data?.channel) return <NotFound />;

  return (
    <>
      <ChannelDetailsPage
        channel={data.channel}
        errors={updateChannelResult.data?.channelUpdate?.errors || []}
        onSubmit={handleSubmit}
        onDelete={openModal}
        loading={updateChannelResult.loading}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleChannelDelete}
        open={isOpen}
        title={t("channel.deleteDialog.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("channel.deleteDialog.description", {
            name: data.channel.name,
          })}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
