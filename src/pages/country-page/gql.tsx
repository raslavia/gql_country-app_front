import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
  query getCountry($id: ID!) {
    getCountry(id: $id) {
      id
      name
      capital
      continent
      imgUrl
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation addCountry($userId: ID!, $countryId: ID!) {
    addCountry(userId: $userId, countryId: $countryId) {
      id
      username
      visited {
        name
        capital
      }
    }
  }
`;
