import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-center">
      <div className="logo-big">QuickStart</div>
      <p className="home-sub">Your personal movies app — dark mode ready</p>
      <div style={{ marginTop: 18 }}>
        <Link to="/movies"><button className="explore-btn">Explore Movies</button></Link>
      </div>
    </div>
  );
}
