import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  EntryTypeCreateMutation,
  EntryTypeInput,
  useEntryTypeCreateMutation,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import { EntryTypeCreatePage } from "../components/EntryTypeCreatePage";
import useAppMenu from "@portal/components/AppLayout/AppMenuContext";

export const EntryTypeCreate = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const { entryTypeDetails } = useLinks();
  const { refetch: refetchMenu } = useAppMenu();

  const handleCreateEntryType = (data: EntryTypeCreateMutation) => {
    if (!data?.entryTypeCreate.errors.length) {
      refetchMenu();
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigator(entryTypeDetails(data?.entryTypeCreate.entryType.id));
    }
  };

  const [createEntryType, createEntryTypeResult] = useEntryTypeCreateMutation({
    onCompleted: handleCreateEntryType,
  });

  const handleSubmit = async (data: EntryTypeInput) => {
    await createEntryType({
      variables: { input: { ...data } },
    });
  };

  return (
    <EntryTypeCreatePage
      onSubmit={handleSubmit}
      errors={createEntryTypeResult.data?.entryTypeCreate.errors || []}
      loading={createEntryTypeResult.loading}
    />
  );
};

export default EntryTypeCreate;
