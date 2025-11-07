import { useAuthContext } from "../context/AuthContext";

import "./Principal.css";

export const Bienvenido = () => {
  const { user } = useAuthContext();

  return (
    <div className="bienvenido-dashboard">
      {/* <h1 className="bienvenido-saludo">Bienvenido {user?.nombre}</h1> */}
      {/* <p className="bienvenido-rol">Rol: {user?.rol}</p> */}
    </div>
  );
};
