// import { useAuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from "./Navbar";
// import "./Header.css";

// export const Header = () => {
//   const { user, logout } = useAuthContext();
//   const navigate = useNavigate();

//  const handleLogout = () => {
//     logout(); // Cierra la sesión del usuario
//     navigate("/"); // Redirige al home
//   };

//   return (
//     <header className="header">
//       <div className="header-left">
//         <h1 className="header-logo" onClick={() => navigate("/principal")}>
//           Panel Administrativo
//         </h1>
//         <Navbar /> {/* Solo muestra links si es admin */}
//       </div>

//       <div className="header-right">
//         <span className="header-user">
//           {user?.nombre} ({user?.rol})
//         </span>
//         <button onClick={handleLogout} className="logout-btn">
//           Cerrar sesión
//         </button>
//       </div>
//     </header>
//   );
// };


import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/nodorap.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="NodoRAP" className="header-logo-img" />
        <div className="header-title">
          <h1 className="header-app-name">NodoRAP</h1>
          <p className="header-subtitle">
            Sistema de Gestión de Resultados de Aprendizaje
          </p>
        </div>
      </div>

      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">
            {user?.nombre?.charAt(0) || "U"}
            {user?.apellido?.charAt(0) || ""}
          </div>
          <div className="user-details">
            <span className="user-role">{user?.rol}</span>
            <span className="user-name">
              <AccountCircleIcon sx={{ fontSize: 14, marginRight: 1 }} />
              {user?.nombre}
            </span>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          <LogoutIcon sx={{ fontSize: 18, marginRight: 3 }} />
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};
