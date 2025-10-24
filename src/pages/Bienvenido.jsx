import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Layout } from '../components/layout/Layout';

import "./Principal.css";

export const Bienvenido = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <div className="bienvenido-dashboard">
        <h1 className="bienvenido-saludo">Bienvenido {user?.nombre}</h1>
        <p className="bienvenido-rol">Rol: {user?.rol}</p>
      </div>
    </Layout>
  );
};
