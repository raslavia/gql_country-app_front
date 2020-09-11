import React from "react";

import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { GET_COUNTRIES, DELETE_COUNTRY } from "./gql";

import { CountryInterface } from "../country-component/interface";

import { CountriesContainer, CountryDiv, DeleteButton } from "./styles";

interface CountriesArrInterface {
  getCountries: CountryInterface[];
}

interface Variable {
  id: string;
}

const Countries: React.FC = () => {
  const { loading, data , refetch} = useQuery<CountriesArrInterface>(
    GET_COUNTRIES
  );

  const [deleteCountry] = useMutation<CountriesArrInterface, Variable>(
    DELETE_COUNTRY
  );

  return (
    <CountriesContainer>
      {loading && "Loading..."}
      {data &&
        data.getCountries &&
        data.getCountries.map(({ id, name }) => (
          <CountryDiv key={id}>
            <Link to={`countries/${id}`} style={{ color: "black" }}>
              {name}
            </Link>
            <DeleteButton
              onClick={() => {
                deleteCountry({ variables: { id } });
                refetch();
              }}
            >
              X
            </DeleteButton>
          </CountryDiv>
        ))}
    </CountriesContainer>
  );
};

export default Countries;
