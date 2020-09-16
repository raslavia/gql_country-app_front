import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import { UserType, UserInterface } from "../pages/home-page/interface";

type User = {
  user: UserInterface | null;
};
type Actions = LoginAction | LogoutAction;
type LoginAction = {
  type: "LOGIN";
  payload: UserInterface;
};
type LogoutAction = {
  type: "LOGOUT";
};

const initialState: User = { user: null };
const tokenFromStorage: string | null = localStorage.getItem("jwtToken");

if (tokenFromStorage) {
  const decodedToken: UserInterface = jwtDecode(tokenFromStorage);
  if (decodedToken?.exp && decodedToken?.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<UserType>({
  user: null,
  login: userData => {},
  logout: () => {},
});

function authReducer(state: User, action: Actions) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: UserInterface) {
    if (userData?.token) {
      localStorage.setItem("jwtToken", userData.token);
    }

    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout(): void {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
