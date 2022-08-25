import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [token, setToken] = useState({ token: "", auth: false });

  // Login updates the user data with a name parameter
  const login = (token) => {
    setToken((token) => ({
      token: token,
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
    setToken((token) => ({
      token: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
