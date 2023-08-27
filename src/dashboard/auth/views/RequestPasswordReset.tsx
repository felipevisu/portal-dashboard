import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FormSpacer } from "@portal/components/FormSpacer";
import {
  ErrorFragment,
  RequestPasswordResetMutation,
  useRequestPasswordResetMutation,
} from "@portal/graphql";

import { Panel } from "./styles";

export interface FieldsProps {
  email: string | undefined;
}

export interface ResponseProps {
  requestPasswordReset: {
    errors: Array<ErrorFragment>;
  };
}

export const RequestPasswordReset = ({ action }: { action: () => void }) => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FieldsProps>({
    email: "",
  });
  const [errors, setErrors] = useState<Array<ErrorFragment>>([]);

  const handleRequestPassword = (data: RequestPasswordResetMutation) => {
    if (!data?.requestPasswordReset.errors.length) {
      setSuccess(true);
    } else {
      setErrors(data?.requestPasswordReset.errors);
    }
  };

  const [request, requestResult] = useRequestPasswordResetMutation({
    onCompleted: handleRequestPassword,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(errors.filter((error) => error.field !== e.target.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request({
      variables: {
        email: form.email,
        redirectUrl: import.meta.env.VITE_PASSWORD_RESET_URL,
      },
    });
  };

  return (
    <Card>
      <CardContent sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 3 }}>
          {t("account.request.title")}
        </Typography>
        {success ? (
          <Typography sx={{ marginBottom: 3 }}>
            {t("account.request.message.success")}
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            {errors.map((error, key) => (
              <Panel key={key}>{error.message}</Panel>
            ))}
            <TextField
              autoFocus
              fullWidth
              autoComplete="username"
              type="text"
              name="email"
              label={t("account.request.fields.email")}
              onChange={handleChange}
            />
            <FormSpacer />
            <LoadingButton
              loading={requestResult.loading}
              sx={{ width: "100%" }}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              type="submit"
              data-test-id="submit"
            >
              {t("account.request.submit")}
            </LoadingButton>
          </form>
        )}
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Link href="#" onClick={action}>
            {t("account.request.return")}
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequestPasswordReset;
