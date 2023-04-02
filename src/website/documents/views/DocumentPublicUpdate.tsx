import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import CircularLoading from "@portal/components/Circular";
import { useValidateTokenMutation } from "@portal/graphql";

import DocumentPublicUpdatePage from "../components/DocumentPublicUpdatePage";

export const DocumentPublicUpdate = () => {
  const { token } = useParams();

  const [validateToken, validateTokenResult] = useValidateTokenMutation();

  const handleValidation = async () => {
    await validateToken({ variables: { token } });
  };

  useEffect(() => {
    handleValidation();
  }, [token]);

  if (!validateTokenResult.called || validateTokenResult.loading) {
    return <CircularLoading />;
  }

  if (
    validateTokenResult.called &&
    !validateTokenResult.data?.validateToken?.document
  ) {
    return <>Token expirado</>;
  }

  return <DocumentPublicUpdatePage />;
};

export default DocumentPublicUpdate;
