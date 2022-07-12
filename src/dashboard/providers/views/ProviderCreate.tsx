import React from "react";
import { useNavigate } from "react-router-dom";

import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  ProviderCreateMutation,
  useProviderCreateMutation,
} from "@portal/graphql";
import useSegmentSearch from "@portal/searches/useSegmentSearch";
import { mapEdgesToItems } from "@portal/utils/maps";

import { ProviderCreatePage } from "../components/ProviderCreatePage";
import { FormProps } from "../components/ProviderForm";

export const ProviderCreate = () => {
  const navigator = useNavigate();

  const handleSuccess = (data: ProviderCreateMutation) => {
    if (!data?.providerCreate.errors.length) {
      navigator(`/admin/providers/details/${data?.providerCreate.provider.id}`);
    }
  };

  const [createProvider, createProviderResult] = useProviderCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
    await createProvider({ variables: { input: { ...data } } });
  };

  const {
    loadMore: loadMoreSegments,
    search: searchSegment,
    result: searchSegmentOpts,
  } = useSegmentSearch({ variables: DEFAULT_INITIAL_SEARCH_DATA });

  return (
    <ProviderCreatePage
      onSubmit={handleSubmit}
      errors={createProviderResult.data?.providerCreate.errors || []}
      loading={createProviderResult.loading}
      segments={mapEdgesToItems(searchSegmentOpts?.data?.search) || []}
    />
  );
};

export default ProviderCreate;
