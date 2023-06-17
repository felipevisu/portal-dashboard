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
import { ErrorFragment, UserFragment } from "@portal/graphql";

import { useUser } from "..";

import { Panel } from "./styles";

export interface FieldsProps {
  email: string | undefined;
  password: string | undefined;
}

export interface ResponseProps {
  tokenAuth: {
    errors: Array<ErrorFragment>;
    token: string | undefined;
    user: UserFragment | undefined;
  };
}

export const Login = ({ action }: { action: () => void }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FieldsProps>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Array<ErrorFragment>>([]);

  const { login, loading } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(errors.filter((error) => error.field !== e.target.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    const errors = result?.errors || [];
    setErrors(errors);
  };

  return (
    <Card>
      <CardContent sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 3 }}>
            {t("account.login.title")}
          </Typography>
          {errors.map((error, key) => (
            <Panel key={key}>{error.message}</Panel>
          ))}
          <TextField
            autoFocus
            fullWidth
            autoComplete="username"
            type="text"
            name="email"
            label={t("account.login.fields.email")}
            onChange={handleChange}
          />
          <FormSpacer />
          <TextField
            fullWidth
            autoComplete="password"
            type="password"
            name="password"
            label={t("account.login.fields.password")}
            onChange={handleChange}
          />
          <FormSpacer />
          <LoadingButton
            loading={loading}
            sx={{ width: "100%" }}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            data-test-id="submit"
          >
            {t("account.login.submit")}
          </LoadingButton>
        </form>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Link href="#" onClick={action}>
            {t("account.login.forgot")}
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
