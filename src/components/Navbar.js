// FILE: src/components/Navbar.js

import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to Home
  };

  // Hide navbar on Home Page
  if (location.pathname === "/") return null;

  return (
    <nav className="navbar">
      <h2 className="logo">Fashion Shoppy</h2>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <span className="logout-btn" onClick={handleLogout}>Logout</span>
            {/*  Cart now redirects to the Cart Page */}
            <div className="cart-icon" onClick={() => navigate("/cart")}>
              🛒 <span className="cart-count">{totalItems}</span>
            </div>
          </>
        ) : (
          location.pathname !== "/login" && <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
