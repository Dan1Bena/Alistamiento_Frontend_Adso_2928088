import { Routes, Route } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Login } from "../components/login/Login";
import { useAuthContext } from "../context/AuthContext";

import { PanelLayout } from "../components/layout/PanelLayout";
import { UsuariosPagina } from "../pages/UsuariosPagina";
import { Bienvenido } from "../pages/Bienvenido";

// ✅ Nuevas importaciones (asegúrate de que existan esos archivos)
import { ProgramasPagina } from "../pages/ProgramasPagina";
import { FichasPagina } from "../pages/FichasPagina";

// 🔒 Protección de rutas
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) return <Login />; // Usuario no logueado
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido />; // Rol no permitido

  return children;
};

export const AppRutas = () => (
  <Routes>
    {/* 🌐 Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    {/* 🔒 Rutas protegidas */}
    <Route
      path="/principal/*"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <PanelLayout />
        </PrivateRoute>
      }
    >
      {/* 👥 Usuarios */}
      <Route path="usuarios" element={<UsuariosPagina />} />

      {/* 🧾 Programas */}
      <Route path="programas" element={<ProgramasPagina />} />

      {/* 🗂️ Fichas */}
      <Route path="fichas" element={<FichasPagina />} />

      {/* ✅ Ruta por defecto (cuando entra solo a /principal) */}
      <Route index element={<UsuariosPagina />} />
    </Route>

    {/* 👋 Bienvenida general */}
    <Route
      path="/bienvenido"
      element={
        <PrivateRoute>
          <Bienvenido />
        </PrivateRoute>
      }
    />

    {/* 🧭 Ruta no encontrada */}
    <Route path="*" element={<Bienvenido />} />
  </Routes>
);
