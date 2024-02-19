import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import {
  ErrorFragment,
  PasswordResetMutation,
  usePasswordResetMutation,
} from "@portal/graphql";

import Layout from "../components/Layout";

import { Panel } from "./styles";

export const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState<Array<ErrorFragment>>([]);

  const handleRequestPassword = (data: PasswordResetMutation) => {
    if (!data?.passwordReset.errors.length) {
      setSuccess(true);
    } else {
      setErrors(data?.passwordReset.errors);
    }
  };

  const [request, requestResult] = usePasswordResetMutation({
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
        email: searchParams.get("email"),
        token: searchParams.get("token"),
        password: form.password,
      },
    });
  };

  const isButtonDisabled = useMemo(() => {
    return (
      (!form.password && !form.password2) || form.password !== form.password2
    );
  }, [form]);

  return (
    <Layout>
      <Card>
        <CardContent sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 3 }}>
            {t("account.reset.title")}
          </Typography>
          {success ? (
            <Typography sx={{ marginBottom: 3 }}>
              {t("account.reset.message.success")}
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              {errors.map((error, key) => (
                <Panel key={key}>{error.message}</Panel>
              ))}
              <TextField
                autoFocus
                fullWidth
                type="password"
                name="password"
                label={t("account.reset.fields.password")}
                onChange={handleChange}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                type="password"
                name="password2"
                label={t("account.reset.fields.password2")}
                onChange={handleChange}
              />
              <FormSpacer />
              <LoadingButton
                disabled={isButtonDisabled}
                loading={requestResult.loading}
                sx={{ width: "100%" }}
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                type="submit"
                data-test-id="submit"
              >
                {t("account.reset.submit")}
              </LoadingButton>
            </form>
          )}
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Link href="/admin">{t("account.reset.return")}</Link>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PasswordReset;
