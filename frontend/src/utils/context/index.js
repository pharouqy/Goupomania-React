import React, { useState, createContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const cookie = Cookies.get("token");
  // User is the name of the "data" that gets stored in context
  const [loginIn, setloginIn] = useState({
    token: cookie,
    pseudo: null,
    auth: false,
  });

  // Login updates the user data with a name parameter
  const login = (pseudo) => {
    setloginIn(() => ({
      token: cookie,
      pseudo: pseudo,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      withCredentials: true,
      headers: {
        "content-type": "application/json",
      },
    });
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
