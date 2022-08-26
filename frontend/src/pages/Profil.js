import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Profil = () => {
  const id = JSON.parse(localStorage.getItem("userAuth"))._id
    ? JSON.parse(localStorage.getItem("userAuth"))._id
    : null;
  const [picture, setPicture] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(id);
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
        console.log(data);
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
    <div>
      {id ? (
        <Card
          picture={picture}
          pseudo={pseudo}
          email={email}
          bio={bio}
          isAdmin={isAdmin}
          id={id}
        />
      ) : (
        <h1>Login in Frist</h1>
      )}
    </div>
  );
};

export default Profil;
