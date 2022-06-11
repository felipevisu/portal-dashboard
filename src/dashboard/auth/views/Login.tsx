import React, { useState } from "react";
import { TextField, Typography, styled } from "@mui/material";
import { UserFragment, ErrorFragment } from "@portal/graphql";
import { Button } from "@portal/components/Button";
import { FormSpacer } from "@portal/components/FormSpacer";

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
  background: "red",
  borderRadius: 8,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5, 2.5),
}));

export const Login = () => {
  const [form, setForm] = useState<FieldsProps>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Array<ErrorFragment>>([]);

  const { login } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(errors.filter((error) => error.field !== e.target.name));
  };

  const handleSubmit = async () => {
    const result = await login(form.email, form.password);
    const errors = result?.errors || [];
    setErrors(errors);
  };

  return (
    <div>
      <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 2 }}>
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
        <Button
          sx={{ width: "100%" }}
          color="primary"
          onClick={handleSubmit}
          type="submit"
          data-test-id="submit"
        >
          Entrar
        </Button>
      </ButtonsContainer>
    </div>
  );
};

export default Login;
