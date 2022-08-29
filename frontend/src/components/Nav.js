import "../styles/nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  let userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const logout = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      withCredentials: true,
      headers: {
        "content-type": "application/json",
      },
    });
    localStorage.removeItem("userAuth");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Brand
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {userAuth ? (
            <div className="navbar-nav">
              <Link to="/profil" className="nav-item nav-link">
                Profile
              </Link>
              <Link to="/profils" className="nav-item nav-link">
                Profiles
              </Link>
            </div>
          ) : null}
          <div className="navbar-nav ms-auto">
            {userAuth ? ( // condition ? (true) : (false); ternaire
              <div className="sign nav-item nav-link">
                <span className="nav-item nav-link">
                  Bonjour {userAuth.pseudo}
                </span>
                <a href="/" onClick={logout} className="nav-item nav-link">
                  Logout
                </a>
              </div>
            ) : (
              <div className="sign">
                <Link to="/register" className="nav-item nav-link">
                  Register
                </Link>
                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
