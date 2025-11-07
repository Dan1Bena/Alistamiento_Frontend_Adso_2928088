import { useState } from "react";
import "./Pagina.css";
import { ModalFicha } from "../components/ui/ModalFicha";

export const FichasPagina = () => {
  const [fichas, setFichas] = useState([
    { id: 1, codigo: "2928088", programa: "ADSO", estado: "Activa" },
    { id: 2, codigo: "2837065", programa: "Mecatrónica", estado: "Inactiva" },
  ]);

  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Programas de ejemplo (luego vendrán del backend)
  const [programas] = useState([
    { id_programa: 1, nombre_programa: "ADSO" },
    { id_programa: 2, nombre_programa: "Mecatrónica" },
    { id_programa: 3, nombre_programa: "Gestión Empresarial" },
  ]);

  // Abrir modal (nuevo o edición)
  const abrirModal = (ficha = null) => {
    setFichaSeleccionada(ficha);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setFichaSeleccionada(null);
    setMostrarModal(false);
  };

  // Guardar (crear o editar)
  const guardarFicha = (data) => {
    if (data.id) {
      // Editar
      setFichas((prev) =>
        prev.map((f) => (f.id === data.id ? { ...f, ...data } : f))
      );
    } else {
      // Crear
      const nuevaFicha = {
        ...data,
        id: Date.now(),
        estado: "Activa",
      };
      setFichas((prev) => [...prev, nuevaFicha]);
    }

    cerrarModal();
  };

  // Cambiar estado (activar/inactivar)
  const toggleEstado = (id) => {
    setFichas((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, estado: f.estado === "Activa" ? "Inactiva" : "Activa" }
          : f
      )
    );
  };

  return (
    <div className="pagina-contenedor">
      {/* Header */}
      <div className="pagina-header">
        <h2 className="pagina-titulo">Gestión de Fichas</h2>
        <p className="pagina-subtitulo">
          Administra las fichas asociadas a los programas de formación
        </p>
      </div>

      {/* Botón Crear */}
      <div className="pagina-boton-contenedor">
        <button className="pagina-boton" onClick={() => abrirModal()}>
          + Crear Ficha
        </button>
      </div>

      {/* Lista */}
      <div className="lista-usuarios">
        <h3 className="lista-titulo">
          Lista de Fichas{" "}
          <span className="lista-subtexto">{fichas.length} registradas</span>
        </h3>

        {fichas.length > 0 ? (
          <div className="usuarios-contenedor">
            {fichas.map((ficha) => (
              <div key={ficha.id} className="usuario-card">
                <div className="usuario-info-contenedor">
                  <div className="usuario-info">
                    <p className="usuario-nombre">{ficha.codigo}</p>
                    <p className="usuario-email">{ficha.programa}</p>
                  </div>
                </div>
                <div className="usuario-detalles">
                  <span
                    className={`usuario-estado ${
                      ficha.estado === "Activa" ? "activo" : "inactivo"
                    }`}
                  >
                    {ficha.estado}
                  </span>
                  <div className="usuario-acciones">
                    <button
                      className="boton-editar"
                      onClick={() => abrirModal(ficha)}
                    >
                      Editar
                    </button>
                    <button
                      className={`boton-estado ${
                        ficha.estado === "Activa"
                          ? "boton-inhabilitar"
                          : "boton-activar"
                      }`}
                      onClick={() => toggleEstado(ficha.id)}
                    >
                      {ficha.estado === "Activa"
                        ? "Inhabilitar"
                        : "Activar"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="tabla-vacia">No hay fichas registradas</p>
        )}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <ModalFicha
          onClose={cerrarModal}
          onSave={guardarFicha}
          fichaSeleccionada={fichaSeleccionada}
          programas={programas}
        />
      )}
    </div>
  );
};
