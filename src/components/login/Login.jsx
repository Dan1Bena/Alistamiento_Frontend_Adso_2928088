import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/nodorap.png"; // ajusta si tu ruta es distinta

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const { login, user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      if (user.rol === "Administrador") {
        navigate("/principal");
      } else {
        navigate("/bienvenido");
      }
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="NodoRAP Logo" className="login-logo" />
        <h2>Iniciar Sesión</h2>
        <p className="login-subtitle">
          Ingresa tus credenciales para acceder al sistema
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@sena.edu.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VisibilityOffIcon sx={{ color: "#bbb" }} />
                ) : (
                  <VisibilityIcon sx={{ color: "#bbb" }} />
                )}
              </span>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
