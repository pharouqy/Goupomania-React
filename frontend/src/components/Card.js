import "../styles/card.css";
import { Link } from "react-router-dom";

const Card = ({ picture, pseudo, email, bio, isAdmin, id }) => {
  console.log(id);
  const deleteProfil = () => {
    alert("You gone delete your profil definitely");
    fetch(`http://localhost:5000/api/auth/delete/${id}`, {
      method: "DELETE",
      withCredentials: true,
    })
      .then((data) => {
        console.log(data);
        localStorage.removeItem("userAuth");
        window.location.href = "/login";
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container profile-page">
      <div className="row">
        <div className="col-xl-6 col-lg-7 col-md-12">
          <div className="card profile-header">
            <div className="body">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                  <div className="profile-image float-md-right">
                    {" "}
                    <img src={picture} alt="" />{" "}
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-12">
                  <h4 className="m-t-0 m-b-0">
                    <strong>{pseudo}</strong>
                  </h4>
                  <span className="job_post">{email}</span>
                  <p>{bio}</p>
                  <span>{isAdmin ? "Admin" : "User"}</span>
                  <div>
                    <Link
                      to={"/updateProfil/" + id}
                      className="btn btn-primary btn-round"
                    >
                      Update
                    </Link>
                    <button
                      onClick={deleteProfil}
                      className="btn btn-primary btn-round btn-simple"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
