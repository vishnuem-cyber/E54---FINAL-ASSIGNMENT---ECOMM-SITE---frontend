// FILE: src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Check for token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Sync tabs when login/logout occurs in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      setIsLoggedIn(!!storedToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => { 
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  //  Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('https://e54-final-assignment-ecomm-site-with.onrender.com/auth/login', { // Updated URL
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setIsLoggedIn(true);
        toast.success("Login successful!");
      // 👇 ADD THIS to navigate to dashboard
        navigate('/dashboard'); //  Make sure useNavigate is used
      return true;
        
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

//  Signup function
const signup = async (name, email, password) => {
  try {
    const response = await axios.post('https://e54-final-assignment-ecomm-site-with.onrender.com/auth/signup', { // Fixed URL
      name,
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setIsLoggedIn(true);
      toast.success("Signup successful!");
      return true;
    }
    return false;
  } catch (error) {
    console.error('Signup error:', error);
    toast.error("Signup failed. Please try again.");
    return false;
  }
};

//  Logout function

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate('/');
    }, 1000); // 1 sec delay
  }; 

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup, token }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
