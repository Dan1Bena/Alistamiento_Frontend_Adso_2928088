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


const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) return <Login />; // No logueado
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido />; // Rol no permitido

  return children;
};



export const AppRutas = () => (



  <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    <Route path="/" element={<Login />} />
    <Route path="/kanban" element={<KanbanPage />} />

    {/* Solo Admin */}
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

    {/* Todos los usuarios logueados pueden acceder */}
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

