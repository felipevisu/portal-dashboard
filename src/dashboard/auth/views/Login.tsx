import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Container, Input } from "@portal/UI";
import { getToken, setToken } from "@portal/lib/auth";
import { UserFragment, ErrorFragment } from "@portal/graphql";
import useAuth from "../hook";

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

const TOKEN_AUTH = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      errors {
        message
        field
        code
      }
      token
      user {
        email
        firstName
        lastName
      }
    }
  }
`;

export const Login = () => {
  const [tokenAuth, { data, loading, error }] =
    useMutation<ResponseProps>(TOKEN_AUTH);
  const [form, setForm] = useState<FieldsProps>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Array<ErrorFragment>>([]);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (token) {
      return navigate("/admin");
    }
  }, []);

  useEffect(() => {
    if (!loading && data) {
      if (data.tokenAuth.errors) {
        setErrors(data.tokenAuth.errors);
      }
      if (data.tokenAuth.token) {
        setToken(data.tokenAuth.token);
        setUser(data.tokenAuth.user);
        return navigate("/admin");
      }
    }
  }, [loading, data, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(errors.filter((error) => error.field !== e.target.name));
  };

  const handleSubmit = () => {
    tokenAuth({ variables: form });
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
            handleChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.find((error) => error.field === "password")}
            extraInputClasses="mb-2"
            handleChange={handleChange}
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
