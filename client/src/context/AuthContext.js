import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token: newToken, data } = res.data;
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    setToken(newToken);
    setUser(data);
    return data;
  };

  const register = async (formData) => {
    const res = await api.post("/auth/register", formData);
    const { token: newToken, data } = res.data;
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    setToken(newToken);
    setUser(data);
    return data;
  };

  const logout = async () => {
    try { await api.get("/auth/logout"); } catch {}
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  const updateDetails = async (formData) => {
    const res = await api.put("/auth/updatedetails", formData);
    setUser(res.data.data);
    return res.data.data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, login, register, logout, updateDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
