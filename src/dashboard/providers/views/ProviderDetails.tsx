import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  ProviderUpdateMutation,
  useProviderUpdateMutation,
  useProviderDetailsQuery,
  useProviderDeleteMutation,
} from "@portal/graphql";
import useSegmentSearch from "@portal/searches/useSegmentSearch";
import { mapEdgesToItems } from "@portal/utils/maps";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProviderDetailsPage } from "../components/ProviderDetailsPage";
import { FormProps } from "../components/ProviderForm";
import useModal from "@portal/hooks/useModal";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";

export const ProviderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const handleSuccess = (data: ProviderUpdateMutation) => {
    if (!data?.providerUpdate.errors.length) {
      navigate(`/admin/providers/details/${data?.providerUpdate.provider.id}`);
    }
  };

  const [updateProvider, updateProviderResult] = useProviderUpdateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
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

  const { data, loading } = useProviderDetailsQuery({ variables: { id: id } });

  if (loading) return <CircularLoading />;

  if (!data?.provider) return <NotFound />;

  return (
    <>
      <ProviderDetailsPage
        provider={data.provider}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateProviderResult.data?.providerUpdate.errors || []}
        loading={updateProviderResult.loading}
        segments={mapEdgesToItems(searchSegmentOpts?.data?.search) || []}
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
