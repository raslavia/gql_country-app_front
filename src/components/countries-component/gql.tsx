import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
 query getCountries{
  getCountries{
    id
    name
    capital
    continent
    imgUrl
  }
}
`;
export const DELETE_COUNTRY = gql`
  mutation deleteCountry($id: ID!) {
    deleteCountry(id: $id){
      id
    }
  }
`;