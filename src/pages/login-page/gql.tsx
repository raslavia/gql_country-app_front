import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      age
      createdAt
      token
      visited{
        id
        name
        capital
      }
    }
  }
`;
