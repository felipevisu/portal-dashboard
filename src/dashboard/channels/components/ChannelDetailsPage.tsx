import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { CategoryInput, ChannelFragment, ErrorFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";

import ChannelForm, { FormProps } from "./ChannelForm";

interface ChannelDetailsPageProps {
  channel: ChannelFragment;
  onSubmit: (data: CategoryInput) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
}

export const ChannelDetailsPage = ({
  channel,
  onSubmit,
  onDelete,
  errors,
  loading,
}: ChannelDetailsPageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { channelList } = useLinks();

  const initialData: FormProps = {
    name: channel.name,
    slug: channel.slug,
    isActive: channel.isActive,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={channelList()}>{t("back")}</Backlink>
            <PageHeader title={t("channel.create")} />
            <ChannelForm
              errors={errors}
              onChange={change}
              data={data}
              disabled={loading}
            />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(channelList())}
              onDelete={() => onDelete()}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
