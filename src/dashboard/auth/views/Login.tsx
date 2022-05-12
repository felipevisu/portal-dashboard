import React, { useState } from "react";
import { Container, Input } from "@portal/UI";
import { UserFragment, ErrorFragment } from "@portal/graphql";
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
    <Container className="max-w-screen-sm">
      <div className="">
        <div>
          {errors
            .filter((error) => error.field === null)
            .map((error, key) => (
              <div key={key}>{error.message}</div>
            ))}
        </div>
        <div>
          <Input
            type="text"
            name="email"
            label="Email"
            error={errors.find((error) => error.field === "name")}
            extraInputClasses="mb-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.find((error) => error.field === "password")}
            extraInputClasses="mb-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={() => handleSubmit()}>Enviar</button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
