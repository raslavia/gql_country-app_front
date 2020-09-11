import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";

import { AuthContext } from "../../context";

import { UserType } from "../../pages/home-page/interface";

const Header = () => {
  const context: UserType = useContext(AuthContext);


  const headerLog = context.user ? (
    <HeaderContainer>
      <NavLink exact to='/' style={{ color: "red" }}>
        {context?.user?.username}
      </NavLink>
      <NavLink to='/countries' style={{ color: "#86e0be" }}>
        Countries
      </NavLink>
      <NavLink to='/posts' style={{ color: "#86e0be" }}>
        Posts
      </NavLink>
      <NavLink to='/login' style={{ color: "grey" }} onClick={context.logout}>
        Logout
      </NavLink>
    </HeaderContainer>
  ) : (
    <HeaderContainer>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
    </HeaderContainer>
  );

  return headerLog;
};

export default Header;
