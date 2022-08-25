import React, { useContext } from "react";
import "../styles/nav.css";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/context";

const Nav = () => {
  const { token, logout } = useContext(UserContext);
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
          <div className="navbar-nav">
            <Link to="#" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="#" className="nav-item nav-link">
              Profile
            </Link>
            <Link to="#" className="nav-item nav-link">
              Messages
            </Link>
            <Link to="#" className="nav-item nav-link disabled" tabIndex="-1">
              Reports
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            {token.auth ? (
              <a href="/" onClick={logout} className="nav-item nav-link">
                Logout
              </a>
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
