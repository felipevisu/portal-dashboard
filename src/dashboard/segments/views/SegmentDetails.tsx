import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  useSegmentDeleteMutation,
  useSegmentDetailsQuery,
  useSegmentUpdateMutation,
} from "@portal/graphql";
import useModal from "@portal/hooks/useModal";

import { SegmentDetailsPage } from "../components/SegmentDetailsPage";
import { FormProps } from "../components/SegmentForm";

export const SegmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading } = useSegmentDetailsQuery({
    variables: { id },
  });
  const [updateSegment, updateSegmentResult] = useSegmentUpdateMutation();
  const [deleteSegment] = useSegmentDeleteMutation({
    onCompleted: () => navigate("/admin/segments"),
  });

  const handleSegmentDelete = async () => {
    await deleteSegment({ variables: { id } });
  };

  const handleSubmit = async (data: FormProps) => {
    await updateSegment({
      variables: { id: id, input: { name: data.name, slug: data.slug } },
    });
  };

  if (loading) return <CircularLoading />;

  if (!data?.segment) return <NotFound />;

  return (
    <>
      <SegmentDetailsPage
        segment={data.segment}
        errors={updateSegmentResult.data?.segmentUpdate?.errors || []}
        onSubmit={handleSubmit}
        onDelete={openModal}
        loading={updateSegmentResult.loading}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleSegmentDelete}
        open={isOpen}
        title="Excluir categoria"
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir a categoria{" "}
          <b>{data?.segment?.name}</b>
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default SegmentDetails;
