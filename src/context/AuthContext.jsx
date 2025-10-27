import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

// 🔹 Crear el contexto
const AuthContext = createContext();

// 🔹 Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// 🔹 Hook para acceder al contexto
export const useAuthContext = () => useContext(AuthContext);
