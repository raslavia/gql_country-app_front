import React, {useContext} from "react";
import { RouteComponentProps } from "react-router";
import { useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../../context";

import Country from "../../components/country-component";

import { GET_COUNTRY, ADD_COUNTRY } from "./gql";
import { UserType } from "../home-page/interface";
import { CountryInterface } from "../../components/country-component/interface";
interface CountryInterfaceQuery {
  getCountry: CountryInterface;
}
interface CountryInterfaceMytation {
  addCountry: CountryInterface;
}
interface Variable {
  id: string;
}

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const CountryPage = (props: Props) => {
  const { id } = props.match.params;
  const context: UserType = useContext(AuthContext);

  const { loading, data } = useQuery<CountryInterfaceQuery, Variable>(
    GET_COUNTRY,
    {
      variables: { id },
    }
  );

  const [addCountry] = useMutation<CountryInterfaceMytation>(ADD_COUNTRY, {
    onError: error => console.log(error.message),
    variables: { userId: context.user?.id, countryId: id },
  });

  return (
    <div>
      
      {loading ? "Loading ..." : ""}
      {data && data.getCountry && <Country country={data.getCountry} />}
      {data && context.user && context.user.id && id && (
        <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => addCountry()}>Add to my list</button>
      )}
    </div>
  );
};

export default CountryPage;
