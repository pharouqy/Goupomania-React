import React, { useState, createContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminIn, setAdminIn] = useState({
    isAdminAuth: false,
  });

  const isAdminAuthent = (data) => {
    setAdminIn({
      isAdminAuth: data.isAdmin,
    });
  };

  return (
    <AdminContext.Provider value={{ adminIn, isAdminAuthent }}>
      {children}
    </AdminContext.Provider>
  );
};
