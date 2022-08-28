import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Profil = () => {
  const id = JSON.parse(localStorage.getItem("userAuth"))._id;

  const [picture, setPicture] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/profil/${id}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.picture);
        setPseudo(data.pseudo);
        setEmail(data.email);
        setBio(data.bio);
        setIsAdmin(data.isAdmin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div className="container profile-page">
      <div className="row center-profil">
        <div className="col-xl-6 col-lg-7 col-md-12">
          <Card
            picture={picture}
            pseudo={pseudo}
            email={email}
            bio={bio}
            isAdmin={isAdmin}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default Profil;
