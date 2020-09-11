import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CountryInterface, Variables } from "./interface";
import { CountryContainer } from "./styles";

import { UPDATE_COUNTRY } from "./gql";

import { Input } from "../country-form/styles";

type CountryType = {
  country: CountryInterface;
};

const Country: React.FC<CountryType> = ({ country }) => {
  const { id, name, capital, continent, imgUrl } = country;

  const [imageUrl, setImgUrl] = useState({ url: imgUrl });
  const { url } = imageUrl;

  const [updateCountry, { error, loading }] = useMutation<
    CountryInterface,
    Variables
  >(UPDATE_COUNTRY, {
    variables: { id: id, imgUrl: url },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setImgUrl({ url: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateCountry();
  };

  return (
    <CountryContainer>
      {loading ? "loading" : ""}
      {error ? { error } : ""}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          marginBottom: "15px",
        }}
      >
        <p>name: {name}</p>
        <p>capital: {capital}</p>
        <p>continent: {continent}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          name='url'
          type='text'
          onChange={handleChange}
          value={url}
          placeholder='url'
          required
        />
      </form>
      <img src={`${url}`} height={400} alt='img' />
    </CountryContainer>
  );
};

export default Country;
