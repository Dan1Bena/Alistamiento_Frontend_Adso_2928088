import { useState, useEffect } from "react";
import { loginRequest } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
  if (token && !user) {
    const raw = localStorage.getItem("user");

    try {
      const storedUser = raw ? JSON.parse(raw) : null;
      if (storedUser) setUser(storedUser);
    } catch (error) {
      // Si lo que hay guardado es inválido, lo borramos
      localStorage.removeItem("user");
      setUser(null);
    }
  }
}, [token]);



  const login = async (email, password) => {
    const data = await loginRequest({ email, password });
    console.log("Respuesta del backend →", data);

    if (data.token) {
      setToken(data.token);
      setUser(data.instructor);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.instructor));

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { user, token, login, logout };
};
