import React, { useContext } from "react";
import { UserType, UserInterface } from "./interface";

import { AuthContext } from "../../context";

const HomePage = () => {
  const context: UserType = useContext(AuthContext);
  const { user } = context;
  return (
    <div>
      <h5>Hello {user?.username.toUpperCase()}</h5>
      <div>
        <p>mail: {context.user?.email}</p>
        <p>age: {context.user?.age}</p>
      </div>
    </div>
  );
};

export default HomePage;
