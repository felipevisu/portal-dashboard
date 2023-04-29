import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ChannelInput, ErrorFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";

import ChannelForm from "./ChannelForm";

interface ChannelCreatePageProps {
  onSubmit: (data: ChannelInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
}

export const ChannelCreatePage = ({
  onSubmit,
  errors,
  loading,
}: ChannelCreatePageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { channelList } = useLinks();

  const initialData = {
    name: "",
    slug: "",
    isActive: false,
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
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default ChannelCreatePage;
