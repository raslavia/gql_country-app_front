import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {
  Container,
  Title,
  FormButton,
  SelectCountry,
  Form,
  Input,
} from "./styles";

import { CREATE_COUNRTY } from "./gql";

import { CountryInterface } from "./interface";

interface Create {
  createCountry: CountryInterface;
}

const CountryForm = () => {
  const history = useHistory();

  const [country, setCountry] = useState<CountryInterface>({
    name: "",
    capital: "",
    continent: "EUROPE",
    imgUrl: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCountry(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    createUserForm();
  };
  const { name, capital, continent, imgUrl } = country;

  const [createCountry, { loading, error }] = useMutation<Create>(
    CREATE_COUNRTY,
    {
      onCompleted: () => {
        history.push("/countries");
      },
      variables: { name, capital, continent, imgUrl },
      onError: () => {
        console.log("err");
      },
    }
  );
  function createUserForm() {
    createCountry();
  }

  return (
    <Container>
      <p>{loading ? "Loading..." : ""}</p>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <Title>Add country</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          type='text'
          placeholder='name'
          name='name'
          value={name}
        />
        <Input
          onChange={handleChange}
          type='text'
          placeholder='capital'
          name='capital'
          value={capital}
        />
        <SelectCountry
          name='continent'
          value={continent}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
            setCountry({ ...country, continent: ev.target.value });
          }}
        >
          <option value='ASIA'>Asia</option>
          <option value='EUROPE'>Europe</option>
          <option value='AUSTRALIA'>Australia</option>
          <option value='AFRICA'>Africa</option>
          <option value='NORTH_AMERICA'>North America</option>
          <option value='SOUTH_AMERICA'>South America</option>
        </SelectCountry>
        <Input
          onChange={handleChange}
          type='text'
          placeholder='imgUrl'
          name='imgUrl'
          value={imgUrl}
        />

        <FormButton type='submit'>Submit</FormButton>
      </Form>
    </Container>
  );
};
export default CountryForm;
