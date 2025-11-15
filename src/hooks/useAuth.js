import { useState, useEffect } from "react";
import { loginRequest } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Cargar usuario desde localStorage si ya hay token
  useEffect(() => {
    if (token && !user) {
      const raw = localStorage.getItem("user");

      try {
        const storedUser = raw ? JSON.parse(raw) : null;
        if (storedUser) setUser(storedUser);
      } catch (error) {
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, [token, user]);

  const login = async (email, password) => {
    const data = await loginRequest({ email, password });
    console.log("Respuesta del backend →", data);

    if (!data.token) return false;

    // Guardar token
    localStorage.setItem("token", data.token);
    setToken(data.token);

  // Camila G.
    // Tu backend a veces envía "user", otras "instructor"
    const finalUser = data.user || data.instructor || null;

    if (finalUser) {
      setUser(finalUser);
      localStorage.setItem("user", JSON.stringify(finalUser));
    }

    // Guardar instructor por separado si existe (sin romper tu código)
    if (data.instructor) {
      localStorage.setItem("instructor", JSON.stringify(data.instructor));
    }

    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("instructor");
  };

  return { user, token, login, logout };
};
