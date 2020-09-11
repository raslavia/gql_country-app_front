import { gql } from "@apollo/client";

export const UPDATE_COUNTRY = gql`
  mutation updateCountry($id: ID!, $imgUrl: String!) {
    updateCountry(id: $id, imgUrl: $imgUrl) {
      id
      name
      capital
      continent
      imgUrl
    }
  }
`;
