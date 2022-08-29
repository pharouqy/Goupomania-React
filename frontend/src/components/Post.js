import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";
import PosterName from "./PosterName";

const Post = ({ message, picture, posterId, comments, likers }) => {
  const [profil, setProfil] = useState("");
  const [pseudo, setPseudo] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/profil/${posterId}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfil(data.picture);
        setPseudo(data.pseudo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [posterId]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 cadre">
          <PosterName pseudo={pseudo} profil={profil} />
          <img className="picture-post" alt={posterId} src={picture} />
          <p>{message}</p>
          <div className="align">
            <div>
              <FontAwesomeIcon icon="fa-thumbs-up" />
            </div>
            <div>
              <FontAwesomeIcon icon="fa-thumbs-down" />
            </div>
            <div>
              <span>0</span>
            </div>
            <div>
              <FontAwesomeIcon icon="fa-pen-to-square" />
            </div>
            <div>
              <FontAwesomeIcon icon="fa-trash-can" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
