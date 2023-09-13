import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { ChannelFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import { ChannelList } from "./ChannelList";

interface ChannelListPageProps {
  channels: ChannelFragment[];
  loading: boolean;
}

export const ChannelListPage = ({
  channels,
  loading,
}: ChannelListPageProps) => {
  const { t } = useTranslation();
  const { channelCreate } = useLinks();

  return (
    <>
      <PageHeader title={t("channel.plural")}>
        <Button color="primary" variant="contained" href={channelCreate()}>
          {t("channel.create")}
        </Button>
      </PageHeader>
      <Card>
        <ChannelList channels={channels} loading={loading} />
      </Card>
    </>
  );
};

export default ChannelListPage;
