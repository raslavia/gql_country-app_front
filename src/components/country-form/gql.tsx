import { gql } from "@apollo/client";

export const CREATE_COUNRTY = gql`
  mutation createCountry(
    $name: String!
    $capital: String!
    $continent: String!
    $imgUrl: String!
  ) {
    createCountry(
      countryInput: {
        name: $name
        capital: $capital
        continent: $continent
        imgUrl: $imgUrl
      }
    ) {
      id
      name
      continent
      capital
    }
  }
`;
