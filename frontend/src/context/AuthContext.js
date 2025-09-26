import React, { createContext, useState } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const userData = { username: res.data.username, token: res.data.token };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const signup = async (username, password) => {
    try {
      const res = await api.post("/auth/signup", { username, password });
      const userData = { username: res.data.username, token: res.data.token };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      console.error("Signup error:", err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
