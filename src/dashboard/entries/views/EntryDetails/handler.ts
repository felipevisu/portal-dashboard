import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  EntryChannelListingErrorFragment,
  EntryDetailsFragment,
  EntryErrorWithAttributesFragment,
  useEntryChannelListingUpdateMutation,
  useEntryUpdateMutation,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import { EntryUpdateData } from "../../components/EntryDetailsPage/form";

import {
  getEntryChannelsUpdateVariables,
  getEntryUpdateVariables,
} from "./utils";

type UseEntryUpdateHandler = (data: EntryUpdateData) => SubmitPromise;

interface UseEntryUpdateHandlerOpts {
  called: boolean;
  loading: boolean;
  errors: EntryErrorWithAttributesFragment[];
  channelsErrors: EntryChannelListingErrorFragment[];
}

export const useEntryUpdateHandler = (
  entry: EntryDetailsFragment,
  callback: () => void
): [UseEntryUpdateHandler, UseEntryUpdateHandlerOpts] => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);

  const [updateEntry, updateEntryResult] = useEntryUpdateMutation();

  const [updateChannels, updateChannelsResult] =
    useEntryChannelListingUpdateMutation();

  const sendMutations = async (data: EntryUpdateData) => {
    let errors = [];

    const result = await updateEntry({
      variables: getEntryUpdateVariables(entry, data),
    });
    errors = [...errors, ...result.data.entryUpdate.errors];

    const entryChannelsUpdateResult = await updateChannels({
      variables: getEntryChannelsUpdateVariables(entry, data),
    });

    errors = [
      ...errors,
      ...entryChannelsUpdateResult.data.entryChannelListingUpdate.errors,
    ];

    return errors;
  };

  const submit = async (data: EntryUpdateData) => {
    setCalled(true);
    setLoading(true);
    const errors = await sendMutations(data);

    setLoading(false);

    if (errors.length === 0) {
      if (callback) callback();
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    }

    return errors;
  };

  const errors = updateEntryResult.data?.entryUpdate.errors ?? [];

  const channelsErrors =
    updateChannelsResult?.data?.entryChannelListingUpdate?.errors ?? [];

  return [
    submit,
    {
      called,
      loading,
      channelsErrors,
      errors,
    },
  ];
};
