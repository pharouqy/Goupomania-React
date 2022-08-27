import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Profils = () => {
  const [profils, setProfils] = useState([]);
  console.log(profils);
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profils/", {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfils(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container profile-page">
      <div className="row center-profil">
        <div className="col-xl-6 col-lg-7 col-md-12">
          <h1>Profils</h1>
          {profils.map((profil) => (
            <Card
              key={profil._id}
              picture={profil.picture}
              pseudo={profil.pseudo}
              email={profil.email}
              bio={profil.bio}
              isAdmin={profil.isAdmin}
              id={profil._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profils;
