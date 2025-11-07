import { useState, useEffect } from "react";
import { loginRequest } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token && !user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await loginRequest({ email, password });

    if (data.token && data.usuario) {
      const rawUser = data.usuario;

      console.log("🧩 Datos crudos del backend:", rawUser);

      // El backend envía `rol: "Sin rol"` pero el nombre real del usuario es "Administrador"
      // Si rol es "Sin rol", usamos el nombre como fallback
      const rol =
        rawUser?.rol && rawUser.rol !== "Sin rol"
          ? rawUser.rol
          : rawUser?.nombre || "Sin rol";

      const userWithRole = {
        ...rawUser,
        rol,
      };

      console.log("✅ Usuario autenticado:", userWithRole);

      setToken(data.token);
      setUser(userWithRole);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userWithRole));

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
