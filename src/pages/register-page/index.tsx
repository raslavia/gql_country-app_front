import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { REGISTER } from "./gql";
import { UserCreds, Variables } from "./interface";

import { AuthContext } from "../../context";

import {
  Container,
  Title,
  FormButton,
  Form,
  Input,
} from "../../components/country-form/styles";

const RegisterPage = () => {
  const context = useContext(AuthContext);
  const history = useHistory();

  const [creds, setCreds] = useState<UserCreds>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    age: "",
  });
  const { password, username, confirmPassword, age, email } = creds;

  const [register, { loading, error }] = useMutation<Variables>(REGISTER, {
    onCompleted: data => {
      context.login(data.register);
      history.push("/");
    },
    onError: error => {
      console.log(error);
    },
    variables: { username, password, confirmPassword, age, email },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container>
        <p>{loading ? "Loading..." : ""}</p>
        <p
          style={{
            color: "red",
            height: "20px",
          }}
        >
          {error ? error.graphQLErrors[0].message : ""}
        </p>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            type='text'
            placeholder='name'
            name='username'
            value={username}
          />
          <Input
            name='email'
            type='email'
            onChange={handleChange}
            value={email}
            placeholder='email'
            required
          />
          <Input
            onChange={handleChange}
            type='password'
            placeholder='password'
            name='password'
            value={password}
          />
          <Input
            onChange={handleChange}
            type='password'
            placeholder='confirm password'
            name='confirmPassword'
            value={confirmPassword}
          />
          <Input
            onChange={handleChange}
            type='number'
            placeholder='age'
            name='age'
            value={"" + age}
            min='18'
            max='121'
          />

          <FormButton type='submit'>Submit</FormButton>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
