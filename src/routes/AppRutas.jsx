import { Routes, Route } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Login } from "../components/login/Login";
import { Principal } from "../pages/Principal";
import { UsuariosPagina } from "../pages/UsuariosPagina";
import { RolesPagina } from "../pages/RolesPagina";
import { PermisosPagina } from "../pages/PermisosPagina";
import { RolPermisoPagina } from "../pages/RolPermisoPagina";
import { Bienvenido } from "../pages/Bienvenido";
import { useAuthContext } from "../context/AuthContext";
import KanbanPage from "../pages/KanbanPage";

// ⬇⬇⬇ IMPORT NOMBRADO (sin default)
import { InstructorDashboard } from "../pages/instructor/InstructorDashboard";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) return <Login />; 
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido />;

  return children;
};

export const AppRutas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    {/* Instructor */}
    <Route
      path="/instructor"
      element={
        <PrivateRoute allowedRoles={["Instructor"]}>
          <InstructorDashboard />
        </PrivateRoute>
      }
    />

    <Route path="/kanban" element={<KanbanPage />} />

    {/* Admin */}
    <Route
      path="/principal"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <UsuariosPagina />
        </PrivateRoute>
      }
    />

    <Route
      path="/usuarios"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <UsuariosPagina />
        </PrivateRoute>
      }
    />

    <Route
      path="/roles"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <RolesPagina />
        </PrivateRoute>
      }
    />

    <Route
      path="/permisos"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <PermisosPagina />
        </PrivateRoute>
      }
    />

    <Route
      path="/rol-permisos"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <RolPermisoPagina />
        </PrivateRoute>
      }
    />

    {/* Cualquier usuario logueado */}
    <Route
      path="/bienvenido"
      element={
        <PrivateRoute>
          <Bienvenido />
        </PrivateRoute>
      }
    />
  </Routes>
);