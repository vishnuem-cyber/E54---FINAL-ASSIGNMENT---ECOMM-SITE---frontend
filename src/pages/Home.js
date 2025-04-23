// FILE: src/pages/Home.js

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to Fashion Shoppy</h1>
      <Link to="/login">
        <button className="explore-btn">Explore Products</button>
      </Link>
    </div>
  );
}

export default Home;
