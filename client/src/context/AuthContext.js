import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTER } from "../graphql/users/mutations";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log("Loaded user from token:", decoded);
      } catch (error) {
        console.error("Token decode failed:", error.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });
  
      if (data && data.login && data.login.token) {
        const decoded = jwtDecode(data.login.token);
        localStorage.setItem("token", data.login.token);
        setUser(decoded);
        navigate("/dashboard");
      } else {
        console.error("Login error: No data.login object returned.");
        toast.error("Invalid login.");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      toast.error("Login failed");
    }
  };

  const signup = async (email, password, username) => {
    try {
      const { data } = await registerMutation({
        variables: { email, password, username },
      });

      if (data?.register?.token) {
        const decoded = jwtDecode(data.register.token); 
        localStorage.setItem("token", data.register.token);
        setUser(decoded);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signup failed:", err.message);
    }
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
