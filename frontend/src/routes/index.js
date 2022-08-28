import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminProvider } from "../utils/context";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profil from "../pages/Profil";
import Profils from "../pages/Profils";
import UpdateProfil from "../pages/UpdateProfil";
import Errors from "../pages/404";

const index = () => {
  return (
    <AdminProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profils" element={<Profils />} />
        <Route path="/updateProfil/:idUser" element={<UpdateProfil />} />
        <Route path="/*" element={<Errors />} />
      </Routes>
    </AdminProvider>
  );
};

export default index;
