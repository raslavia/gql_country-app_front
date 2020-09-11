import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { LOGIN } from "./gql";
import { UserCreds, Variables } from "./interface";

import { AuthContext } from "../../context";

import {
  Container,
  Title,
  FormButton,
  Form,
  Input,
} from "../../components/country-form/styles";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const history = useHistory();

  const [creds, setCreds] = useState<UserCreds>({ username: "", password: "" });
  const { password, username } = creds;

  const [login, { loading, error }] = useMutation<Variables>(LOGIN, {
    onCompleted: data => {
      context.login(data.login);
      console.log("data login", data.login);
      history.push("/posts");
    },
    variables: { username, password },
    onError: err => console.log(err.message),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container>
        {loading ? "Loading..." : ""}
        {error && (
          <p
            style={{
              color: "red",
              height: "20px",
            }}
          >
            {error.graphQLErrors[0].message}
          </p>
        )}
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            type='text'
            placeholder='name'
            name='username'
            value={username}
          />
          <Input
            onChange={handleChange}
            type='password'
            placeholder='password'
            name='password'
            value={password}
          />
          <FormButton type='submit'>Submit</FormButton>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
