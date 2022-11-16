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
  const userAuth = JSON.parse(sessionStorage.getItem("userAuth"));
  let etat = "numbersOfLikes";
  if (userAuth) {
    etat = likers.includes(userAuth._id) ? "umbers_liked" : "numbersOfLikes";
  }

  const [isLiked, setIsLiked] = useState(likers.length);
  const [isAdmin, setIsAdmin] = useState(false);
  const [numberLiked, setNumberLiked] = useState(etat);

  const [profil, setProfil] = useState("");
  const [pseudo, setPseudo] = useState("");

  const formatter = buildFormatter(frenchStrings);
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth) {
      fetch(`${process.env.REACT_APP_BASE_URL}api/auth/profil/${userAuth._id}`, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
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
    fetch(`${process.env.REACT_APP_BASE_URL}api/auth/profil/${posterId}`, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
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
      fetch(`${process.env.REACT_APP_BASE_URL}api/posts/delete/${idPost}`, {
        method: "DELETE",
        withCredentials: true,
        credentials: "include",
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
  const like = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}api/posts/like/${idPost}`, {
      method: "PATCH",
      body: JSON.stringify({ likerId: userAuth._id }),
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLiked(data.length);
        setNumberLiked("umbers_liked");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const unLike = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}api/posts/unLike/${idPost}`, {
      method: "PATCH",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likerId: userAuth._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLiked(data.length);
        setNumberLiked("numbersOfLikes");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
              {" "}
              <FontAwesomeIcon icon="fa-thumbs-up" onClick={like} />
            </div>
            <div>
              <FontAwesomeIcon icon="fa-thumbs-down" onClick={unLike} />
            </div>
            <div>
              <span className={numberLiked}>{isLiked}</span>
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
