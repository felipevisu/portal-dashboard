import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ChannelCreateMutation,
  ChannelInput,
  useChannelCreateMutation,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import ChannelCreatePage from "../components/ChannelCreatePage";

export const ChannelCreate = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const { channelDetails } = useLinks();

  const handleCreateChannel = (data: ChannelCreateMutation) => {
    if (!data?.channelCreate.errors.length) {
      toast(t("messages.create.success"));
      navigator(channelDetails(data?.channelCreate.channel.id));
    }
  };

  const [createChannel, createChannelResult] = useChannelCreateMutation({
    onCompleted: handleCreateChannel,
  });

  const handleSubmit = async (data: ChannelInput) => {
    await createChannel({ variables: { input: { ...data } } });
  };

  return (
    <ChannelCreatePage
      onSubmit={handleSubmit}
      errors={createChannelResult.data?.channelCreate.errors || []}
      loading={createChannelResult.loading}
    />
  );
};

export default ChannelCreate;
