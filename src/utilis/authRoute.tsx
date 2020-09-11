import React, { useContext, ComponentType } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { AuthContext } from "../context";

import { UserType } from "../pages/home-page/interface";

interface Props extends RouteProps {
  component: ComponentType<any>;
}

export const AuthRoute = ({ component: Component, ...rest }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to='/' /> : <Component {...props} />)}
    />
  );
};

export const UserRoute = ({ component: Component, ...rest }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }: Props) => {
  const context: UserType = useContext(AuthContext);
  if (!context.user) {
    return <Redirect to='/' />
  }
  return (
    <Route
      {...rest}
      render={props =>
        context.user!.username === "Ivan" ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};
