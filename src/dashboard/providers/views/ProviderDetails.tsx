import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  ProviderInput,
  ProviderUpdateMutation,
  useProviderDeleteMutation,
  useProviderDetailsQuery,
  useProviderUpdateMutation,
} from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useSegmentSearch from "@portal/searches/useSegmentSearch";
import { mapEdgesToItems } from "@portal/utils/maps";

import { ProviderDetailsPage } from "../components/ProviderDetailsPage";

export const ProviderDetails = () => {
  const [provider, setProvider] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const paginator = usePaginator();

  const [updateProvider, updateProviderResult] = useProviderUpdateMutation();

  const handleSubmit = async (data: ProviderInput) => {
    await updateProvider({ variables: { id: id, input: { ...data } } });
  };

  const [deleteProvider] = useProviderDeleteMutation({
    onCompleted: () => navigate("/admin/providers"),
  });

  const handleProviderDelete = async () => {
    await deleteProvider({ variables: { id } });
  };

  const { result: searchSegmentOpts } = useSegmentSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const { data, loading, refetch } = useProviderDetailsQuery({
    variables: { id: id, after: paginator.after },
  });

  useEffect(() => {
    if (data?.provider) {
      setProvider(data.provider);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (loading && !provider) return <CircularLoading />;

  if (!provider) return <NotFound />;

  return (
    <>
      <ProviderDetailsPage
        provider={provider}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateProviderResult.data?.providerUpdate.errors || []}
        loading={updateProviderResult.loading}
        segments={mapEdgesToItems(searchSegmentOpts?.data?.search) || []}
        paginator={paginator}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleProviderDelete}
        open={isOpen}
        title="Excluir veículo"
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir o veículo <b>{data?.provider?.name}</b>
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default ProviderDetails;
