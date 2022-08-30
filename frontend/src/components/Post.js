import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";
import PosterName from "./PosterName";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Post = ({
  idPost,
  message,
  picture,
  posterId,
  comments,
  likers,
  time,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const [profil, setProfil] = useState("");
  const [pseudo, setPseudo] = useState("");

  const formatter = buildFormatter(frenchStrings);
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth) {
      fetch(`http://localhost:5000/api/auth/profil/${userAuth._id}`, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.isAdmin);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userAuth]);

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

  const handelDelete = () => {
    if (userAuth._id === posterId || isAdmin) {
      alert("You gone to delete this post");
      fetch(`http://localhost:5000/api/posts/delete/${idPost}`, {
        method: "DELETE",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          alert("Post deleted");
          navigate(0);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("You are unauthorized to delete this post");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 cadre">
          <PosterName pseudo={pseudo} profil={profil} />
          {picture ? (
            <img className="picture-post" alt={posterId} src={picture} />
          ) : null}
          <p>{message}</p>
          <p>
            Publier <TimeAgo date={time} formatter={formatter} />
          </p>
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
              <Link to={`/UpdatePost/${idPost}`}>
                <FontAwesomeIcon icon="fa-pen-to-square" />
              </Link>
            </div>
            <div onClick={handelDelete}>
              <FontAwesomeIcon icon="fa-trash-can" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
