import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    const decoded = jwtDecode(response.data.token);
    setUser(decoded);
    navigate("/dashboard");
  };

  const signup = async (email, password, username) => {
    const response = await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password,
      username,
    });
    localStorage.setItem("token", response.data.token);
    const decoded = jwtDecode(response.data.token);
    setUser(decoded);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}