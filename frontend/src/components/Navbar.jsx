import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="brand">
        <img src="/l.png" alt="logo" className="small-logo" />
        <div className="brand-name">QuickStart</div>
      </div>

      <div className="nav-actions">
        <Link to="/movies" className="nav-btn btn-ghost">Movies</Link>

        {user ? (
          <>
            <span style={{ marginLeft: 10, color: "#cfcfcf", fontWeight: 600 }}>{user.username}</span>
            <button onClick={logout} className="nav-btn btn-ghost">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn">Login</Link>
            <Link to="/register" className="navbar-btn">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
