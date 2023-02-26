import React, { useState } from "react";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import { FormSpacer } from "@portal/components/FormSpacer";
import { ErrorFragment, UserFragment } from "@portal/graphql";

import { useUser } from "..";

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

const ButtonsContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
}));

const Panel = styled("div")(({ theme }) => ({
  "& span": {
    color: theme.palette.error.contrastText,
  },
  ...theme.typography.body1,
  background: "#ffd6d9",
  borderRadius: 4,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5, 2.5),
}));

export const Login = () => {
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
            Login
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
            label="Email"
            onChange={handleChange}
          />
          <FormSpacer />
          <TextField
            fullWidth
            autoComplete="password"
            type="password"
            name="password"
            label="Senha"
            onChange={handleChange}
          />
          <FormSpacer />
          <ButtonsContainer>
            <LoadingButton
              loading={loading}
              sx={{ width: "100%" }}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              type="submit"
              data-test-id="submit"
            >
              Entrar
            </LoadingButton>
          </ButtonsContainer>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
