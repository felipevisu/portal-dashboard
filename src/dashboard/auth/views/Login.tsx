import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import { UserFragment, ErrorFragment } from "@portal/graphql";
import { Button } from "@portal/components/Button";
import { FormSpacer } from "@portal/components/FormSpacer";

import { useUser } from "..";
import useStyles from "./styles";

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

export const Login = () => {
  const classes = useStyles();

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
      <Typography variant="h3" className={classes.header}>
        Login
      </Typography>
      {errors.map((error, key) => (
        <div className={classes.panel} key={key}>
          {error.message}
        </div>
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
      <div className={classes.buttonContainer}>
        <Button
          className={classes.loginButton}
          variant="primary"
          onClick={handleSubmit}
          type="submit"
          data-test-id="submit"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
};

export default Login;
