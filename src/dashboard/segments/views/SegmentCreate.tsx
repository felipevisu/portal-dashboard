import React from "react";
import { useNavigate } from "react-router-dom";

import {
  SegmentCreateMutation,
  useSegmentCreateMutation,
} from "@portal/graphql";

import { SegmentCreatePage } from "../components/SegmentCreatePage";
import { FormProps } from "../components/SegmentForm";

export const SegmentCreate = () => {
  const navigator = useNavigate();

  const handleSuccess = (data: SegmentCreateMutation) => {
    if (!data?.segmentCreate.errors.length) {
      navigator(`/admin/segments/details/${data?.segmentCreate.segment.id}`);
    }
  };

  const [createSegment, createSegmentResult] = useSegmentCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: FormProps) => {
    await createSegment({ variables: { input: { ...data } } });
  };

  return (
    <SegmentCreatePage
      onSubmit={handleSubmit}
      errors={createSegmentResult.data?.segmentCreate.errors || []}
      loading={createSegmentResult.loading}
    />
  );
};

export default SegmentCreate;
