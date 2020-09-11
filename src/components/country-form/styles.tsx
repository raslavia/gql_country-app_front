import styled from "styled-components";

export const Container = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
background: none;
background-color: white;
color: black;
font-size: 18px;
padding: 10px 10px 10px 5px;
display: block;
width: 100%;
border: none;
border-radius: 0;
border-bottom: 1px solid black;
margin-bottom: 20px;
outline: none;
`;

export const Title = styled.h2`
  margin: 10px 0;
`;

export const FormButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: grey;
  color: white;
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const SelectCountry = styled.select`
  padding: 5px;
  border: 2px solid #eae8e8;
  color: grey;
`;
