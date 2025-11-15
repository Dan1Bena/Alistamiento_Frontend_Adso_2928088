// src/pages/instructor/InstructorDashboard.jsx
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { leerFichasPorInstructor } from "../../services/instructorService";
import { Layout } from '../../components/layout/Layout'; // 👈 IMPORTAR LAYOUT
import "./InstructorDashboard.css";

export const InstructorDashboard = () => {
  const { user } = useAuthContext();

  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resolveInstructorId = () => {
    try {
      const rawInstructor = localStorage.getItem("instructor");
      if (rawInstructor) {
        const parsed = JSON.parse(rawInstructor);
        const id = parsed.id || parsed.id_instructor || parsed.instructor_id || parsed.idInstructor;
        if (id) return id;
      }
    } catch (err) {
      console.warn("⚠️ Error leyendo instructor:", err);
    }

    if (user) {
      const id = user.id || user.id_instructor || user.instructor_id || user.idInstructor;
      if (id) return id;
    }

    return null;
  };

  useEffect(() => {
    const id = resolveInstructorId();
    console.log("🆔 Instructor ID resuelto ===>", id);

    if (!id) {
      setError("No se pudo identificar al instructor.");
      setLoading(false);
      return;
    }

    const fetchFichas = async () => {
      try {
        const data = await leerFichasPorInstructor(id);
        console.log("📦 Fichas obtenidas ===>", data);
        setFichas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error cargando fichas:", err);
        setError("No se pudieron cargar las fichas.");
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, [user]);

  const formatDate = (raw) => {
    if (!raw) return "";
    const d = new Date(raw);
    return isNaN(d) ? raw : d.toLocaleDateString();
  };

  // 👇 AHORA CON LAYOUT
  return (
    <Layout>
      <div className="instructor-dashboard page-container">
<div className="bienvenido-dashboard">
  <div className="bienvenido-card">
    <h1 className="bienvenido-saludo">
      Bienvenido/a, {user?.nombre}
    </h1>
    <p className="bienvenido-rol">
      Rol: {user?.rol}
    </p>
  </div>
</div>

        {/* 👇 SECCIÓN DE FICHAS */}
        <section className="fichas-section">
          <h2 className="section-title">Mis Fichas Asignadas</h2>
          <p className="section-subtitle">
            Selecciona una ficha para gestionar el programa
          </p>

          {loading && <p className="muted">Cargando fichas...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && (
            <>
              <div className="fichas-count">
                {fichas.length} fichas asignadas
              </div>

              <div className="fichas-grid">
                {fichas.map((f) => (
                  <article
                    key={f.id_ficha ?? f.id ?? Math.random()}
                    className="ficha-card"
                  >
                    <div className="ficha-card-header">
                      <div>
                        <div className="ficha-codigo">
                          {f.codigo_ficha}
                        </div>
                        <div className="ficha-subcodigo">
                          {f.codigo_programa
                            ? `${f.codigo_programa}-${f.codigo_ficha}`
                            : f.codigo_ficha}
                        </div>
                      </div>
                      <div className="badge badge-active">
                        Activa
                      </div>
                    </div>

                    <div className="program-box">
                      <div className="program-label">PROGRAMA DE FORMACIÓN</div>
                      <div className="program-name">
                        {f.nombre_programa}
                      </div>
                      <div className="program-code">
                        Código: {f.codigo_programa}
                      </div>
                    </div>

                    <div className="meta-row">
                      <div className="meta-item">
                        <i className="fas fa-user"></i>
                        <span>{user?.nombre || "Instructor"}</span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Inicio: {formatDate(f.fecha_inicio)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};