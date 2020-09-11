import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
    $age: String
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
        age: $age
      }
    ) {
      id
      username
      email
      age
      createdAt
      token
      visited {
        id
        name
        capital
      }
    }
  }
`;
