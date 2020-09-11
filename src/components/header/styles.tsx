import styled from "styled-components";


export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 0;

  a{
    &.active {
      border-bottom: 1px solid red;
    }
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 20px;
  }
`;
