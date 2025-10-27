import { useAuthContext } from "../context/AuthContext";
import { Layout } from "../components/layout/Layout";
import { fichas } from "../data/mockData"; // ✅ Import correcto
import "./Bienvenido.css";

const Bienvenido = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      <div className="bienvenido-dashboard">
        <h1 className="bienvenido-saludo">Bienvenido {user?.nombre}</h1>
        <p className="bienvenido-rol">Rol: {user?.rol}</p>
      </div>

      <div className="bienvenido-container">
        <h2>Mis Fichas Asignadas</h2>
        <p>Selecciona una ficha para acceder a la sábana y gestionar los RAPs</p>

        <div className="fichas-grid">
          {fichas.map((ficha) => (
            <div
              key={ficha.id}
              className="ficha-card"
              onClick={() => (window.location.href = "/kanban")}
            >
              <h3>{ficha.codigo}</h3>
              <p className="codigo">Código Programa: {ficha.codigoPrograma}</p>

              <div className="programa">
                <p className="titulo">PROGRAMA DE FORMACIÓN</p>
                <p className="nombre">{ficha.programa}</p>
              </div>

              <p>👨‍🏫 Instructor: {ficha.instructor}</p>
              <p>🗓 Inicio: {ficha.inicio}</p>
              <span className="estado">{ficha.estado}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Bienvenido;
