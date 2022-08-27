import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormData from "form-data";

const UpdateProfil = () => {
  const { idUser } = useParams();

  const [imgfile, uploadimg] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newBio, setNewBio] = useState("");

  let formData = new FormData();
  formData.append("profil_image", imgfile);
  formData.append("email", newEmail);
  formData.append("bio", newBio);

  const [pseudoOld, setPseudo] = useState("");
  const [emailOld, setEmail] = useState("");
  const [bioOld, setBio] = useState("");

  const imgFilehandler = (e) => {
    return uploadimg(e.target.files[0]);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/profil/${idUser}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPseudo(data.pseudo);
        setEmail(data.email);
        setBio(data.bio);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idUser]);

  const updateUser = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/auth/update/${idUser}`, {
      method: "PUT",
      body: formData,
      credentials: "same-origin",
      withCredentials: true,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="col-12 col-md center-block"
      onSubmit={updateUser}
      encType="multipart/form-data"
    >
      <form>
        <h1>Update Profile</h1>
        <div className="form-group row">
          <label htmlFor="pseudo" className="col-4 col-form-label">
            Pseudo
          </label>
          <div className="col-4">
            <input
              id="pseudo"
              name="pseudo"
              placeholder={pseudoOld}
              type="text"
              className="form-control"
              disabled
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-4 col-form-label">
            Email
          </label>
          <div className="col-8">
            <input
              id="email"
              name="email"
              placeholder={emailOld}
              type="text"
              className="form-control"
              defaultValue={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="picture" className="col-4 col-form-label">
            Picture
          </label>
          <div className="col-8">
            <input
              id="picture"
              name="profil_image"
              type="file"
              className="form-control"
              onChange={imgFilehandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="bio" className="col-4 col-form-label">
            Bio
          </label>
          <div className="col-8">
            <textarea
              id="bio"
              name="bio"
              cols="40"
              rows="5"
              placeholder={bioOld}
              className="form-control"
              onChange={(event) => setNewBio(event.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-4 col-8">
            <button name="submit" type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfil;
