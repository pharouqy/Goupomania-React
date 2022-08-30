import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const { idPost } = useParams();

  const [oldPost, setOldPost] = useState("");

  const [imgfile, uploadimg] = useState("");
  const [newPost, setNewPost] = useState("");

  function imgFilehandler(e) {
    return uploadimg(e.target.files[0]);
  }

  const formData = new FormData();
  formData.append("post_image", imgfile);
  formData.append("message", newPost);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${idPost}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOldPost(data.message);
      })
      .catch((err) => {
        console.log({ error: err });
      });
  }, [idPost]);

  const updatePost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/posts/update/${idPost}`, {
      method: "PUT",
      withCredentials: true,
      body: formData,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  return (
    <div className="container profile-page">
      <div className="row center-profil">
        <div className="col-xl-6 col-lg-7 col-md-12">
          <div>
            <form onSubmit={updatePost} encType="multipart/form-data">
              <h1>Update Post</h1>
              <div className="form-group row">
                <label htmlFor="message" className="col-4 col-form-label">
                  Message
                </label>
                <div className="col-8">
                  <textarea
                    id="message"
                    name="message"
                    cols="40"
                    rows="5"
                    placeholder={oldPost}
                    className="form-control"
                    defaultValue={newPost}
                    onChange={(event) => setNewPost(event.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="picture" className="col-4 col-form-label">
                  Picture
                </label>
                <div className="col-8">
                  <input
                    id="picture"
                    name="post_image"
                    type="file"
                    className="form-control"
                    onChange={imgFilehandler}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="offset-4 col-8">
                  <button
                    name="submit"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
