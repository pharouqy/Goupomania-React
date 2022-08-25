import React, { useState, createContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const cookie = Cookies.get("token");
  // User is the name of the "data" that gets stored in context
  const [loginIn, setloginIn] = useState({
    token: cookie ? cookie : null,
    pseudo: null,
    auth: false,
  });

  // Login updates the user data with a name parameter
  const login = (token, pseudo) => {
    setloginIn(() => ({
      token: cookie ? cookie : token,
      pseudo: pseudo,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {

    setloginIn(() => ({
      token: null,
      pseudo: null,
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ loginIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
